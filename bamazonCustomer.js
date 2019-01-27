var inquirer = require("inquirer");
var mysql = require("mysql");
var p;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yamaha1600",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected to port 3306")
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);

                        }
                        return choiceArray;
                    },
                    message: "Select the item you would like to purchase!"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many of these items would you like to purchase?"
                }

            ]).then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                // determine if inventory is enough
                if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
                    // if inventory was enough, update db, let the user know
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenItem.stock_quantity - answer.quantity
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log('\n' + "Your purchase for the " + chosenItem.product_name + " was successfull! Your cost is $" + chosenItem.price + '\n');
                            connection.end();
                        }
                    );
                }
                else {
                    // Inventory not enough, so enter another quantity
                    console.log('\n'+ "Not enough items in stock! Try again..." +'\n');
                    start();
                }
            });

    });


}
// Run this funtion to enter new Items into the Database......
function enterProductsToDatabase() {
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES ?";
    var values = [
      ['D191', 'Dog Collar', 'Pets', '9.00', '10'],
      ['D192', 'Dog Leash', 'Pets', '12.00', '15'],
      ['F193', 'Chair', 'Furniture', '150.00', '4'],
      ['F194', 'Table', 'Furniture', '1400.00', '1'],
      ['K195', 'Set of Glassses', 'Houseware', '11.00', '17'],
      ['K196', 'Towels', 'Houseware', '19.00', '4'],
      ['E197', 'TV', 'Electronics', '129.00', '6'],
      ['E198', 'Computer', 'Electronics', '365.00', '7'],
      ['A199', 'Ice Scraper', 'Auto', '9.99', '9'],
      ['A200', 'Windshield Wipers', 'Auto', '19.50', '12'],
      ['A201', 'Oil Filter', 'Auto', '8.50', '16'],
      ['A202', 'Car Matts', 'Auto', '30.00', '10'],
      ['C203', 'Mens T-Shirts', 'Clothing', '9.50', '7'],
      ['C204', 'Mens Socks', 'Clothing', '6.50', '6']
    ];
    connection.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
}








 