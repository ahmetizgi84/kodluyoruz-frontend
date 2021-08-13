// import getData from "./service";
const getData = require("./lib/service");

const data = getData(1);

data.then(function (result) {
  console.log(result);
});
