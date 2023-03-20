import { ServerInit, ServerBuild, ServerStart } from "@betarost/cemserver";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const port = 80;
let hotReload = true;
const target = "crypto-emergency.com";
// const target = "idns.work"
const mode = "development";
// const mode = "production"

if (process.env.DISABLERELOAD) {
  hotReload = false;
}

ServerInit({
  target,
  hotReload,
  path: {
    src: path.resolve("app.js"),
    public: path.resolve("public"),
    fileName: "main.[fullhash].js",
    template: path.resolve("src/template/index.html"),
  },
  port,
  mode,
  allowedHosts: [target],
  proxy: {
    "/api/v2": {
      target: `https://${target}`,
      changeOrigin: true,
      secure: false,
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
});

ServerBuild({}).then((result) => {
  if (result) ServerStart(result);
});
