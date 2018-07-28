var includes = require('./includes.js');
var arraySort = require('array-sort');

module.exports.run = async (bot, message, args, helpers) => {

  if (helpers.checkPerms(message, "Management") || helpers.checkPerms(message, "Sales Representative")) {
    helpers.sql.get(`SELECT * FROM channels WHERE channelID ="${message.channel.id}"`).then(row => {
      if (!row) {
        helpers.sendErrorEmbed(message.channel, "You can only use this command in quote, order, and hr channels.");
      } else {
        if (args.length > 3) {
          var role = message.mentions.roles.first();
          if (role == null) {
            helpers.sendErrorEmbed(message.channel, "You must do -commission @Role (Commission Name) (Details)");
            return true;
          }
          let befdesc = args.slice(2);
          let desc = args.join(" ").slice(role.id.length + args[0].length + args[2].length + 6);
          let name = befdesc[0];
          let channel = message.channel;
          message.guild.fetchInvites()
          .then(invites => {
            var guildinvite = invites.find(invite => invite.inviter.id === '300678696036073482');
            bot.guilds.get('442807156174225419').channels.find('name', 'commissions').sendMessage(`<@&${bot.guilds.get('442807156174225419').roles.find('name', role.name).id}>`);
            helpers.sendEmbed(bot.guilds.get('442807156174225419').channels.find('name', 'commissions'), "New Commission", [
              {
                name: "Commission Name",
                value: name
              },
              {
                name: "Child Company",
                value: message.guild.name + ` (${guildinvite.url})`
              },
              {
                name: "Channel",
                value: message.channel.name
              },
              {
                name: "Description",
                value: desc
              },
              {
                name: "Role",
                value: role.name
              },
              {
                name: "Posted By",
                value: `<@${message.author.id}>`
              }
            ]);
            message.guild.channels.find('name', 'commissions').sendMessage(`<@&${role.id}>`);
            helpers.sendEmbed(message.guild.channels.find('name', 'commissions'), "New Commission - Not Claimed", [
              {
                name: "Commission Name",
                value: name
              },
              {
                name: "Channel",
                value: `<#${message.channel.id}>`
              },
              {
                name: "Description",
                value: desc
              },
              {
                name: "Role",
                value: role.name
              },
              {
                name: "Posted By",
                value: `<@${message.author.id}>`
              }
            ]).then(msg => {
              includes.log(msg.id);
              helpers.sql.run("INSERT INTO commissions (name, desc, role, channel, createdby, createdon, claimed, messageid, guildid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, desc, role.id, message.channel.id, message.author.id, helpers.getTime(), 0, msg.id, message.guild.id]).then(() => {
                includes.log("Added commission to databse");
                helpers.sendSuccessEmbed(message.channel, "Our talented freelancers will soon claim this project and complete it for you. When they do, please discuss in thorough details of the project and a finalised price.");
              }).catch(err => {
                includes.errorLog(err);
              });
              msg.react("✅");
            }).catch(err => {
              includes.errorLog(err);
            });
          })
          .catch(console.error);


        } else {
          helpers.sendErrorEmbed(message.channel, "You must do -commission @Role (Commission Name) (Details)");
        }
    }
    });
  } else {
    helpers.permsError(message.channel);
  }

}

module.exports.help = {
  name:"commission",
  others:["newcommission", "com"],
  disabled:['442807156174225419']
}
