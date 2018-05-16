SPECS_PATH = specs.json
# Set the build version
ifeq ($(origin VERSION), undefined)
	VERSION := $(shell git describe --tags --always --dirty)
endif
# Set the build date
ifeq ($(origin BUILD_DATE), undefined)
	BUILD_DATE := $(shell date -u)
endif
# If no target is defined, assume the host is the target (for non-docker builds).
ifeq ($(origin OS), undefined)
	OS := $(shell uname | tr '[:upper:]' '[:lower:]')
endif


#  __      __           _                 
#  \ \    / /          (_)                
#   \ \  / /__ _ __ ___ _  ___  _ __  ___ 
#    \ \/ / _ \ '__/ __| |/ _ \| '_ \/ __|
#     \  /  __/ |  \__ \ | (_) | | | \__ \
#      \/ \___|_|  |___/_|\___/|_| |_|___/ 
SE_SERVER_VERSION = 3.12
SE_SERVER_PATCH_VERSION = 0
CHROMEDRIVER_VERSION = 2.37
GECKODRIVER_VERSION = 0.20.0


.PHONY: build-local
build-local: clean dep vendor-utils run

.PHONY: docker
docker: 
ifeq ($(FORCE), true)
	docker build . -f dockerfile.chrome --no-cache --tag assignment-chrome
	docker build . -f dockerfile.firefox --no-cache --tag assignment-firefox
else
	docker build . -f dockerfile.chrome --tag assignment-chrome
	docker build . -f dockerfile.firefox --tag assignment-firefox
endif
	docker-compose up

.PHONY: run
run:
	pkill java || true
	pkill -a 2.37-x64-chromedriver || true
	pkill -a 0.20.0-x64-geckodriver || true
	selenium-standalone start &
	sleep 1
	node index.js $(SPECS_PATH)

.PHONY: build
build: clean dep

vendor-utils: 
	mkdir vendor-utils
	wget -q https://selenium-release.storage.googleapis.com/$(SE_SERVER_VERSION)/selenium-server-standalone-$(SE_SERVER_VERSION).$(SE_SERVER_PATCH_VERSION).jar -O vendor-utils/se-sever.jar
ifeq ($(OS),darwin)
	wget -q https://chromedriver.storage.googleapis.com/$(CHROMEDRIVER_VERSION)/chromedriver_mac64.zip -O vendor-utils/temp.zip
	wget -qO- https://github.com/mozilla/geckodriver/releases/download/v$(GECKODRIVER_VERSION)/geckodriver-v$(GECKODRIVER_VERSION)-macos.tar.gz | tar -xz -C vendor-utils/
else ifeq ($(OS),linux)
	wget -q https://chromedriver.storage.googleapis.com/$(CHROMEDRIVER_VERSION)/chromedriver_linux64.zip -O vendor-utils/temp.zip
	wget -qO- https://github.com/mozilla/geckodriver/releases/download/v$(GECKODRIVER_VERSION)/geckodriver-v$(GECKODRIVER_VERSION)-linux64.tar.gz | tar -xz -C vendor-utils/
endif
	unzip vendor-utils/temp.zip -d vendor-utils/
	rm vendor-utils/temp.zip
	mkdir -p node_modules/selenium-standalone/.selenium/selenium-server \
	node_modules/selenium-standalone/.selenium/chromedriver/ \
	node_modules/selenium-standalone/.selenium/geckodriver/
	cp vendor-utils/se-sever.jar node_modules/selenium-standalone/.selenium/selenium-server/3.8.1-server.jar
	cp vendor-utils/chromedriver node_modules/selenium-standalone/.selenium/chromedriver/2.37-x64-chromedriver
	cp vendor-utils/geckodriver node_modules/selenium-standalone/.selenium/geckodriver/0.20.0-x64-geckodriver

.PHONY: dep
dep: 
	sudo npm i -g npm n
	sudo n stable
	mkdir -m 777 node_modules
	npm i 

.PHONY: clean
clean:
	sudo rm -rf node_modules vendor* out-* 

.PHONY: tag
tag:
	git tag -f $(VERSION)
