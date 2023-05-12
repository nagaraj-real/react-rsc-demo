const register = require("react-server-dom-webpack/node-register");
register();
const React = require("react");
const ReactApp = require("./api/components/App").default;
const express = require("express");
const cors = require("cors");
const { renderToPipeableStream } = require("react-server-dom-webpack/server");

const { readFileSync } = require("fs");
const path = require("path");
const app = new express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use("/static", express.static("dist"));

app.use("/react", (request, response) => {
  const manifest = readFileSync(
    path.resolve(__dirname, "../build/react-client-manifest.json"),
    "utf8"
  );
  const moduleMap = JSON.parse(manifest);
  console.log(moduleMap);
  const { pipe } = renderToPipeableStream(
    React.createElement(ReactApp),
    moduleMap
  );
  pipe(response);
});

app.listen(3001, () => {
  console.log("listening at 3001");
});
