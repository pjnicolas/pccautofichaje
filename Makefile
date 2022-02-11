.IPHONY: install
install:
	docker-compose run start npm install

.IPHONY: generate
generate:
	docker-compose run start npm run generate

.IPHONY: schedule
schedule:
	docker-compose run start
