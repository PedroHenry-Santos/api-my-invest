#!/usr/bin/env bash
echo "Starting up Docker containers..."
if [ "$NODE_ENV" == "development" ];
then
  echo "Start up Docker in Development Mode..."
  sudo docker-compose up --build -V --remove-orphans
else
  echo "Start up Docker in Production Mode..."
  sudo docker-compose -f docker-compose.prod.yml up --build -V --remove-orphans 
fi
