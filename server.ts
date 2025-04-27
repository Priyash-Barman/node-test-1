import { createServer } from "http";
import app from "./app";
import { PORT } from "./config/server.config";
import { connect_db } from "./config/db.config";


async function start_server() {
  const server = createServer(app);
  await connect_db();
  server.listen(PORT, () => {
    console.log(`node-test-app running on http://localhost:${PORT}`);
  });
}

start_server()