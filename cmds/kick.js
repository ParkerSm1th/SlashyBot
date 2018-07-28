var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    if(!message.member.roles.some(r=>["Management"].includes(r.name)) )
      return helpers.permsError(message.channel);

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return helpers.sendErrorEmbed(message.channel, "Please mention a valid member.");
    if(!member.kickable)
      return helpers.sendErrorEmbed(message.channel, "You cannot kick this member");

    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(2).join(' ');
    if(!reason) reason = "No reason provided";

    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));

      const kickExample = message.mentions.users.first();
      const kickExamp = kickExample.username;

      var punishment = message.guild.channels.find("name", `punishments`);
      helpers.sendEmbed(punishment, "User Kicked", [
       {
         name: "Member - " + kickExamp,
         value: "Reason - " + reason
       }
     ]);
     message.reply("Done");

  }

module.exports.help = {
  name:"kick",
  others:["kicky"]
}
