# e4 WebUI

## Development

```
cp .env.example .env
npm install
npm run dev
```

## Docker

The CI automatically push docker images of the WebUI after each successful builds and for each branches.

List of available WebUI images: https://console.cloud.google.com/gcr/images/teserakt-dev/EU/webui?project=teserakt-dev&authuser=1&folder&organizationId&gcrImageListsize=30

or with gcloud: `gcloud container images list-tags eu.gcr.io/teserakt-dev/webui`

To run the webUI container:

```
docker run -it --rm -v $(pwd)/.env:/app/.env -p 3000:3000 eu.gcr.io/teserakt-dev/webui:<BRANCH_NAME>
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
