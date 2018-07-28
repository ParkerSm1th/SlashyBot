var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {

  if (helpers.checkPerms(message, "Management")) {
    let warnMember = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!warnMember) {
      helpers.sendErrorEmbed(message.channel, "Please mention a valid member.");
    }
    let warnReason = args.slice(2).join(' ');
    if(!warnReason) {
      warnReason = "Breaking Slashy Inc. Rules";
    }
    const warnExample = message.mentions.users.first();
    const warnExamp = warnExample.username;
    var num = Math.floor(Math.random() * 90000) + 10000;
    helpers.sql.run(`INSERT INTO punishments (userid, username, type, op, timestamp, reason, guildid, active, punishid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [warnMember.id, warnMember.user.username, "warn", message.author.id, helpers.getTime(), warnReason, message.guild.id, "1", num]).then(row => {
      helpers.sendEmbed(warnMember, `You've been warned on ${message.guild.name}.`, [
       {
         name: "Reason",
         value: warnReason
       }
      ]);
      var punishmentss = message.guild.channels.find("name", `punishments`);
      helpers.sendEmbed(punishmentss, "User Warned - Warn #" + num, [
       {
         name: "Member - " + warnExamp,
         value: "Reason - " + warnReason
       }
      ]);
      helpers.sendSuccessEmbed(message.channel, `${warnMember} has been warned on ${message.guild.name} for ${warnReason}.`);
    });

  } else {
    helpers.permsError(message.channel);
  }

}

module.exports.help = {
  name:"warn",
  others:["warnn"]
}
