#!/bin/bash


# must pass the pipeleap:P1p3l3aP@localhost:3050:/api/messages/dispatch for authentication

curl -X POST \
  http://sync:sync@localhost:3050/api/v1/notifications/messages/dispatch \
  -H 'Authorization: Basic cGlwZWxlYXA6UDFwM2wzYVA=' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: e87c1feb-8cc6-4888-8f6c-0653b37f5d1b' \
  -d '{
  "level": "warning",
  "channels": ["telegram", "mailgun", "slack"],
  "raw_response": true,
  "webhook": "http://localhost:6500/api/webhook",
  "app": "collaboration",
  "realm": "production",
  "message": { "title": "Error Warning", "pretext":  "Mensagem Sanity Test", "text": "Sanity message for simple automatic test purpose." }
}'
