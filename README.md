# ImShare

Im Share is a social media where users can share images with each other. This site was heavily inspired by Instagram and Pinterest, focusing on a clean UI with minimal features.

## 👀 Accessing

The website is available in via Render in [im-share.onrender.com](https://im-share.onrender.com). It may take a bit longer to load the first time you open it because of Render's spin-down-on-inactivity policy, but it should work just fine after that!

## ▶️ Executing

### With Docker Compose

To quickly execute an entire stack for this application in your local machine, you can use the `docker-compose.yml`. The following command will prepare and execute the application, as well as its DB and Cache system using your local Docker.

``` sh
docker compose up --detach
```

### With Docker Container

This application can built into a Docker image using its `Dockerfile`. The command to do so is:

``` sh
docker build --tag <name>:<version> .
```

This is not really, necessary, though, as its image is publicly available in a Docker Hub repository. You just have to pull it with:

``` sh
docker pull nadjiel/im-share:latest
```

Now that you have the app image, to execute it, you'll need some environment variables. You can pass those to the container with:

``` sh
docker run --detach \
  --name <container-name> \
  --env-file .env \
  --publish <host-port>:3000 \
  <image-name>:<image-version>
```

### With Plain Node

You can also execute this app with plain Node and NPM, if you so desire. Here's the command to do that:

``` sh
npm run start
```

Remember to populate your `.env` file before that, though.

## 🧑‍💻 Developing

To improve development experience, this application is fully dockerized with a `Dockerfile` and a `docker-compose.yml`.

The `Dockerfile` can be used to create a production image, which can be executed with different configurations depending on the environment variables passed. To know what variables are expected, refer to the `.env.example` file as a guide.

In the other hand, the `docker-compose.yml` file can be used to easily scaffold the environment needed for this application to function properly in a given machine. This YAML pulls, builds and runs the needed images / containers for the stack. The stack necessary is listed below:

- `postgres:16-alpine`
- `redis:7-alpine`
- `im-share:latest` (built from the `Dockerfile`)

Note that to be able to prepare the application DB, you'll need to first set up prisma and run the pending migrations by using the following commands:

``` sh
# Set up Prisma
npx prisma generate

# Apply migrations (uses DATABASE_URL from .env)
npm run db
```

## 🫂 Thank You

This application was developed by:

- [Ulisses Pereira](https://github.com/yolisses)
- [Pedro Pereira](https://github.com/Pedro35803)
- [Daniel O. Sousa](https://github.com/nadjiel)

Thank you for checking out this project! If you liked what you saw, please leave your star and follow me here and on [Linkedin](https://linkedin.com/in/nadjiel), where I post about this and similar projects.

Feel free to post a picture in the [site](https://im-share.onrender.com) and leave your mark for future viewers!
