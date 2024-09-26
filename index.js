require("dotenv").config();
process.env.TZ = process.env.APP_TIMEZONE || "Asia/Jakarta";

const app = require("./server/app/config/app.js");
const { logz } = require("./server/app/lib/logz.js");
const { Server } = require("socket.io");
const url = require("url");

const server = new app();

const { hostname, port } = url.parse(process.env.BASE_NODE);

const serverHttp = server.app.listen(port || 3000, "0.0.0.0", () => {
  logz.info(`[EXPRESS] App Listening at ${process.env.BASE_NODE}`).record();
});

const io = new Server(serverHttp);

const socketIo = io.on("connection", (socket) => {
  socket.on("connected", () => {});

  socket.on("disconnect", () => {});

  return socket;
});

server.app.set("socket", socketIo);
