var includes = require('../cmds/includes.js');
const request = require('request');
var querystring = require('querystring');

module.exports = (bot, helpers, messageReaction, user) => {
  if (user.bot) return;
  if (messageReaction.message.channel.type == "dm") {
    if (messageReaction.emoji == "✅") {
      helpers.sql.get(`SELECT * FROM logins WHERE messageid = "${messageReaction.message.id}"`).then(row => {
        if (row) {
          var form = {
              id: user.id,
              api: "lOl"
          };

          var formData = querystring.stringify(form);
          var contentLength = formData.length;
          request({
            headers: {
              'Content-Length': contentLength,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: 'https://slashy.co.uk/work/staff/allowLogin.php',
            body: formData,
            method: 'POST'
          }, function (err, res, body) {
            messageReaction.message.delete();
          });
        }
        includes.sql.run(`DELETE FROM logins WHERE messageid ="${messageReaction.message.id}"`);
      });
    } else if (messageReaction.emoji == "❌") {
      helpers.sql.get(`SELECT * FROM logins WHERE messageid = "${messageReaction.message.id}"`).then(row => {
        if (row) {
          var form = {
              id: user.id,
              api: "lOl",
              false: "1"
          };

          var formData = querystring.stringify(form);
          var contentLength = formData.length;
          request({
            headers: {
              'Content-Length': contentLength,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: 'https://slashy.co.uk/work/staff/allowLogin.php',
            body: formData,
            method: 'POST'
          }, function (err, res, body) {
            messageReaction.message.delete();
          });
        }
        includes.sql.run(`DELETE FROM logins WHERE messageid ="${messageReaction.message.id}"`);
      });
    }
  } else {
    includes.sql.get(`SELECT * FROM commissions WHERE messageid ="${messageReaction.message.id}" AND guildid="${messageReaction.message.guild.id}" AND claimed=0`).then(row => {
      if (row) {
        includes.log("Exists!");
        if (messageReaction.emoji == "✅") {
          messageReaction.message.edit({embed: {
              color: 0xC2762C,
              author: {
                name: `Claimed Commission - Claimed by ${user.username}`,
                icon_url: bot.user.avatarURL
              },
              url: "http://slashy.co.uk",
              fields: [{
                name: "Commission Name",
                value: row.name
              },
              {
                name: "Claimed By",
                value: user.username
              },
              {
                name: "Channel",
                value: `<#${row.channel}>`
              },
              {
                name: "Originally Posted On",
                value: row.createdon
              }],
              timestamp: new Date(),
              footer: {
                icon_url: bot.user.avatarURL,
                text: "© Slashy 2018"
              }
            }
          });
          channel = messageReaction.message.guild.channels.get(row.channel);
          if (!channel) {
            helpers.sendErrorEmbed(user, "The channel for the commission you are trying to claim has been deleted.");
          }
          channel.overwritePermissions(user, {
            READ_MESSAGES: true
          }).then(() => {
            includes.sql.get(`SELECT * FROM flport WHERE userid ="${user.id}"`).then(row => {
              if (row) {
                if (row.portfolio != "none") {
                    portfolio = row.portfolio;
                } else {
                  portfolio = "None Set, Simply ask " + user.username + " for their portfolio.";
                }
              } else {
                portfolio = "None Set, Simply ask " + user.username + " for their portfolio.";
              }
              helpers.sendEmbed(channel, " ⁮ ", [
                {
                  name: "Awesome! We found you a freelancer.",
                  value: "A freelancer has claimed your commission! They will be working with you on this commission. They will respond in this channel very soon."
                },
                {
                  name: "Freelancer's Name",
                  value: user.username
                },
                {
                  name: "Freelancer's Portfolio",
                  value: portfolio
                }
              ]);
              helpers.sql.run(`UPDATE commissions SET claimed = '${user.id}' WHERE messageid ="${messageReaction.message.id}" AND guildid="${messageReaction.message.guild.id}"`);
              helpers.sql.run(`UPDATE channels SET assigned = '${user.id}' WHERE channelID ="${channel.id}" AND guildID="${messageReaction.message.guild.id}"`);
            });

          }).catch(err => includes.errorLog(err));
        }
      }
    });
  }
}
