import { CEM } from "@betarost/cemserver";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const port = 80;
const target = "crypto-emergency.com";

const options = {
  port,
  hotReload: true,
  allowedHosts: [target],
  path: {
    src: path.resolve("app.js"),
    public: path.resolve("public"),
    fileName: "main.[fullhash].js",
    template: path.resolve("src/modules/template/index.html"),
  },
  proxy: {
    "/api/v2": {
      target: `https://${target}`,
      // target: `http://127.0.0.1:6060`,
      secure: false,
      ws: true,
      changeOrigin: true,
      // secure: false,
    },
    "/api": {
      target: `https://${target}`,
      changeOrigin: true,
      secure: false,
    },
    "/assets/upload": {
      target: `https://${target}`,
      changeOrigin: true,
      secure: false,
    },
    "/upload": {
      target: `https://${target}`,
      changeOrigin: true,
      secure: false,
    },
  },
}

if (process.env.DISABLERELOAD) {
  options.hotReload = false;
}

CEM.start(options)
//19.04.2023