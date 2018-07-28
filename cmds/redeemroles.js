var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {
  // jenkinsdesigns
  if (message.guild.id == 442807156174225419) {
    switch (bot.guilds.find('name', 'JenkinsDesigns').roles.has) {
      case bot.guilds.find('name', 'JenkinsDesigns').roles.find('name', 'Freelancer').id:
        message.member.addRole(message.guild.roles.find('name', 'Jenkins Designs'));
      break;
      default:
    }
    helpers.sendSuccessEmbed(message.channel, "Your roles have been synced.");
  }

}

module.exports.help = {
  name:"redeemroles",
  others:["getroles"]
}
