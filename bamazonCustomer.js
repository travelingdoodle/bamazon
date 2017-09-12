// be sure to npm install the following
var inquirer = require('inquirer');
var mysql = require('mysql');

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
            message: "Would you like to sell your soul? What item (by ID) would you like?",
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

        //    var idGiven = answers.id;  //I have the ID of the product 
        //      
        //    var price = "SELECT * FROM products WHERE ?";
        //      
        //    if (answers.quantity <= quantitee){
        //        connection.query("UPDATE products SET stock_quantity = '" + answers.quantity + "' WHERE id=5");
        //        //Update MySQL
        //        //fufill customers request 
        //        //show total cost of their purchase
        //        console.log("Your Total Price is: " + price. * answers.quantity);  //price * quantity
        //    }else{
        //        
        //        //Insufficient Quantity
        //        console.log("Not Enough Cash, Stranger!");
        //    }
        //    console.log("Resident Evil 4");
    });
}

function purchase(id, quantityInput) {

    connection.query('SELECT * FROM products WHERE id = ' + id, function (error, response) {
        if (error) { console.log(error) };

        if (quantityInput <= response[0].stock_quantity) {

            var totalCost = response[0].price * quantityInput;

            console.log("\nWe trap hard, hold up. Lemme cop that for ya");
            console.log("If you want " + quantityInput + " " + response[0].product_name + " then you gotz tew pay $" + totalCost + ". Now, Get lost, my guy! \n");

            connection.query('UPDATE Products SET stock_quantity = stock_quantity - ' + quantityInput + ' WHERE id = ' + id);

            process.exit()
        } else {
            console.log("We ain't got enough 'o dem " + response[0].product_name + " , My Guy!! \n ");
            process.exit()
        };

    });

};