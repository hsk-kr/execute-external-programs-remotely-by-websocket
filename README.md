# Remote PC by WebSocket

This is a server that open an external program from a client's request. <br/>
This is a project for practicing purposes.<br/>
It doesn't support production build.

# Preview

# WebClient

## How to Start(Dev)

1. Create .env file and Set environment variables like below.
   ```
   SERVER_PROTOCOL=dev
   ```
2. Run a command
   ```
   npm run dev
   ```

## Scripts

- **clean**: Delete a cache dir and a dist(build) dir.

- **dev:start**: Start the server with parcel.
- **dev**: Execute two scripts clean and dev:start.

# WebServer

## How to Start(Dev)

1. Create .env file and Set environment variables like below.
   ```
   SERVER_PORT=6363
   SERVER_PROTOCOL=dev
   ```
2. Run a command
   ```
   npm run dev
   ```

## Scripts

- **clean**: Delete a cache dir and a dist(build) dir.

- **build**: Build the app.

- **start**: Start the built app javascript file with node.

- **rebuild**: Execute two scripts clean and build.

- **dev**: Start the app with ts-node-dev. It doesn't need to build.
