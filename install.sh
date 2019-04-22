#!/bin/bash

echo "installing npm packages..."

npm install

echo "building container...."
docker build -t sync-notifications:1.0

echo "bringing system to life..."
docker-compose up -d

#uncomment it if you need to read logs from the app. 
