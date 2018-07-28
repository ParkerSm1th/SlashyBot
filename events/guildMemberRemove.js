var includes = require('../cmds/includes.js');

module.exports = (bot, helpers, member) => {
  var logChan = member.guild.channels.find("name", "log");
  var memjoined = member.displayName;
  helpers.sendEmbed(logChan, 'Member left', [
    {
      name: "User " + memjoined + " has left",
      value: "-----------------------------------"
    }
  ]);
}
