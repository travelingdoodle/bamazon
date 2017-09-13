// be sure to npm install the following
var inquirer = require('inquirer');
var mysql = require('mysql');

//connects to sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password", //Your Password for MySQL Workbench
    database: "bamazon" //Your MySQL Database Name
});

connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log("WELCOME, WE SELL THINGS && STUFF FOR YOU TO PURCHASE!");
        console.log("\n //==================================================================\\ \n");
        console.log("FOR YOUR REVIEW:");
        console.log(result);
        console.log("\n \\=================================================================//");
        questions();
    });
});

function questions() {
    inquirer.prompt([
        {
            name: "id",
            message: "Would you like to buy some things or stuff? What item (by ID) would you like?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },

        {
            name: "quantity",
            message: "How many of that thing would you like to possess?"
            //          "UPDATE products SET ? WHERE ?"
        }
    ]).then(function (answers) {

        var quantityInput = answers.quantity;
        var idInput = answers.id;
        purchase(idInput, quantityInput);
    });
}

function purchase(id, quantityInput) {

    connection.query('SELECT * FROM products WHERE id = ' + id, function (error, response) {
        if (error) { console.log(error) };

        if (quantityInput <= response[0].stock_quantity) {

            let totalCost = response[0].price * quantityInput;

            console.log("\nWe trap hard, hold up. Lemme cop that for ya");
            console.log("If you want " + quantityInput + " " + response[0].product_name + " then you gotz tew pay $" + totalCost + ". Now, Get lost, my guy! \n");

            var newInventory = response[0].stock_quantity - parseInt(quantityInput);
            var sql = "UPDATE products SET stock_quantity = '" + newInventory + "' WHERE id = '" + id + "'";
            console.log(sql);
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
                process.exit()
            });
        } else {
            console.log("We ain't got enough 'o dem " + response[0].product_name + " , My Guy!! \n ");
            process.exit()
        };
    });
};