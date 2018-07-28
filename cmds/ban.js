var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {

  if (helpers.checkPerms(message, "Management")) {
    let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!banMember) {
      helpers.sendErrorEmbed(message.channel, "Please mention a valid member.");
    }
    if(!banMember.bannable) {
      helpers.sendErrorEmbed(message.channel, "This user cannot be banned");
    }
    let banReason = args.slice(2).join(' ');
    if(!banReason) {
      banReason = "Breaking Slashy Inc. Rules";
    } 
    banMember.ban(banReason).then(() => {
      const banExample = message.mentions.users.first();
      const banExamp = banExample.username;
      var num = Math.floor(Math.random() * 90000) + 10000;
      helpers.sql.run(`INSERT INTO punishments (userid, username, type, op, timestamp, reason, guildid, active, punishid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [banMember.id, banMember.user.username, "ban", message.author.id, helpers.getTime(), banReason, message.guild.id, "1", num]).then(row => {
        var punishmentss = message.guild.channels.find("name", `punishments`);
        helpers.sendEmbed(punishmentss, "User Banned - Ban #" + num, [
         {
           name: "Member - " + banExamp,
           value: "Reason - " + banReason
         }
        ]);
        helpers.sendSuccessEmbed(message.channel, `${banMember} has been banned from ${message.guild.name} for ${banReason}.`);
      });
    }).catch(err => {
      helpers.sendErrorEmbed(message.channel, `Failed to ban ${banMember} due to ${error}. (LOGGED)`);
      includes.errorLog(err);
    });
  } else {
    helpers.permsError(message.channel);
  }

}

module.exports.help = {
  name:"ban",
  others:["getridof"]
}
