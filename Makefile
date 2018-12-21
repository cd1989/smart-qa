# Current version of the project.
VERSION ?= v0.1.0

# This repo's root import path (under GOPATH).
ROOT := github.com/caicloud/smart-qa

# Target binaries. You can build multiple binaries for a single project.
TARGETS := server web

IMAGE_PREFIX ?= $(strip smart-)
IMAGE_SUFFIX ?= $(strip )

# A list of all packages.
PKGS := $(shell go list ./... | grep -v /vendor | grep -v /test)

# Project main package location (can be multiple ones).
CMD_DIR := ./cmd

# Project output directory.
OUTPUT_DIR := ./bin

# Build direcotory.
BUILD_DIR := ./build

# Git commit sha.
COMMIT := $(shell git rev-parse --short HEAD)

# Golang standard bin directory.
BIN_DIR := $(GOPATH)/bin
GOMETALINTER := $(BIN_DIR)/gometalinter

# All targets.
.PHONY: build container

build: build-local

build-local:
	@for target in $(TARGETS); do                                                      \
	  CGO_ENABLED=0   GOOS=linux   GOARCH=amd64                                        \
	  go build -i -v -o $(OUTPUT_DIR)/$${target}                                       \
	    -ldflags "-s -w -X $(ROOT)/pkg/version.VERSION=$(VERSION)                      \
	              -X $(ROOT)/pkg/version.COMMIT=$(COMMIT)                              \
	              -X $(ROOT)/pkg/version.REPOROOT=$(ROOT)"                             \
	    $(CMD_DIR);                                                                    \
	done

build-linux:
	docker run --rm                                                                    \
	  -v $(PWD):/go/src/$(ROOT)                                                        \
	  -w /go/src/$(ROOT)                                                               \
	  -e GOOS=linux                                                                    \
	  -e GOARCH=amd64                                                                  \
	  -e GOPATH=/go                                                                    \
	  -e CGO_ENABLED=0                                                                 \
	  golang:1.10-alpine3.8                                                            \
	  go build -i -v -o $(OUTPUT_DIR)/server                                           \
	  -ldflags "-s -w -X $(ROOT)/pkg/version.VERSION=$(VERSION)                        \
	  -X $(ROOT)/pkg/version.COMMIT=$(COMMIT)                                          \
	  -X $(ROOT)/pkg/version.REPOROOT=$(ROOT)"                                         \
	  $(CMD_DIR);

container: build-linux
	@for target in $(TARGETS); do                                                      \
	  image=$(IMAGE_PREFIX)$${target/\//-}$(IMAGE_SUFFIX);                             \
	  docker build -t $${image}:$(VERSION)                                             \
	  -f $(BUILD_DIR)/$${target}/Dockerfile .;                                         \
	done

container-local: build-local
	@for target in $(TARGETS); do                                                      \
	  image=$(IMAGE_PREFIX)$${target/\//-}$(IMAGE_SUFFIX);                             \
	  docker build -t $${image}:$(VERSION)                                             \
	  -f $(BUILD_DIR)/$${target}/Dockerfile .;                                         \
	done

.PHONY: clean
clean:
	-rm -vrf ${OUTPUT_DIR}