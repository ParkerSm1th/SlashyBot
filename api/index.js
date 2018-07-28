const sql = require("sqlite");
sql.open("../slashy.sqlite");

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

app.listen(3000);

console.log("Go");
