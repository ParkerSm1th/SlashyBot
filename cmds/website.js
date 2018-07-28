var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {
  helpers.sendEmbed(message.channel, "Slashy Websites", [{
      name: "Slashy",
      value: "https://slashy.co.uk"
    },
    {
      name: "JenkinsDesigns",
      value: "https://jenkinsdesigns.com - https://discord.gg/ygw3aaN"
    },
    {
      name: "Voltage Designs",
      value: "https://fischers.services - https://discord.gg/Rdmt74d"
    },
    {
      name: "Mineovation",
      value: "https://mineovation.com - https://discord.gg/qdqmgEV"
    },
    {
      name: "Ortix",
      value: "https://ortixteam.com - https://discord.gg/qqEaKmr"
    },
    {
      name: "United Designs",
      value: "https://discord.gg/n4vvrV6"
    }
  ]);

}

module.exports.help = {
  name:"website",
  others:["site", "web", "sites", "websites"]
}
