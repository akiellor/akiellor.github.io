OUTDIR=target
SRCDIR=src
POSTS_SOURCES := $(shell cd $(SRCDIR) && find posts -name '*.md')
POSTS_OBJECTS := $(addprefix $(OUTDIR)/,$(POSTS_SOURCES:%.md=%.html))
IMAGES_SOURCES := $(shell cd $(SRCDIR) && find posts -name '*.jpg')
IMAGES_OBJECTS := $(addprefix $(OUTDIR)/,$(IMAGES_SOURCES:%.jpg=%.jpg))
JS_SOURCES := $(shell find ${SRCDIR} -name '*.js')
NODE_BIN=node_modules/.bin

.PHONY: ${OUTDIR}/bundle.js

.prerequisites: package.json
	npm install
	touch .prerequisites

directories: ${OUTDIR} ${OUTDIR}/posts

${OUTDIR}/posts:
	mkdir -p ${OUTDIR}/posts

${OUTDIR}/posts/%.html: src/posts/%.md
	${NODE_BIN}/mdspell -n -r $<
	${NODE_BIN}/alex $<
	scripts/markdown $< > $@

${OUTDIR}/%.jpg: ${SRCDIR}/%.jpg
	mkdir -p $$(dirname $@)
	docker run -v $$(pwd):/data -ti imagemagick convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% -define jpeg:extent=50kb -resize 800 /data/$< /data/$@

${OUTDIR}/index.html: ${SRCDIR}/index.html
	cp ${SRCDIR}/index.html ${OUTDIR}/index.html

${OUTDIR}/model.json: ${POSTS_OBJECTS}
	scripts/model ${POSTS_OBJECTS} > ${OUTDIR}/model.json

${OUTDIR}/bundle.js: ${JS_SOURCES}
	${NODE_BIN}/webpack ${SRCDIR}/main.jsx ${OUTDIR}/bundle.js

images: ${IMAGES_OBJECTS}

all: .prerequisites directories ${OUTDIR}/bundle.js ${OUTDIR}/model.json ${OUTDIR}/index.html ${POSTS_OBJECTS} images

run:
	${NODE_BIN}/webpack-dev-server --port 8000 --content-base ${OUTDIR} --devtool inline-source-map ${SRCDIR}/main.jsx

lint:
	docker run -v $$(pwd):/data -ti proselint sh -c 'cd /data/src; proselint ${POSTS_SOURCES}'

clean:
	bash -c 'cd ${OUTDIR} && git reset HEAD --hard && git clean -xdf'

${OUTDIR}:
	git clone -b master $$(git config --get remote.origin.url) target

publish:
	bash -c 'git diff -s --ignore-submodules --exit-code || (echo "commit your work" && exit 1)'
	make all
	bash -c 'cd ${OUTDIR} && git add -A .; git commit --allow-empty -am "Publishing"'
	bash -c 'cd ${OUTDIR} && git push origin master'

