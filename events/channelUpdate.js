var includes = require('../cmds/includes.js');

module.exports = (bot, old, channel) => {
  includes.sql.run(`UPDATE channels SET channelName = '${channel.name}', desc = '${channel.topic}', parentID = '${channel.parentID}' WHERE channelID ="${channel.id}"`).then(() => {

    includes.sql.get(`SELECT * FROM channels WHERE channelID ="${channel.id}"`).then(row => {

    });
  });
}
