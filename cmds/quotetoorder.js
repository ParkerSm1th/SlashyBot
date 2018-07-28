var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {

  if(helpers.checkPerms(message, "Management") || helpers.checkPerms(message, "Sales Representative")) {

     if (args.length > 1) {

       helpers.sql.get(`SELECT * FROM channels WHERE channelID ="${message.channel.id}" AND parentID = "${message.guild.channels.find('name', 'tickets').id}"`).then(row => {
         if (!row) {
           helpers.sendErrorEmbed(message.channel, "You can only use this command in quote channels.");
         } else {
           helpers.sql.run(`UPDATE channels SET type = 'order' WHERE channelID ="${message.channel.id}"`);
           message.channel.setName(args[1]).then(() => {
             message.channel.setParent(message.guild.channels.find('name', 'orders')).then(() => {
               message.channel.setTopic(`Open order for ${message.guild.members.find('id', row.createdBy)}`);
             })
           });
           helpers.sendEmbed(message.channel, "Updated Order", [
            {
              name: "Hello again!",
              value: "We have moved your quote into an order, if you believe this is wrong, please contact a member of support. From here we will grab some final details before proceeding to payment."
            }
          ]);
         }
       });

     } else {
       helpers.sendEmbed(message.channel, "Error", [
         {
           name: "Incorrect Format",
           value: "You must do -quotetoorder (client)-(project)"
         }
       ]);
     }

  } else {
    helpers.permsError(message.channel);

  }

}

module.exports.help = {
  name:"quotetoorder",
  others:["quoteorder", "qto"],
  disabled:['442807156174225419']
}
