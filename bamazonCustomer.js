var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "yamaha1600",
database: "bamazon"
});

connection.connect(function(err) {
if(err)throw err;
console.log("connected to port 3306")
// start();
});

function start(){
connection.query("SELECT * FROM bamazon", function(err, results){
if(err) throw err;

inquirer
    prompt([
        {

    }
]).then(function(answer){


});

});
}