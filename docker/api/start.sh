#!/usr/bin/env bash

# echo "Migrating DB..."
# cd /usr/src/app/dist/ && node migrate.js
DIR="/usr/src/app"
if [[ ! -e $DIR ]]; then
  cd /usr/src/app
fi

echo 'Starting up API...'
if [ "$NODE_ENV" == "development" ];
then
  echo "Development MODE"
  pm2 start /usr/src/app/docker/api/pm2/pm2-development.json
else
  echo "Production MODE"
  pm2 start /usr/src/app/docker/api/pm2/pm2-production.json
fi

# Keep Container Running
tail -f /dev/null

