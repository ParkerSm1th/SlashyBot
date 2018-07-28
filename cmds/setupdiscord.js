var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {
    var rolenames = ['President', 'Vice President', 'Slashy Team', 'Management', 'Sales Representative', 'Bots', 'Setups', 'Discord Setups', 'Server Setups', 'Configuration', 'Developer', 'Bot Developer', 'Spigot Developer', 'Sponge/Forge Developer', 'Frontend Developer', 'Backend Developer', 'Xenforo', 'Buycraft/MCM', 'Building', 'Builder', 'Terraformer', 'Design', 'Writer', 'GFX', 'Render Artist', 'Vector Artist', 'Drawn Artist', 'UI/UX', 'Trailer Creator', 'Video Editor', 'Illustrator', 'System Admin', 'Linux', 'Ubuntu', 'Windows', 'Freelancer', 'Partner', 'Retired Staff', 'Affiliate', 'Member', 'Client'];
    var rolecolours = ['4286F4', '84B3FF', 'FF9244', 'FFC344', '77ED44', 'FF9244', '44ED93', '616b7a', '616b7a', '616b7a', '44EDDC', '616b7a', '616b7a', '616b7a', '616b7a', '616b7a', '616b7a', '616b7a', 'A35AED', '616b7a', '616b7a', 'DE5AED', '616b7a', '616b7a', '616b7a', '616b7a', '616b7a', '616b7a', '616b7a', '616b7a', '616b7a', 'FF93CE', '616b7a', '616b7a',
    '616b7a', 'FF877A', '8A83C6', 'BCA000', '8ADBD7', 'FFC672', 'E88940'];
    /*
    President - #4286F4
    Vice President - #84B3FF
    Slashy Team - #FF9244
    Management - #FFC344
    Sales Representative - #77ED44
    Bots - #FF9244
    Setups - #44ED93
    Discord Setups - #616b7a
    Server Setups - #616b7a
    Configuration - #616b7a
    Developer - #44EDDC
    Bot Developer - #616b7a
    Spigot Developer - #616b7a
    Sponge/Forge Developer - #616b7a
    Frontend Developer - #616b7a
    Backend Developer - #616b7a
    Xenforo - #616b7a
    Buycraft/MCM - #616b7a
    Building - #A35AED
    Builder - #616b7a
    Terraformer - #616b7a
    Design - #DE5AED
    Writer - #616b7a
    GFX - #616b7a
    Render Artist - #616b7a
    Vector Artist - #616b7a
    Drawn Artist - #616b7a
    UI/UX - #616b7a
    Trailer Creator - #616b7a
    Video Editor - #616b7a
    Illustrator - #616b7a
    System Admin - #FF93CE
    Linux - #616b7a
    Ubuntu - #616b7a
    Windows - #616b7a
    Freelancer - #FF877A
    Partner - #8A83C6
    Retired Staff - #BCA000
    Affiliate - #8ADBD7
    Member - #FFC672
    Client - #E88940
    */
    if (message.author.id == 212630637365035009 || message.author.id == 300678696036073482) {
      guild = message.guild;
      guild.createChannel('tickets', 'category', [{
        id: guild.id,
        deny: ['SEND_MESSAGES']
      }])
      .then(() => {
        guild.createChannel('orders', 'category', [{
          id: guild.id,
          deny: ['SEND_MESSAGES']
        }])
        .then(() => {
          guild.createChannel('support', 'category', [{
            id: guild.id,
            deny: ['SEND_MESSAGES']
          }])
          .then(() => {
            guild.createChannel('30 days support', 'category', [{
              id: guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(() => {
              guild.createChannel('commissions', 'text', [{
                id: guild.id,
                deny: ['SEND_MESSAGES']
              }])
              .then(() => {
                guild.createChannel('log', 'text', [{
                  id: guild.id,
                  deny: ['SEND_MESSAGES']
                }])
                .then(() => {
                  for (i=0;i<rolenames.length;i++) {
                    includes.log(rolenames[i] + " - #" + rolecolours[i]);
                    if (guild.roles.find('name', rolenames[i]) == null) {
                      guild.createRole({
                        name: rolenames[i],
                        color: rolecolours[i],
                        mentionable: true,
                      }).then(role => {
                        includes.log(`Successfully created the role ${role.name}.`);
                      }).catch(err => includes.errorLog(err));
                    }
                  }
                  helpers.sendSuccessEmbed(message.channel, "Successfully setup all channels and roles. Now you need to add permissions to Freelancer and other roles.");
                })
                .catch(err => includes.errorLog(err));
              })
              .catch(err => includes.errorLog(err));
            })
            .catch(err => includes.errorLog(err));
          })
          .catch(err => includes.errorLog(err));
        })
        .catch(err => includes.errorLog(err));
      })
      .catch(err => includes.errorLog(err));
    }

  }

module.exports.help = {
  name:"setupdiscord",
  others:[],
  disabled:['442807156174225419']
}
