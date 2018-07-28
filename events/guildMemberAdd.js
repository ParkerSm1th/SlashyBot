var includes = require('../cmds/includes.js');

module.exports = (bot, helpers, member) => {
  if (member.guild.id == 438048211228164128) return;

  if (member.user.username.includes('Ben J')) {
    member.ban("Alt");
    member.guild.channels.find("name", "welcome").sendMessage("Denied access to guild for user " + member.user.username);
    return;
  }

  role = member.guild.roles.find("name", "Member");
  member.addRole(role);
  var welcomeChan = member.guild.channels.find("name", "welcome");
  var memjoined = member.displayName;

    helpers.sendEmbed(welcomeChan, 'Welcome ' + memjoined, [
      {
        name: "Who are we",
        value: "Meet Slashy, we are an array of Service teams and Companies that provide top notch services and affordable prices. We are home to some of the biggest service teams that work around the clock to provide premium support. Build from the ground up we have a proper management team in place that handles everything from applications to financial reports."
      },
      {
        name: "Getting started",
        value: "To get started you may use the command -help to see a list of the commands. To open a ticket please type -new, to open a support request please type -support and to open a Human Resources ticket please type -hr. We have multiple Sales Representatives working around the clock to provide you with premium support."
      }
    ]);

  var logChan = member.guild.channels.find("name", "log");
  helpers.sendEmbed(logChan, 'Member joined', [
    {
      name: "User " + memjoined + " has joined",
      value: "-----------------------------------"
    }
  ]);
}
