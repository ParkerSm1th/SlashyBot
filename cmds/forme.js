var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {

  /*helpers.sql.run("CREATE TABLE IF NOT EXISTS flport (userid TEXT, portfolio TEXT)").then(() => {
    helpers.sendSuccessEmbed(message.channel, "Created the flport table.");
  });*/

  /*helpers.sql.run("CREATE TABLE IF NOT EXISTS commissions (name TEXT, desc TEXT, role TEXT, channel TEXT, createdby TEXT, createdon TEXT, claimed TEXT, messageid TEXT, guildid TEXT)").then(() => {
    helpers.sendSuccessEmbed(message.channel, "Created the commissions table.");
  });*/

  /*helpers.sql.run("CREATE TABLE IF NOT EXISTS logins (discordid TEXT, messageid TEXT)").then(() => {
    message.channel.send("k");
  });*/

  /*helpers.sql.run("CREATE TABLE IF NOT EXISTS pp (paymentid TEXT, messageid TEXT, channelid TEXT, payerid TEXT, amount TEXT, payed TEXT)").then(() => {
    message.channel.send("k");
  });*/

  /*if (message.author.id == "212630637365035009") {
    helpers.sendSuccessEmbed(message.channel, "Banning alts by the name of " + args.join(" ").slice(args[0].length + 1));
    message.guild.fetchMembers().then(() => {
      message.guild.members.forEach(function (member) {
        if (member.user.username.includes(args.join(" ").slice(args[0].length + 1))) {
          member.ban("Spam Account");
          includes.log(`Banned ${member.id} | New count: ${message.guild.members.size}`);
        }
      });
    });
  }*/

}

module.exports.help = {
  name:"crpp",
  others:[]
}
