var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    if (helpers.checkPerms(message, "Management") || helpers.checkPerms(message, "Sales Representative")) {
      helpers.sql.get(`SELECT * FROM channels WHERE channelID ="${message.channel.id}"`).then(row => {
        if (!row) {
          helpers.sendErrorEmbed(message.channel, "You can only use this command in quote, order, and hr channels.");
        } else {
          helpers.sql.run(`DELETE FROM channels WHERE channelID ="${message.channel.id}"`);
          if (args[1] != "dev") {
            helpers.sendSuccessEmbed(message.author, `You have closed the channel #${row.channelName}.`);
            message.author.send({
              files: [{
                attachment: 'logs/' + message.channel.id + ".txt",
                name: message.channel.id + '.txt'
              }]
            })
            .then(helpers.sendSuccessEmbed(message.channel, "Here are the logs for the channel " + message.channel.name))
            .catch(err => includes.errorLog(err));
            helpers.sendEmbed(message.guild.channels.find('name', 'log'), "Ticket Closed", [
              {
                name: `Channel Name`,
                value: `${row.channelName}`
              },
              {
                name: `Channel Owner`,
                value: `${message.guild.members.find('id', row.createdBy)}`
              },
              {
                name: `Channel Type`,
                value: `${row.type}`
              },
              {
                name: `Closed By`,
                value: `${message.author}`
              }
            ]);
            message.guild.channels.find('name', 'log').send({
              files: [{
                attachment: 'logs/' + message.channel.id + ".txt",
                name: message.channel.id + '.txt'
              }]
            })
            .catch(err => includes.errorLog(err));
            var channelid = message.channel.id;
            var channelname = message.channel.name;
            message.channel.delete();
            if (message.author.id != message.guild.members.find("id", row.createdBy).id) {
              helpers.sendSuccessEmbed(message.guild.members.find("id", row.createdBy), `Your ${row.type} channel (#${row.channelName}) has been closed by ${message.author}.`);
              message.guild.members.find("id", row.createdBy).send({
                files: [{
                  attachment: 'logs/' + channelid + ".txt",
                  name: channelid + '.txt'
                }]
              })
              .then(helpers.sendSuccessEmbed(message.channel, "Here are the logs for the channel " + channelname))
              .catch(err => includes.errorLog(err));
            }
          } else {
            message.channel.delete();
          }
        }
      });
    } else {
      helpers.permsError(message.channel);
    }

  }

module.exports.help = {
  name:"close",
  others:["closechannel"]
}
