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
        console.log("WELCOME, Manager!");
        console.log("\n //==================================================================\\ \n");
        questions();
    });
});

function questions() {
    inquirer.prompt([
        {
            type: 'list',
            name: "tasks",
            message: "Would you like to manage?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            // validate: function (value) {
            //     if (isNaN(value) === false) {
            //         return true;
            //     }
            //     return false;
            // }
        }
    ]).then(function (answer) {

        var managerTask = answer.tasks;
        switch (managerTask) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                newProduct();
                break;
        }

    });
};

function viewProducts() {
    connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log("VIEW EXISTING INVENTORY!");
        console.log("\n //==================================================================\\ \n");
        console.log("FOR YOUR REVIEW:");
        console.log(result);
        console.log("\n //=================================================================//");
        process.exit()
    });
   
};

function lowInventory() {
    connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function (err, response) {
        if (err) throw err;
        if (response[0].stock_quantity <= 100) {

            console.log("LOW INVENTORY ITEMS!");
            console.log("\n //==================================================================\\ \n");
            console.log("FOR YOUR REVIEW:");
            console.log(response);
            console.log("\n //=================================================================//");
        }
    });
    process.exit()
};
function addInventory() {
    connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function (err, result, fields) {
        if (err) throw err;
        choicesArr = [];
        function choicesArrMaker() {
            for (let i = 0; i < result.length; i++) {
                choicesArr.push = (result[i].product_name);
            };

        }
        inquirer.prompt([
            {
                type: 'list',
                name: 'addChoice',
                message: "Which Product would you like to add inventory to? (Select product Name)",
                choices: choicesArr
            },
            {
                name: 'numbers',
                message: "How many would you like to add?",
                choices: [0, 100, 200, 500, 1000, 10000],
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;

                }
            }
        ]).then(function (choice) {
            let productChoice = choice.addChoice;
            let productNumber = choice.numbers;
            // updates database based on product_name and quantity choosen
            connection.query('UPDATE products SET stock_quantity = stock_quantity + ' + productNumber + ' WHERE product_name = ' + productChoice);
            process.exit();
        })
    });
};

function newProduct() {
    inquirer.prompt([
        {
            name: "newProductName",
            message: "What new item would you like to add to Inventory? (product_name)",
        },
        {
            name: "departmentName",
            message: "What department does this item belong to? (department_name)"
        },
        {
            name: "price",
            message: "How much does this product cost?"
        },
        {
            name: "quantitiy",
            message: "How many of this item are you putting into inventory, my guy?"
        }
    ]).then(function (newItems) {
        let newName = newItems.newProductName;
        let newDept = newItems.departmentName;
        let newPrice = newItems.price;
        let newQuantity = newItems.quantity;
        let sqlUpdate = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES(' " + newName + "  ', ' " + newDept + " ' , ' " + newPrice + " ', ' " + newQuantity + "  ' )"
        connection.query(sqlUpdate, function (err, result) {
            if (err) throw err;
            console.log(newName + "added to record");
            process.exit()
        });

    });
    
};