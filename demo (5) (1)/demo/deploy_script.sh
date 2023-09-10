# !/bin/bash

# ========= On Local Machine =============
# Login to docker
docker login

# Build latest docker image of application
docker build –t craigturley/demo-app:latest

# Push docker image to docker-hub
docker push craigturley/demo-app:latest

# Transfer docker-compose and
# data file to remote server
scp docker-compose.yml root@146.190.54.73:/
scp data.sql root@146.190.54.73:/

# SSH into remote server
# Type in associated password with machine
ssh root@146.190.54.73:/

# ========= On Local Machine =============

# ========= On Remote server ==============

cd /

# Login to docker on remote server
docker login

# Pull down the latest docker image
docker pull craigturley/demo-app:latest

#Run docker containers
docker-compose up -d

# This line was added
# to ensure the images
# are correctly running
docker ps

# ========= On Remote server ==============
