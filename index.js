const express = require("express");
const app = express();
const port = 8080;
const VError = require('verror');

const appInsights = require("applicationinsights");

appInsights
  .setup("c4424ebf-38df-4e5c-8eb1-914b618839e0")
  .setAutoCollectConsole(true, true)
  .start();

const ticks = new Date().getTime();

console.log(`App Insights Started: ${ticks}`);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/error", (req, res, next) => {
  var ex = new VError(`An expected error has occured! ${ticks}`, { foo: 'bar'});
  next(ex);
  return res.send("An error has occured!");
});

app.get("/error2", (req, res) => {
  setTimeout(() => {
    throw new VError('Timeout!');
  }, 5000);
  console.log(`Expecting an error ${ticks}`);
  res.send("async error");
});

app.use((err, req, res, next) => {
    console.log('error middleware');
    throw err;
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
