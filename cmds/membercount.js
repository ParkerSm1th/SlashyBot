var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {
  message.guild.fetchMembers()
  .then(() => {
    helpers.sendEmbed(message.channel, "Grabbing Statistics", [
      {
        name: "Members located in this discord",
        value: message.guild.members.size
      },
      {
        name: "Members located in the whole of Slashy Inc",
        value: bot.guilds.find("name", "JenkinsDesigns").memberCount + bot.guilds.find("name", "Ortix Team").memberCount + bot.guilds.find("name", "Voltage Designs").memberCount + bot.guilds.find("name", "Slashy Inc.").memberCount + bot.guilds.find("name", "United Designs").memberCount
      }
    ]);
  })
  .catch(err => includes.errorLog(err));

}

module.exports.help = {
  name:"membercount",
  others:["members"]
}
