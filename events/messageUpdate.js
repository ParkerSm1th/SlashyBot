var includes = require('../cmds/includes.js');
const fs = require("fs");
module.exports = (bot, helpers, oldMessage, newMessage) => {
  if(newMessage.author.bot) return;
  var messagelog = `| EDIT | AT ${newMessage.editedAt}: ${oldMessage.author.username} (${oldMessage.author.id}) at ${oldMessage.createdAt}
  ${oldMessage.content}\n**NEW MESSAGE:** ${newMessage.content}\n`;
  fs.appendFileSync(`logs/${newMessage.channel.id}.txt`, messagelog);
}
