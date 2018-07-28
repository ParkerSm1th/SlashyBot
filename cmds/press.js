var includes = require('./includes.js');
module.exports.run = async (bot, message, args, helpers) => {
  message.channel.send({
    files: [{
      attachment: './SlashyBranding.zip',
      name: 'SlashyBranding.zip'
    }]
  })
  .then(helpers.sendSuccessEmbed(message.channel, "Please click below to download Slashy Inc's company branding."))
  .catch(console.error);
}
 
module.exports.help = {
  name:"press",
  others:["branding"]
}
