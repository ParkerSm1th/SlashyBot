var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    var membl = [];

    if (message.author.id == 212630637365035009) {
      bot.guilds.get(args[1]).fetchMembers().then(members => {
        members.forEach(function(member) {
            if (member.roles.has(bot.guilds.get(args[1]).roles.find('name', 'Freelancer').id)) {
              membl.push(member);
            }
          }).then(() => {
            message.channel.send(membl.join(", "));
          });
        });
      }
  }

module.exports.help = {
  name:"checkfreelancers",
  others:[]
}
