var includes = require('./includes.js');

function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
      return text;
  }
}

module.exports.run = async (bot, message, args, helpers) => {

  if (message.author.id != 212630637365035009) return;
  var number = args[1];
  var codeor = args.join(" ").slice(args[0].length + args[1].length + 2);
  var code = `
    for (i=0;i<${number};i++) {
      ${codeor};
    }
  `;
  let evaled = eval(code);
  if (evaled.length > 1500) {
    hastebin(`${evaled}`, "js").then(r => {
      helpers.sendErrorEmbed(message.channel, `The output was over 1.5k characters, I have uploaded to hastebin. Uploaded to ${r}.`);
    }).catch(err => includes.errorLog(err));
  } else {
    message.channel.send(clean(evaled), {code:"xl"});
  }

}

module.exports.help = {
  name:"runfor",
  others:["rf"]
}
