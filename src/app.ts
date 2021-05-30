import express from "express";
import bodyParser from "body-parser";
import utils from "./utils";
var compression = require("compression");
import fs from "fs"
import path from 'path';

var app = express();
const port = 3005;

app.use(compression());
app.use(bodyParser.json());

(async () => {
  console.log("Server is ready to use on port " + port);
})();

app.post("/text-to-handwriting", async (req, res) => {
    try{
      const links = await utils.generateHandwriting(req.body.text);
      res.send(links)
    }catch(error){
      res.status(503).send(error)
    }
});



app.get("/*", function (req, res) {
    res.status(404).send("Error")
});

app.listen(port);
