const Discord = require("discord.js");
const request = require("request");
const chalk = require("chalk");
const sql = require("sqlite");
sql.open("./slashy.sqlite");
function getTime() {
  var d = new Date();
  var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*+1));
  return nd.toLocaleString();
}
var bot = new Discord.Client();
module.exports = {
  successLog: function (message) {
    console.log(chalk.green(`(${getTime()}) [SUCCESS] ` + message));
  },

  errorLog: function (message) {
    console.log(chalk.red(`(${getTime()}) [ERROR] ` + message));
  },

  warnLog: function (message) {
    console.log(chalk.yellow(`(${getTime()}) [WARN] ` + message));
  },

  log: function (message) {
    console.log(chalk.cyan(`(${getTime()}) [LOG] ` + message));
  },

  logCommand: function (user, cmd) {
    console.log(chalk.cyan("[LOG] " + user.username + " (" + user.id + ") has successfully run the command " + cmd));
  },

  sql: sql
}
