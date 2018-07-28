const Discord = require('discord.js');
const TOKEN = "GOODONE";
const PREFIX = "-";
const fs = require("fs");
const sql = require("sqlite");
var Paypal = require('paypal-express-checkout');
var paypal = Paypal.init('u', 'thot', 'i was dumb but im not L', 'http://api.yeetdev.com:3000/payments/return', 'http://api.yeetdev.com:3000/payments/cancel');
sql.open("./slashy.sqlite");

var express = require('express');
var app = express();

var api = "haha";

function returnData(res, json) {
  if (json != "" && json != null) {
    res.json([{"success" : "true"}, {"data" : json}]);
  } else {
    res.json([{"success" : "false"}, {"error" : "No data"}]);
  }
}



// FUNCTIONS!!

function sendEmbed(channel, title, fields) {
  return new Promise((resolve, reject)=>{
    channel.send({embed: {
        color: 0xC2762C,
        author: {
          name: title,
          icon_url: bot.user.avatarURL
        },
        url: "http://slashy.co.uk",
        fields: fields,
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: "© Slashy 2018"
        }
      }
    }).then(message => {
      resolve(message);
    }).catch(err => {
      reject(err);
    });
  });
}


function sendErrorEmbed(channel, content) {
  return new Promise((resolve, reject)=>{
    channel.send({embed: {
        color: 0xC2762C,
        author: {
          name: " ",
          icon_url: bot.user.avatarURL
        },
        url: "https://slashy.co.uk",
        fields: [
          {
            name: "An error occured",
            value: content
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: "© Slashy 2018"
        }
      }
    }).then(message => {
      resolve(message);
    }).catch(err => {
      reject(err);
    });
  });
}

function sendSuccessEmbed(channel, content) {
  return new Promise((resolve, reject)=>{
    channel.send({embed: {
        color: 0xC2762C,
        author: {
          name: "⁫ ",
          icon_url: bot.user.avatarURL
        },
        url: "http://slashy.co.uk",
        fields: [
          {
            name: "Success",
            value: content
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: "© Slashy 2018"
        }
      }
    }).then(message => {
      resolve(message);
    }).catch(err => {
      reject(err);
    });
  });
}

function permsError(channel) {
  return new Promise((resolve, reject)=>{
    channel.send({embed: {
        color: 0xC2762C,
        author: {
          name: "Error",
          icon_url: bot.user.avatarURL
        },
        url: "http://slashy.co.uk",
        fields: [
          {
            name: "Permission Denied",
            value: "You are not allowed to do this!"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: "© Slashy 2018"
        }
      }
    }).then(message => {
      resolve(message);
    }).catch(err => {
      reject(err);
    });
  });
}

function checkPerms(message, role) {
  if (message.member.roles.has(message.guild.roles.find('name', role).id)) {
    return true;
  } else {
    return false;
  }
}

function getTime() {
  var d = new Date();
  var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*+1));
  return nd.toLocaleString();
}


const helpers = {
    sendEmbed: sendEmbed,
    sendErrorEmbed: sendErrorEmbed,
    sendSuccessEmbed: sendSuccessEmbed,
    permsError: permsError,
    checkPerms: checkPerms,
    sql: sql,
    getTime: getTime
};

var chalk = require('chalk');
function successLog(message) {
  console.log(chalk.green(`(${helpers.getTime()}) [SUCCESS] ` + message));
}

function errorLog(message) {
  console.log(chalk.red(`(${helpers.getTime()}) [ERROR] ` + message));
}

function warnLog(message) {
  console.log(chalk.yellow(`(${helpers.getTime()}) [WARN] ` + message));
}

function log(message) {
  console.log(chalk.cyan(`(${helpers.getTime()}) [LOG] ` + message));
}

function logCommand(message, cmd) {
  console.log(chalk.cyan(`(${helpers.getTime()}) [LOG] ` + message.author.username + " (" + message.author.id + ") has successfully run the command " + cmd + " in " + message.channel.name + " on " + message.guild.name));
}

function logErrorCommand(message, cmd) {
  console.log(chalk.cyan(`(${helpers.getTime()}) [LOG] ` + message.author.username + " (" + message.author.id + ") has tried to run the command " + cmd + " in " + message.channel.name + " on " + message.guild.name + " (Command not found)"));
}

log("-----------------[This discord bot was made by Parker Smith]-----------------");
log("This is what logging is for Slashys Bot:");
successLog("This is a success");
errorLog("This is an error");
warnLog("This is a warn");
log("-----------------------------------------------------------------------------");

commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {

  if(err) errorLog(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    errorLog("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    if (f == "includes.js") return;
    let props = require(`./cmds/${f}`);
    successLog(`./cmds/${f} loaded!`);
    commands.set(props.help.name, props);
    if (props.help.others != null) {
      props.help.others.forEach((name) => {
        commands.set(name, props);
      });
    }
  });
});

// API

// Paypal

app.get('/payments/cancel', function(req, res){
  if (req.query.token != null && req.query.PayerID != null);
  console.log(req.query.token + " " + req.query.PayerID);

  paypal.detail(req.query.token, req.query.PayerID, function(err, data, invoiceNumber, price) {
    helpers.sql.get(`SELECT * FROM pp WHERE paymentid ="${invoiceNumber}"`).then(row => {
      if (row) {
        log("Exists!");
        log(JSON.stringify(row));
        bot.channels.get(row.channelid).fetchMessage(row.messageid).then(msg => {
        msg.edit({embed: {
            color: 0xC2762C,
            author: {
              name: `Paid Invoice`,
              icon_url: bot.user.avatarURL
            },
            url: "http://slashy.co.uk",
            fields: [{
              name: "Amount",
              value: "$" + row.amount
            },
            {
              name: "Client",
              value: bot.channels.get(row.channelid).guild.members.get(row.payerid).user.tag
            },
            {
              name: "Paid Status",
              value: '❌ Cancelled!'
            }],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "© Slashy 2018"
            }
          }

        });
        });
        res.redirect('https://slashy.co.uk/canceledPayment.php');
      }
    });
  });
});

app.get('/payments/return', function(req, res){
  if (req.query.token != null && req.query.PayerID != null);
  console.log(req.query.token + " " + req.query.PayerID);

  paypal.detail(req.query.token, req.query.PayerID, function(err, data, invoiceNumber, price) {

  if (data.ACK == 'Success') {
    helpers.sql.get(`SELECT * FROM pp WHERE paymentid ="${invoiceNumber}"`).then(row => {
      if (row) {
        log("Exists!");
        log(JSON.stringify(row));
        bot.channels.get(row.channelid).fetchMessage(row.messageid).then(msg => {
        msg.edit({embed: {
            color: 0xC2762C,
            author: {
              name: `Paid Invoice`,
              icon_url: bot.user.avatarURL
            },
            url: "http://slashy.co.uk",
            fields: [{
              name: "Amount",
              value: "$" + row.amount
            },
            {
              name: "Client",
              value: bot.channels.get(row.channelid).guild.members.get(row.payerid).user.tag
            },
            {
              name: "Paid Status",
              value: '✅ Paid'
            }],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "© Slashy 2018"
            }
          }

        });
        });
        helpers.sql.get(`SELECT * FROM channels WHERE channelID ="${row.channelid}" AND parentID = "${bot.channels.get(row.channelid).guild.channels.find('name', 'tickets').id}"`).then(row2 => {
          if (!row2) {

          } else {
            helpers.sql.run(`UPDATE channels SET type = 'order' WHERE channelID ="${row.channelid}"`);
            bot.channels.get(row.channelid).setName(`${bot.channels.get(row.channelid).guild.members.find('id', row2.createdBy).user.username}-${row2.channelRID}`).then(() => {
              bot.channels.get(row.channelid).setParent(bot.channels.get(row.channelid).guild.channels.find('name', 'orders')).then(() => {
                bot.channels.get(row.channelid).setTopic(`Open order for ${bot.channels.get(row.channelid).guild.members.find('id', row2.createdBy)}`);
              })
            });
            helpers.sendEmbed(bot.channels.get(row.channelid), "Updated Order", [
             {
               name: "Hello again!",
               value: "We have moved your quote into an order, if you believe this is wrong, please contact a member of support. This means that payment was successful using our -pay command."
             }
           ]);
          }
        });
        res.redirect('https://slashy.co.uk/paymentSuccess.php');
      }
    });
  }
  });
});

// Portfolio

app.get('/portfolio/:id/:api',function(req,res) {
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.get(`SELECT * FROM flport WHERE userid = "${id}"`).then(row => {
      returnData(res, row);
    });
});

// Commissions

app.get('/commissions/all/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    sql.all(`SELECT * FROM commissions`).then(row => {
      returnData(res, row);
    });
});

app.get('/commissions/user/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM commissions WHERE createdby = "${id}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/commissions/guild/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM commissions WHERE guildid = "${id}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/commissions/claimed/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM commissions WHERE claimed != "0"`).then(row => {
      returnData(res, row);
    });
});

app.get('/commissions/unclaimed/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM commissions WHERE claimed = "0"`).then(row => {
      returnData(res, row);
    });
});



// Tickets

app.get('/tickets/all/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    sql.all(`SELECT * FROM channels`).then(row => {
      returnData(res, row);
    });
});

app.get('/tickets/user/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM channels WHERE createdby = "${id}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/tickets/user/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM channels WHERE createdBy = "${id}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/tickets/user/:id/:type/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    var type = req.params.type;
    sql.all(`SELECT * FROM channels WHERE createdBy = "${id}" AND type = "${type}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/tickets/guild/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM channels WHERE guildID = "${id}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/tickets/guild/:id/:type/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    var type = req.params.type;
    sql.all(`SELECT * FROM channels WHERE guildID = "${id}" AND type = "${type}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/tickets/type/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM channels WHERE type = "${id}"`).then(row => {
      returnData(res, row);
    });
});

// Guild Data

app.get('/guild/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    var guild = bot.guilds.get(id);
    guild.fetchMembers().then(() => {
      returnData(res, guild);
    });
});

app.get('/guild/name/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    var guild = bot.guilds.find('name', id);
    returnData(res, guild);
});

app.get('/members/:api', function(req, res){
  if (req.params.api != api) {
    res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
    return true;
  }
  var tm = bot.guilds.find("name", "JenkinsDesigns").memberCount + bot.guilds.find("name", "Ortix Team").memberCount + bot.guilds.find("name", "Voltage Designs").memberCount + bot.guilds.find("name", "Slashy Inc.").memberCount + bot.guilds.find("name", "United Designs").memberCount;
  res.json([{"success" : "true"}, {"members" : tm}]);

});

// Logs

app.get('/logs/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    if (bot.channels.get(id) != null) {
      res.sendFile('/home/Slashy/logs/' + id + ".txt");
    } else {
      returnData(res, "");
    }
});

// Punishments

app.get('/punishments/all/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    sql.all(`SELECT * FROM punishments`).then(row => {
      returnData(res, row);
    });
});

app.get('/punishments/type/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM punishments WHERE type = "${id}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/punishments/guild/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM punishments WHERE guildid = "${id}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/punishments/guild/name/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    var guild = bot.guilds.get(id);
    sql.all(`SELECT * FROM punishments WHERE guildid = "${guild.id}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/punishments/guild/:id/:type/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    var type = req.params.type;
    sql.all(`SELECT * FROM punishments WHERE guildid = "${id}" AND type="${type}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/punishments/staff/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM punishments WHERE op = "${id}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/punishments/staff/:id/:type/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    var type = req.params.type;
    sql.all(`SELECT * FROM punishments WHERE op = "${id}" AND type = "${type}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/punishments/user/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM punishments WHERE userid = "${id}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/punishments/user/:id/:type/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    var type = req.params.type;
    sql.all(`SELECT * FROM punishments WHERE userid = "${id}" AND type = "${type}"`).then(row => {
      returnData(res, row);
    });
});

app.get('/punishments/id/:id/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var id = req.params.id;
    sql.all(`SELECT * FROM punishments WHERE punishid = "${id}"`).then(row => {
      returnData(res, row);
    });
});

// Channels

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/send/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var channel = req.body.channel;
    var msg = req.body.msg;

    if (channel == null || msg == null) {
      res.json([{"success" : "false"}, {"error" : "Invalid Params"}]);
      return true;
    }
    if (bot.channels.get(channel) == null) {
      res.json([{"success" : "false"}, {"error" : "Invalid Channel"}]);
    } else {
      bot.channels.get(channel).send(msg).then(() => {
        res.json([{"success" : "true"}]);
      }).catch(err => {
        res.json([{"success" : "false"}, {"error" : "Invalid Channel"}]);
      });
    }
});

app.post('/verification/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var channel = req.body.channel;
    console.log(channel);
    var msg = "Your account has been linked to a slashy panel account. Please contact management if this was not you."

    if (channel == null) {
      res.json([{"success" : "false"}, {"error" : "Invalid Params"}]);
      return true;
    }
    helpers.sendSuccessEmbed(bot.users.get(channel), msg).then(() => {
      res.json([{"success" : "true"}]);
    }).catch(err => {
      res.json([{"success" : "false"}, {"error" : "Invalid Channel"}]);
    });
});

app.post('/login/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var channel = req.body.id;
    console.log(channel);
    var msg = "Logging in to the panel?"

    if (channel == null) {
      res.json([{"success" : "false"}, {"error" : "Invalid Params"}]);
      return true;
    }
    helpers.sendEmbed(bot.users.get(channel), 'Panel Notification', [
      {
        name: "Logging into the panel?",
        value: "Please react with the check mark to verify your login or the x to cancel the login"
      }
    ]).then(message => {
      message.react('✅').then(() => {
        message.react('❌').then(() => {
          helpers.sql.run(`INSERT INTO logins (discordid, messageid) VALUES (?, ?)`, [channel, message.id]);
        })
      });
    });
});

app.post('/linkNewDiscord/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var channel = req.body.id;
    console.log(channel);
    var msg = "Linking discord to panel?"

    if (channel == null) {
      res.json([{"success" : "false"}, {"error" : "Invalid Params"}]);
      return true;
    }
    helpers.sendEmbed(bot.users.get(channel), 'Panel Notification', [
      {
        name: "Linking discord to panel?",
        value: "Please react with the check mark to verify your link or the x to cancel the link"
      }
    ]).then(message => {
      message.react('✅').then(() => {
        message.react('❌').then(() => {
          helpers.sql.run(`INSERT INTO logins (discordid, messageid) VALUES (?, ?)`, [channel, message.id]);
        })
      });
    });
});

app.post('/ban/:api', function(req, res){
    if (req.params.api != api) {
      res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
      return true;
    }
    var user = req.body.user;
    var reason = req.body.reason;
    var guild = req.body.guild

    if (user == null || reason == null || guild == null) {
      res.json([{"success" : "false"}, {"error" : "Invalid Params"}]);
      return true;
    }
    let banGuild = bot.guilds.get(guild);
    let banMember = bot.guilds.get(guild).members.get(user);
    if(!banMember) {
      res.json([{"success" : "false"}, {"error" : "Invalid Member"}]);
    }
    if(!banMember.bannable) {
      res.json([{"success" : "false"}, {"error" : "Invalid Member (No permission to ban)"}]);
    }
    let banReason = reason;
    if(!banReason) {
      banReason = "Breaking Slashy Inc. Rules";
    }
    banMember.ban(banReason).then(() => {
      var num = Math.floor(Math.random() * 90000) + 10000;
      helpers.sql.run(`INSERT INTO punishments (userid, username, type, op, timestamp, reason, guildid, active, punishid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [banMember.id, banMember.user.username, "ban", "PANEL", helpers.getTime(), banReason, guild, "1", num]).then(row => {
        var punishmentss = banGuild.channels.find("name", `punishments`);
        helpers.sendEmbed(punishmentss, "User Banned - Ban #" + num, [
         {
           name: "Member - " + banMember.user.username,
           value: "Reason - " + banReason
         }
        ]);
        res.json([{"success" : "true"}, {"error" : "Banned member."}]);
      });
    }).catch(err => {
      res.json([{"success" : "false"}, {"error" : "Failed to ban member, logged to console."}]);
      includes.errorLog(err);
    });
});

// Errors

app.use(function(req, res, next) {
  console.log('test');
  res.status(404).json([{"success" : "false"}, {"error" : "Invalid API Call"}]);
});

app.use(function(req, res, next) {
  console.log('test');
  res.status(500).json([{"success" : "false"}, {"error" : "An error occured"}]);
});



app.listen(3000);
successLog("Started API on port 3000");

// BOT

var bot = new Discord.Client();

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

bot.on('raw', async event => {
	// `event.t` is the raw event name
	if (!events.hasOwnProperty(event.t)) return;

	const { d: data } = event;
	const user = bot.users.get(data.user_id);
	const channel = bot.channels.get(data.channel_id) || await user.createDM();

	// if the message is already in the cache, don't re-emit the event
	if (channel.messages.has(data.message_id)) return;

	// if you're on the master/v12 branch, use `channel.messages.fetch()`
	const message = await channel.fetchMessage(data.message_id);

	// custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
	// if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	const reaction = message.reactions.get(emojiKey);

	bot.emit(events[event.t], reaction, user);
});

fs.readdir('./events/', (err, files) => {
  if (err) errorLog(err);
  successLog(`Loading a total of ${files.length} events.`);
  files.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    bot.on(eventName, event.bind(null, bot, helpers));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});


var request = require('request');

bot.on("error", (e) => {
  errorLog(e);
  bot.guilds.get('442807156174225419').members.get('212630637365035009').sendMessage(e);
});

bot.on("ready", function() {
    successLog(`Bot Started on ${bot.guilds.size} servers`);
    bot.user.setPresence({ game: { name: "https://slashy.co.uk", status: 'offline' } });
    successLog(`Set status`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  var messagelog = `${message.author.username} (${message.author.id}) at ${message.createdAt}
${message.content}\n`;
  fs.appendFileSync(`logs/${message.channel.id}.txt`, messagelog);

  if (message.channel.type == "dm") {
    helpers.sendErrorEmbed(message.channel, "You can not run commands in PM!");
    return true;
  }
  let prefix = "-";
  if (!message.content.startsWith("-")) return;
  let messageArray = message.content.trim().split(" ");
  let cmd = messageArray[0];
  let args = messageArray;
  let commandfile = commands.get(cmd.slice(prefix.length));
  if(commandfile) {
    fs.readdir("./cmds/", (err, files) => {

      if(err) errorLog(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js");
      if(jsfile.length <= 0){
        errorLog("Couldn't find commands.");
        return;
      }

      let props = commandfile;
      var allowed = true;
      if (props.help.disabled != null) {
        props.help.disabled.forEach((guild) => {
          if (message.author.id != 212630637000365035009) {
            if (guild == message.guild.id) {
              helpers.sendErrorEmbed(message.channel, "This command is disabled for this server.");
              allowed = false;
            }
          }
        });
      }
      if (allowed) {
        message.delete();
        commandfile.run(bot, message, args, helpers);
        logCommand(message, cmd);
      }
    });
  } else {
    logErrorCommand(message, cmd);
  }
});

try {
    bot.login(TOKEN);
} catch(err) {
    errorLog(err);
}
