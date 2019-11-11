#!/bin/sh

openssl req -nodes -newkey rsa:2048 \
    -keyout certs/webui-key.pem \
    -out certs/webui-cert.pem \
    -x509 -sha256 -days 365 -subj "/CN=localhost" -addext "subjectAltName = 'IP:127.0.0.1'"
