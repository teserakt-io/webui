# e4 WebUI

## Development

```
# Create config
cp .env.example .env

# Generate certs
openssl req -nodes -newkey rsa:2048 -keyout certs/webui-key.pem -x509 -sha256 -days 365 -out certs/webui-cert.pem -subj "/CN=localhost" -addext "subjectAltName = 'IP:127.0.0.1'"

npm install
npm run dev
```

## Docker

Build:

```
docker build -t webui -f docker/Dockerfile .
```

To run the webUI container:

```
docker run -it --rm -v $(pwd)/.env:/app/.env -p 3000:3000 webui
```

The targeted C2 and C2AE can be configured by providing a custom `.env` file.

## Common issues

### npm run / build fail with a command not found error

When running `npm run dev` or `npm run prod` sometimes `cross-env` goes missing for some reasons.
Same apply with `next` when running `npm build`

Solution:
```
rm -rf node_modules/
npm install
```
