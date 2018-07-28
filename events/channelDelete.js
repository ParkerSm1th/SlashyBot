var includes = require('../cmds/includes.js');

module.exports = (bot, channel) => {
  includes.sql.get(`DELETE FROM channels WHERE channelID ="${channel.id}"`);
  includes.sql.get(`SELECT * FROM commissions WHERE channel ="${channel.id}"`).then(row => {
    if (row) {
      channel.guild.channels.get(row.channel).fetchMessages({around: row.messageid, limit: 1}).then(messages => {
        messages.first().delete().then(() => {
          includes.sql.get(`DELETE FROM commissions WHERE channel ="${channel.id}"`);
        });

      });
    }
  });
}
