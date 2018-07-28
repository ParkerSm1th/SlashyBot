var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {

  if(!message.member.roles.some(r=>["Management"].includes(r.name)) ) {
    helpers.permsError(message.channel);
  } else {
    const deleteCount = parseInt(args[1], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return helpers.sendErrorEmbed(message.channel, "Please choose a number between 2-100");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

    helpers.sendEmbed(message.channel, "Purge", [
     {
       name: "Success",
       value: "Purged " + deleteCount + " messages"
     }
   ]);
  }
}

module.exports.help = {
  name:"purge",
  others:["purg"]
}
