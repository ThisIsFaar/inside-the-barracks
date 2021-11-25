const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/index.html", (req, res) => {
  //   res.send("Hello World!");
  app.use(express.static("public"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
