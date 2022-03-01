.PHONY: install
install:
	docker-compose run start npm install

.PHONY: generate
generate:
	docker-compose run start npm run generate

.PHONY: schedule
schedule:
	docker-compose run start

.PHONY: clear
clear:
	docker-compose run start npm run clear
