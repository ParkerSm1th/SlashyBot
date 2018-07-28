var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    if (args.length != 2) {
      helpers.sendEmbed(message.channel, "Incorrect Usage", [
        {
          name: "You must specify a name",
          value: "-marry (user)"
        }
      ]);
      return true;
    } else {
      if (message.mentions.users.first() != null) {
        const muserExample = message.mentions.users.first();
        const mactExamp = muserExample.username;
        const kmissComeback = ["I, Mr Slashy Discord Bot. Approves", "Haha, you won't last 2 minutes", "Just run -divorce now...", "Congratulations son."];
        const mkissTextEx = kmissComeback[Math.floor(Math.random()*kmissComeback.length)];
        if(message.member.roles.find("name", "Married")) {
          helpers.sendEmbed(message.channel, "YOU CHEAT!!!", [
              {
                name: "Why are you cheating on your partner ;(",
                value: "To divorce, type -divorce"
              }
            ]);
        } else {
          if(message.author.username == mactExamp) {
            helpers.sendEmbed(message.channel, "Agh, Err, ehh", [
              {
                name: "Unfortunately you cannot marry yourself",
                value: "Try -datenight to find some secret tips, hehe"
              }
            ]);
          } else {
            const roleToMarryAdd = message.guild.roles.find('name', 'Married');
            message.member.addRole(roleToMarryAdd);
            helpers.sendEmbed(message.channel, "The Slashy Wedding", [
              {
                name: message.author.username + " has married " + mactExamp,
                value: mkissTextEx
              }
            ]);
          }
        }
      } else {
        helpers.sendEmbed(message.channel, "Incorrect Usage", [
          {
            name: "You must specify a real user",
            value: "-marry (user)"
          }
        ]);
      }
    }

  }

module.exports.help = {
  name:"marry",
  others:["getmarried"]
}
