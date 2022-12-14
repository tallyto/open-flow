import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { ignoreFavicon } from "./middlewares";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import { login } from "./controller/user";
dotenv.config({ path: __dirname + "config" + ".env" });

class App {
  public app = express();
  constructor() {
    this.database();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(ignoreFavicon);
    this.app.set("view engine", "ejs");
  }

  private database() {
    mongoose.connect("mongodb://localhost:27017/openrpa");
  }

  private routes() {
    this.app.use(userRouter);
    this.app.get("/login", (req, res, next) => {
      res.render("pages/index");
    });

    this.app.get("/PassiveSignout", async (req, res, next) => {
      if (req.query.username) {
        const { username, password } = req.query;
        const result = await login(username, password);
        if (result == "wrong password") {
          return res.redirect("/PassiveSignout");
        }
        if (result == "user not found") {
          return res.redirect("/PassiveSignout");
        } else {
          return res.cookie("token", result).sendStatus(200);
        }
      }
      res.render("pages/index", { error: "" });
    });

    this.app.get("/jwtlong", (req, res) => {
      const cookie = req.headers.cookie;

      const token = cookie?.split("=");
      if (token) {
        res.send({ jwt: token[1] });
      }
    });

    this.app.get("/config", (req, res, next) => {
      const config: any = {}
      config.wshost = "ws://localhost:3000"
      config.domain = "test.com.br"
      config.allow_user_registration = false
      config.allow_personal_nodered = false
      config.namespace = "rpa-websocket"
      config.nodered_domain_schema = "$nodered_id$.app.openiap.io"
      config.getting_started_url = "https://www.google.com"
      config.websocket_package_size = 1048576
      config.version = "1"
      config.supports_watch = false
      res.send(config)

    });

    this.app.post("/AddTokenRequest", (req, res, next) => {});

    this.app.get("/GetTokenRequest", (req, res, next) => {});
  }
}

export default new App().app;
