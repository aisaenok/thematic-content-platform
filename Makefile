SHELL := /bin/bash
NVM_DIR ?= $(HOME)/.nvm
NODE_VERSION := $(shell sed 's/^v//' .nvmrc)
WEB_PROJECT := @thematic-content-platform/web

.PHONY: install dev lint test build check ci clean reset doctor

define with_node
	set -euo pipefail; \
	REQUIRED_NODE_VERSION="$(NODE_VERSION)"; \
	CURRENT_NODE_VERSION="$$(node -v 2>/dev/null | sed 's/^v//' || true)"; \
	if [ "$$CURRENT_NODE_VERSION" != "$$REQUIRED_NODE_VERSION" ]; then \
		if [ -s "$(NVM_DIR)/nvm.sh" ]; then \
			export NVM_DIR="$(NVM_DIR)"; \
			. "$$NVM_DIR/nvm.sh"; \
			nvm use "$$REQUIRED_NODE_VERSION" >/dev/null; \
		else \
			echo "Required Node.js $$REQUIRED_NODE_VERSION, but current is $${CURRENT_NODE_VERSION:-not found}"; \
			echo "nvm not found at $(NVM_DIR). Install/use Node.js $$REQUIRED_NODE_VERSION or run through CI setup-node."; \
			exit 1; \
		fi; \
	fi; \
	corepack enable >/dev/null 2>&1 || true; \
	$(1)
endef

doctor:
	@$(call with_node, \
		echo "Node.js: $$(node -v)"; \
		echo "pnpm: $$(pnpm -v)"; \
	)

install:
	@$(call with_node,pnpm install)

dev:
	@$(call with_node,pnpm nx dev $(WEB_PROJECT))

lint:
	@$(call with_node,pnpm nx lint $(WEB_PROJECT))

test:
	@$(call with_node,pnpm nx test content-source)

build:
	@$(call with_node,pnpm nx build content-domain)
	@$(call with_node,pnpm nx build content-source)
	@$(call with_node,pnpm nx build $(WEB_PROJECT))

check: lint test build

ci:
	@$(call with_node,pnpm install --frozen-lockfile)
	@$(MAKE) check

clean:
	rm -rf apps/web/.next
	rm -rf dist
	rm -rf .nx/cache

reset:
	@$(call with_node,pnpm nx reset)
