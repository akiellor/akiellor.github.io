OUTDIR=target
SRCDIR=src
POSTS_SOURCES := $(shell cd $(SRCDIR) && find posts -name '*.md')
POSTS_OBJECTS := $(addprefix $(OUTDIR)/,$(POSTS_SOURCES:%.md=%.html))

.prerequisites: package.json
	npm install
	touch .prerequisites

directories: ${OUTDIR}/posts

${OUTDIR}/posts:
	mkdir -p ${OUTDIR}/posts

${OUTDIR}/posts/%.html: src/posts/%.md
	marked -i $< -o $@

${OUTDIR}/index.html: ${SRCDIR}/index.html
	cp ${SRCDIR}/index.html ${OUTDIR}/index.html

all: .prerequisites directories ${OUTDIR}/index.html ${POSTS_OBJECTS}
