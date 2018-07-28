var includes = require('./includes.js');
const hastebin = require('hastebin-gen');

function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
      return text;
  }
}

module.exports.run = async (bot, message, args, helpers) => {
  if (message.author.id !== '212630637365035009' && message.author.id !== '300678696036073482') return;
    try {
      const code = args.slice(1).join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string") {
        evaled = require("util").inspect(evaled);
      }
      if (evaled == '') {
        message.channel.send("ERROR EMPTY MESSAGE", {code:"xl"});
        return;
      }
      if (evaled.length > 1500) {
        hastebin(`${evaled}`, "js").then(r => {
          helpers.sendErrorEmbed(message.channel, `The output was over 1.5k characters, I have uploaded to hastebin. Uploaded to ${r}.`);
        }).catch(err => includes.errorLog(err));
      } else {
        message.channel.send(clean(evaled), {code:"xl"});
        message.channel.stopTyping();
      }
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      message.channel.stopTyping();
    }
}

module.exports.help = {
  name:"eval",
  others:["e"]
}
