#!/bin/bash
cd /home/ec2-user/my-invest

# STDERR log function
err() {
  echo -e "\n[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $@\n" >&2
  exit 1
}

# STDOUT log function
log() {
  echo -e "\n[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $@\n"
}

# Check if Docker is installed
if ! type "docker" > /dev/null 2>&1; then
    err "Docker not installed"
fi

# Check if Docker-compose is installed
if ! type "docker-compose" > /dev/null 2>&1; then
    err "Docker-Compose not installed"
fi
log "Looks like both docker and docker-compose are installed, everything looks good."

if  -e .env; then
    log "Copying .env.example -> .env"
    cp .env.example .env
    if [ $? -ne 0 ]; then
        err "Error while copying .env"
    fi
else
    log "The .env already exists"
fi

log "Starting docker-compose stack if not already started.."
docker-compose up -d --build -V --remove-orphans
if [ $? -ne 0 ]; then
    err "Error while starting docker-compose stack."
fi