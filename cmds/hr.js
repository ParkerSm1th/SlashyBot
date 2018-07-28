var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {

  helpers.sql.get(`SELECT * FROM channels WHERE createdBy ="${message.author.id}" AND type = "hr" AND guildID = "${message.guild.id}"`).then(row => {
    if (!row) {
      var num = Math.floor(Math.random() * 90000) + 10000;
      includes
      message.guild.createChannel(`hr-${message.author.username}-${num}`, 'text', [
      {
        id: message.author.id,
        allow: ['READ_MESSAGES']
      },
      {
        id: message.guild.roles.find('name', '@everyone'),
        deny: ['READ_MESSAGES']
      },
      {
        id: message.guild.roles.find('name', 'Management'),
        allow: ['READ_MESSAGES']
      },
      {
        id: bot.user.id,
        allow: ['READ_MESSAGES']
      }
      ]).then(channel => {
        channel.setParent(message.guild.channels.find("name", "support"));
        channel.setTopic(`New HR Ticket opened by ${message.author}`);

        var newchannel = channel;

        helpers.sendEmbed(newchannel, "New HR Ticket", [
          {
            name: "New Ticket!",
            value: "Your Human Resources ticket has been created"
          }
        ]);

        helpers.sendEmbed(message.channel, "New Ticket", [
          {
            name: "Your hr ticket has been created.",
            value: `<#${channel.id}>`
          }
        ]);
        helpers.sql.run("INSERT INTO channels (channelID, channelRID, channelName, guildID, type, parentID, createdBy, createdOn, assigned, status, desc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [newchannel.id, num, newchannel.name, message.guild.id, "hr", newchannel.parentID, message.author.id, helpers.getTime(), " ", " ", `New HR Ticket opened by ${message.author}`]).then(() => {
          includes.log("Added channel to databse");
        }).catch(err => {
          includes.errorLog(err);
        });
      });
    } else {
      if (message.guild.channels.find('id', `${row.channelID}`) == null) {
        helpers.sendEmbed(message.channel, "Erm..", [
          {
            name: "Well this is awkward",
            value: `It looks like you already had a hr ticket open however it was closed manually and still showed up in the database. Please run the -hr command again..`
          }
        ]);
        helpers.sql.run(`DELETE FROM channels WHERE channelID = "${row.channelID}"`);
      } else {
        helpers.sendEmbed(message.channel, "Already open", [
          {
            name: "You already have a Human Resources ticket open.",
            value: `<#${row.channelID}>`
          }
        ]);
      }
    }
  });
}

module.exports.help = {
  name:"hr",
  others:["humanresources"]
}
