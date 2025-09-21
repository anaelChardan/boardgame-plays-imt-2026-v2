# Styles
YELLOW := $(shell echo "\033[00;33m")
RED := $(shell echo "\033[00;31m")
RESTORE := $(shell echo "\033[0m")

# Variables
.DEFAULT_GOAL := list
PACKAGE_MANAGER := pnpm
CURRENT_DIR := $(shell pwd)
DEPENDENCIES := node pnpm git
NODE := node -r dotenv/config

.PHONY: list
list:
	@echo "${YELLOW}***${RED}***${RESTORE}***${YELLOW}***${RED}***${RESTORE}***${YELLOW}***${RED}***${RESTORE}***${YELLOW}***${RED}***${RESTORE}"
	@echo "${RED}Boardgame plays: ${YELLOW}Available targets${RESTORE}:"
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf " ${YELLOW}%-15s${RESTORE} > %s\n", $$1, $$2}'
	@echo "${RED}=================================${RESTORE}"

.PHONY: check-dependencies
check-dependencies:
	@for dependency in $(DEPENDENCIES); do \
		if ! command -v $$dependency &> /dev/null; then \
			echo "${RED}Error:${RESTORE} ${YELLOW}$$dependency${RESTORE} is not installed."; \
			exit 1; \
		fi; \
	done
	@echo "All ${YELLOW}dependencies are installed.${RESTORE}"

.PHONY: install
install: check-dependencies update ## Install the Application and reset the database

.PHONY: update
update: check-dependencies ## Update the Repo
	@$(PACKAGE_MANAGER) install

.PHONY: codeclean
codeclean: ## Lint and format and typecheck
	@$(PACKAGE_MANAGER) run lint:fix
	@$(PACKAGE_MANAGER) run prettier:fix
	@$(PACKAGE_MANAGER) run lint:check
	@$(PACKAGE_MANAGER) run prettier:check

.PHONY: build
build: ## Build All
	@$(PACKAGE_MANAGER) run build

.PHONY: dev
dev: ## Dev
	@$(PACKAGE_MANAGER) run dev

.PHONY: tests
tests: ## Run All Tests
	@$(PACKAGE_MANAGER) run tests

.PHONY: test-unit
test-unit: ## Run Unit Tests
	@$(PACKAGE_MANAGER) run test:unit

.PHONY: test-functionnal
test-functionnal: ## Run Functionnal Tests only
	@$(PACKAGE_MANAGER) run test:functionnal

.PHONY: test-api
test-api: ## Run API Tests only
	@$(PACKAGE_MANAGER) run test:api

.PHONY: test-integration
test-integration: ## Run Integration Tests
	@$(PACKAGE_MANAGER) run test:integration
