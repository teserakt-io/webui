# e4 WebUI

## Development

```
cp .env.example .env
npm install
npm run dev
```

## Docker

The CI automatically push docker images of the WebUI after each successfull builds and for each branches.

List of available WebUI images: https://gitlab.com/Teserakt/e4/webui/container_registry

To run the webUI container:

```
docker run -it --rm -v $(pwd)/.env:/app/.env -p 3000:3000 registry.gitlab.com/teserakt/e4/webui:<BRANCH_NAME>
```

The targeted C2 and C2AE can be configured by providing a custom `.env` file.
