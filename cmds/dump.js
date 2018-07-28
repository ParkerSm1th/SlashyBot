var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    if (message.author.id == 212630637365035009) {
      helpers.sql.get(`DELETE FROM channels WHERE createdBy ="${message.author.id}"`);
    }

  }

module.exports.help = {
  name:"dump",
  others:[]
}
