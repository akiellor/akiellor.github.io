OUTDIR=target
SRCDIR=src
POSTS_SOURCES := $(shell cd $(SRCDIR) && find posts -name '*.md')
POSTS_OBJECTS := $(addprefix $(OUTDIR)/,$(POSTS_SOURCES:%.md=%.html))
JS_SOURCES := $(shell find ${SRCDIR} -name '*.js')

.PHONY: ${OUTDIR}/bundle.js

.prerequisites: package.json
	npm install
	touch .prerequisites

directories: ${OUTDIR}/posts

${OUTDIR}/posts:
	mkdir -p ${OUTDIR}/posts

${OUTDIR}/posts/%.html: src/posts/%.md
	mdspell -n -r $<
	alex $<
	marked -i $< -o $@

${OUTDIR}/index.html: ${SRCDIR}/index.html
	cp ${SRCDIR}/index.html ${OUTDIR}/index.html

${OUTDIR}/bundle.js: ${JS_SOURCES}
	webpack ${SRCDIR}/main.jsx ${OUTDIR}/bundle.js

all: .prerequisites directories ${OUTDIR}/bundle.js ${OUTDIR}/index.html ${POSTS_OBJECTS}

run:
	webpack-dev-server --port 8000 --content-base ${OUTDIR} --devtool inline-source-map ${SRCDIR}/main.jsx

clean:
	bash -c 'cd ${OUTDIR} && git reset HEAD --hard && git clean -xdf'

publish:
	bash -c 'git diff -s --ignore-submodules --exit-code || (echo "commit your work" && exit 1)'
	make all
	bash -c 'cd ${OUTDIR} && git diff -s --exit-code || git commit -am "Publishing"'
	git diff -s --exit-code || git commit -am "Publishing"
	git push origin source
	bash -c 'cd ${OUTDIR} && git push origin master'

