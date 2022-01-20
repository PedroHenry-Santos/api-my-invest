USER=node
export NODE_ENV=development

up:
	./run.sh

stop:
	docker-compose stop

sh:
	./docker/api/ssh.sh

sh\:db:
	./docker/postgresql/ssh.sh

docs:
	npx @compodoc/compodoc -p tsconfig.json

sonar:
	sonar-scanner