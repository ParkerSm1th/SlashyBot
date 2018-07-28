var includes = require('./includes.js');
const Discord = require('discord.js');
const JSON = require('circular-json');
const hastebin = require('hastebin-gen');

module.exports.run = async (bot, message, args, helpers) => {

  helpers.sql.get(`SELECT COUNT(*) FROM channels WHERE createdBy ="${message.author.id}" AND type = "quote" AND guildID = "${message.guild.id}"`).then(row => {
    includes.log(Object.values(row)[0]);
    if (Object.values(row)[0] < 5) {
      var num = Math.floor(Math.random() * 90000) + 10000;
      message.guild.createChannel(`quote-${message.author.username}-${num}`, 'text', [
      {
        id: message.author.id,
        allow: ['READ_MESSAGES']
      },
      {
        id: message.guild.roles.find('name', '@everyone'),
        deny: ['READ_MESSAGES']
      },
      {
        id: message.guild.roles.find('name', 'Sales Representative'),
        allow: ['READ_MESSAGES']
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
        channel.setParent(message.guild.channels.find("name", "tickets"));
        channel.setTopic(`New Ticket opened by ${message.author}`);

        var newchannel = channel;

        helpers.sendEmbed(newchannel, "Thank you for opening a ticket! Do you want to run the wizard or speak to a sales representative today?", [
          {
            name: " ⁮ ",
            value: `
1⃣ Run the wizard 🤖\n2⃣ Let me speak to a sales representative 🗣`
          },
          {
            name: " ⁮ ",
            value: "Please react with your answer in the next 5 minutes otherwise we will assume you would like to speak to a sales representative."
          }
        ]).then(msg => {
          msg.react('1⃣').then(() => {
            msg.react('2⃣');
          })
          const filter = (reaction, user) => {
              return user.id === message.author.id;
          };
          function runWizard(r1) {
            helpers.sendEmbed(r1.message.channel, "You have selected the wizard! What service do you require?", [
              {
                name: " ⁮ ",
                value: `🇦 Discord Bot Development
🇧 Discord Setup
🇨 Minecraft Plugin Development
🇩 Minecraft Mod Development
🇪 Minecraft Server Setup
🇬 Minecraft Building
🇭 Minecraft Terraforming
🇮 Front-end Website Development
🇯 Back-end Website Development
🇰 XenForo Development
🇱 Buycraft/MinecraftMarket Development
🇲 GFX
🇳 Rendering
🇴 Vectoring
🇵 Drawing
🇶 UI/UX
🇷 Trailer Creations
🇸 Video Editing
🇹 Illustration
🇺 System Administration
🇻 Writing\n
🔄 Other`
              },
              {
                name: " ⁮ ",
                value: "Please react with your answer in the next 5 minutes otherwise we will assume you would like to speak to a sales representative."
              }
            ]).then(msg => {

            msg.react('🔄');


            const collector2 = new Discord.ReactionCollector(msg, filter, { time: 900000 });
              collector2.on('collect', r => {
                var type = "NONE";
                var role = "NONE";
                switch(r.emoji.name) {
                  case "🇦":
                    type = "Discord Bot Development";
                    role = "Bot Developer";
                  break;
                  case "🇧":
                    type = "Discord Setup";
                    role = "Discord Setups";
                  break;
                  case "🇨":
                    type = "Minecraft Plugin Development";
                    role = "Spigot Developer";
                  break;
                  case "🇩":
                    type = "Minecraft Mod Development";
                    role = "Sponge/Forge Developer";
                  break;
                  case "🇪":
                    type = "Minecraft Server Setup";
                    role = "Server Setups";
                  break;
                  case "🇬":
                    type = "Minecraft Building";
                    role = "Builder";
                  break;
                  case "🇭":
                    type = "Minecraft Terraforming";
                    role = "Terraformer";
                  break;
                  case "🇮":
                    type = "Front-end Website Development";
                    role = "Front End Developer";
                  break;
                  case "🇯":
                    type = "Back-end Website Development";
                    role = "Back End Developer";
                  break;
                  case "🇰":
                    type = "XenForo Development";
                    role = "Xenforo";
                  break;
                  case "🇱":
                    type = "Buycraft/MinecraftMarket Development";
                    role = "Buycraft/MCM";
                  break;
                  case "🇲":
                    type = "GFX";
                    role = "GFX Designer";
                  break;
                  case "🇳":
                    type = "Rendering";
                    role = "Render Artist";
                  break;
                  case "🇴":
                    type = "Vectoring";
                    role = "Vector Artist";
                  break;
                  case "🇵":
                    type = "Drawing";
                    role = "Drawn Artist";
                  break;
                  case "🇶":
                    type = "UI/UX";
                    role = "UI/UX";
                  break;
                  case "🇷":
                    type = "Trailer Creations";
                    role = "Trailer-Creator";
                  break;
                  case "🇸":
                    type = "Video Editing";
                    role = "Video-Editor";
                  break;
                  case "🇹":
                    type = "Illustration";
                    role = "Illustrator";
                  break;
                  case "🇺":
                    type = "System Administration";
                    role = "System-Admin";
                  break;
                  case "🇻":
                    type = "Writing";
                    role = "Writer";
                  break;
                  case "🔄":
                    type = "Other";
                    role = "Other";
                  break;
                  default:
                }
                if (type != "NONE") {
                  r.message.clearReactions();
                  collector2.stop();
                  helpers.sendEmbed(r.message.channel, "You have selected " + type + ". Have you selected the correct service?", [
                    {
                      name: " ⁮ ",
                      value: `✅ Yes
❎ No, choose again.`
                    },
                    {
                      name: " ⁮ ",
                      value: "Please react with your answer in the next 5 minutes otherwise we will assume you would like to speak to a sales representative."
                    }
                  ]).then(msg => {
                    msg.react('✅').then(() => {
                      msg.react('❎');
                    })
                    const collector3 = new Discord.ReactionCollector(msg, filter, { time: 900000 });
                    collector3.on('collect', r => {
                      if (r.emoji.name == "✅") {
                        r.message.clearReactions();
                        collector3.stop();
                        helpers.sendEmbed(r.message.channel, "Awesome! Please give your project a title!", [
                          {
                            name: " ⁮ ",
                            value: `This should be less than 4 words.`
                          },
                          {
                            name: " ⁮ ",
                            value: "Please respond with your answer in the next 5 minutes otherwise we will assume you would like to speak to a sales representative."
                          }
                        ]).then(msg => {
                          const collector4 = new Discord.MessageCollector(msg.channel, m => m.author.bot != true, { time: 900000 });
                          collector4.on('collect', r => {
                            var projecttitle = r.content;
                            collector4.stop();
                            helpers.sendEmbed(msg.channel, " ⁮ ", [
                              {
                                name: "Nice title for your project: " + projecttitle + ". Please describe your project in detail, in a single message.",
                                value: `We recommend this being over 1 sentence.`
                              },
                              {
                                name: " ⁮ ",
                                value: "Please respond with your answer in the next 5 minutes otherwise we will assume you would like to speak to a sales representative."
                              }
                            ]).then(msg => {
                              const collector5 = new Discord.MessageCollector(msg.channel, m => m.author.bot != true, { time: 900000 });
                              collector5.on('collect', r => {
                                var projectdesc = r.content;
                                collector5.stop();
                                if (role == "Other") {
                                  msg.channel.sendMessage(`<@&${message.guild.roles.find('name', 'Sales Representative').id}>`);
                                  helpers.sendEmbed(msg.channel, " ⁮ ", [
                                    {
                                      name: "Thank you for describing your project. We didn't get quite enough details though.",
                                      value: `We didn't get quite enough details to post this as a commission by itself however we did get enough details that once a sales representative comes in here it should be a very fast process.`
                                    },
                                    {
                                      name: "Project Service",
                                      value: "As you were not quite sure the sales representative will be able to help you out!"
                                    },
                                    {
                                      name: "Project Name",
                                      value: projecttitle
                                    },
                                    {
                                      name: "Project Description",
                                      value: projectdesc + "\n ⁮ "
                                    }
                                  ]);
                                } else {
                                   let desc = projectdesc;
                                   var role2 = msg.guild.roles.find('name', role);
                                   let name = projecttitle;
                                   let channel = msg.channel;
                                   message.guild.fetchInvites()
                                   .then(invites => {
                                     var guildinvite = invites.find(invite => invite.inviter.id === '300678696036073482');
                                     bot.guilds.get('442807156174225419').channels.find('name', 'commissions').sendMessage(`<@&${bot.guilds.get('442807156174225419').roles.find('name', role2.name).id}>`);
                                    helpers.sendEmbed(bot.guilds.get('442807156174225419').channels.find('name', 'commissions'), "New Commission", [
                                      {
                                        name: "Commission Name",
                                        value: name
                                      },
                                      {
                                        name: "Child Company",
                                        value: msg.guild.name + ` (${guildinvite})`
                                      },
                                      {
                                        name: "Channel",
                                        value: msg.channel.name
                                      },
                                      {
                                        name: "Description",
                                        value: desc
                                      },
                                      {
                                        name: "Role",
                                        value: role2.name
                                      },
                                      {
                                        name: "Posted By",
                                        value: `<@${r.author.id}>`
                                      }
                                    ]);
                                    message.guild.channels.find('name', 'commissions').sendMessage(`<@&${role2.id}>`);
                                    helpers.sendEmbed(message.guild.channels.find('name', 'commissions'), "New Commission - Not Claimed", [
                                      {
                                        name: "Commission Name",
                                        value: name
                                      },
                                      {
                                        name: "Channel",
                                        value: msg.channel.name
                                      },
                                      {
                                        name: "Description",
                                        value: desc
                                      },
                                      {
                                        name: "Role",
                                        value: role2.name
                                      },
                                      {
                                        name: "Posted By",
                                        value: `<@${r.author.id}>`
                                      }
                                    ]).then(mssg => {
                                      includes.log(mssg.id);
                                      helpers.sql.run("INSERT INTO commissions (name, desc, role, channel, createdby, createdon, claimed, messageid, guildid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, desc, role2.id, msg.channel.id, r.author.id, helpers.getTime(), 0, mssg.id, msg.guild.id]).then(() => {
                                        includes.log("Added commission to databse");
                                        helpers.sendSuccessEmbed(msg.channel, "Submitted this commission. A freelancer will reply soon.");
                                      }).catch(err => {
                                        includes.errorLog(err);
                                      });
                                      mssg.react("✅");
                                    }).catch(err => {
                                      includes.errorLog(err);
                                    });
                                   });
                                }
                              });
                            })
                          });
                        });
                      }
                      if (r.emoji.name == "❎") {
                        r.message.clearReactions();
                        collector3.stop();
                        runWizard(r1);
                      }
                    });
                  });
                }
              });
            });
          }
          const collector = new Discord.ReactionCollector(msg, filter, { time: 900000 });
          collector.on('collect', r => {
            if (r.emoji.name == "1⃣") {
              r.message.clearReactions();
              collector.stop();
              runWizard(r);
            }
            if (r.emoji.name == "2⃣") {
              r.message.channel.sendMessage(`<@&${message.guild.roles.find('name', 'Sales Representative').id}>`);
              helpers.sendEmbed(r.message.channel, "You have selected speaking to a sales representative", [
                {
                  name: " ⁮ ",
                  value: "A sales representative will be with you soon. While you wait, please describe your project."
                }
              ]);
              r.message.clearReactions();
              collector.stop();
            }
          });
        });

        if (args[1] != "dev") {
          helpers.sendEmbed(message.channel, "New Ticket", [
            {
              name: "Your ticket has been created.",
              value: `<#${channel.id}>`
            }
          ]);
        }
        helpers.sql.run("INSERT INTO channels (channelID, channelRID, channelName, guildID, type, parentID, createdBy, createdOn, assigned, status, desc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [newchannel.id, num, newchannel.name, message.guild.id, "quote", newchannel.parentID, message.author.id, helpers.getTime(), " ", " ", `New Ticket opened by ${message.author}`]).then(() => {
          includes.log("Added channel to databse");
          if (args[1] == "dev") {
            message.delete();
          }
        }).catch(err => {
          includes.errorLog(err);
        });
      });
    } else {
      helpers.sendEmbed(message.channel, "You already have 5 tickets open!", [
        {
          name: " ⁮ ",
          value: `Please close one of these tickets or contact management if this is a special case. I will go ahead and delete any channels that were manually deleted somehow though.`
        }
      ]);
    }
  });
}

module.exports.help = {
  name:"new",
  others:["quote", "newticket"],
  disabled:['442807156174225419']
}
