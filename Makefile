include .env

release:
	CI=true HUSKY=0 GITHUB_TOKEN=${GITHUB_TOKEN} yarn release

start:
	chmod +x ./init.sh
	./init.sh

sonar:
	docker-compose -f docker-compose.development.yml up -d

scaner:
	yarn sonar-scanner