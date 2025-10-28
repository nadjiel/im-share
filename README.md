# ImShare

## Executing

This application can built into a Docker image using its `Dockerfile`. The command to do so is:

``` sh
docker build --tag <name>:<version> .
```

To execute, this app expects some environment variables. You can pass those to the image with:

``` sh
docker run --detach \
  --name <container-name> \
  --env-file .env \
  --publish <host-port>:3000 \
  <image-name>:<image-version>
```

## Development

First of all, you'll need to set your environment variables. To do that, follow the `.env.example` as a guide.

To be able to scaffold the application DB, you'll need to first set up prisma by using the following command:

``` sh
npx prisma generate
```

Also, make sure to apply the migrations in order for the app to work as expected:

``` sh
npm run db
```
