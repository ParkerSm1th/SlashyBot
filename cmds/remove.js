var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {
  if(helpers.checkPerms(message, "Management") || helpers.checkPerms(message, "Sales Representative")) {

     if (args.length > 1) {

       helpers.sql.get(`SELECT * FROM channels WHERE channelID ="${message.channel.id}"`).then(row => {
         if (!row) {
           helpers.sendErrorEmbed(message.channel, "You can only use this command in quote, hr, and support channels.");
         } else {
           var person = message.mentions.users.first();
           message.channel.overwritePermissions(person, {
             READ_MESSAGES: false
           }).then(() => helpers.sendSuccessEmbed(message.channel, `${person} has been removed from this channel!`)).catch(console.error);
         }
       });

     } else {
       helpers.sendEmbed(message.channel, "Error", [
         {
           name: "Incorrect Format",
           value: "You must do -remove @User"
         }
       ]);
     }

  } else {
    helpers.permsError(message.channel);

  }

}

module.exports.help = {
  name:"remove",
  others:[]
}
