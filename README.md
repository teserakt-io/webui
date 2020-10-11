# e4 WebUI

## Development

```
cp .env.example .env
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
