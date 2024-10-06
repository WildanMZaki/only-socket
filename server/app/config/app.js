const express = require("express");
const cors = require("cors");

class app {
  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }
  plugins() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use((c, a, b) => {
      a.header("Access-Control-Allow-Origin", "*");
      a.set("Cache-Control", "no-store");
      a.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      a.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      b();
    });
  }
  routes() {
    this.app.get("/", (req, res) => {
      res.send("Server is running");
    });
  }
}
module.exports = app;
