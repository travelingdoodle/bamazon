DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("doodles", "pets", 2000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fish", "pets", 5, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("batteries", "electronics", 50, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("statues", "lawn art", 20000, 15000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("flamingoz", "lawn art", 75, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee", "food", 9, 100000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("noodles", "food", 5, 20000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("moustaches", "stylez", 1000000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cars", "automobile", 50000, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("handkerchiefs", "tools", 5, 170000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cocaine", "is a hellova drug", 30000, 100);

SELECT * FROM products;
