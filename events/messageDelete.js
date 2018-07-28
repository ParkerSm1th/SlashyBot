var includes = require('../cmds/includes.js');
const fs = require("fs");
module.exports = (bot, helpers, message) => {
  if(message.author == bot) return;
  var messagelog = `| DELETE | AT ${helpers.getTime()}: ${message.author.username} (${message.author.id}) at ${message.createdAt}
  ${message.content}\n`;
  fs.appendFileSync(`logs/${message.channel.id}.txt`, messagelog);
}
