var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {

  if(helpers.checkPerms(message, "Management") || helpers.checkPerms(message, "Sales Representative")) {

       helpers.sql.get(`SELECT * FROM channels WHERE channelID ="${message.channel.id}" AND parentID = "${message.guild.channels.find('name', 'orders').id}"`).then(row => {
         if (!row) {
           helpers.sendErrorEmbed(message.channel, "You can only use this command in order channels.");
         } else {
           helpers.sql.run(`UPDATE channels SET type = 'supportdays' WHERE channelID ="${message.channel.id}"`);
           message.channel.setName('sd-' + row.channelRID).then(() => {
             message.channel.setParent(message.guild.channels.find('name', '30 days support')).then(() => {
               message.channel.setTopic(`Closed order for ${message.guild.members.find('id', row.createdBy)}, 30 days of support started on ${helpers.getTime()}.`);
             })
           });
           helpers.sendEmbed(message.channel, "Support Days", [
            {
              name: "Hello again!",
              value: "We hope that you have enjoyed working with us. Just a reminder that this is a Slashy Inc. Company. If you ever have any problems in the next 30 days please message in here and we'd be happy to help you."
            }
          ]);
         }
       });

  } else {
    helpers.permsError(message.channel);

  }

}

module.exports.help = {
  name:"supportdays",
  others:["sd"],
  disabled:['442807156174225419']
}
