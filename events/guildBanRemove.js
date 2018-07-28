var includes = require('../cmds/includes.js');

module.exports = (bot, helpers, guild, user) => {
  includes.sql.get(`SELECT * FROM punishments WHERE userid ="${user.id}" AND type="ban"`).then(row => {
    if (row) {
      includes.sql.run(`UPDATE punishments SET active = '0' WHERE userid ="${user.id}"`);
      helpers.sendEmbed(guild.channels.find('name', 'punishments'), `${user.username} has been unbanned - Ban #${row.punishid}`, [
        {
          name: "Username",
          value: user.username
        },
        {
          name: "Ban Reason",
          value: row.reason
        },
        {
          name: "Original Ban Date",
          value: row.timestamp
        }
      ]);
    }
  });
}
