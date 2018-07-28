var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {
  helpers.sendEmbed(message.channel, "Help Commands", [
    {
      name: "-website",
      value: "Shows all of slashy's websites"
    },
    {
      name: "-help",
      value: "Shows you this help menu"
    },
    { 
      name: "-membercount",
      value: "Shows you how many members are currently in the discord."
    },
    {
      name: "-branding",
      value: "Sends you a copy of all of our logos for your use."
    },
    {
      name: "-new",
      value: "Create an order channel"
    },
    {
      name: "-hr",
      value: "Create a Human Resources channel"
    },
    {
      name: "-support",
      value: "Create a support ticket"
    },
    {
      name: "-kiss",
      value: "Kiss a user"
    },
    {
      name: "-marry",
      value: "Marry a user"
    },
    {
      name: "-fact",
      value: "Receive a random fact"
    },
    {
      name: "-datenight",
      value: "Receive a random pick up line"
    }
  ]);

}

module.exports.help = {
  name:"help",
  others:["commands", "helpme", "cmds"]
}
