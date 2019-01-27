# Amazon-like-store
Amazon-like-app is a command line interface application using Node, inquirer, java script and mySql.

First step was to create a database product table in MySql Workbench to store the Item_id, product_name, department_name, price and stock_quantity.
Second step was to create a java script file and write the code to require mySql and inquirer. Then create a connection to mySql. Then I wrote a function to insert the products in to the mySql database products table.
Third step was to code a start funtion that would list all the products then prompt the user for what product they want to purchace and the quantity.
Fourth step was to take the response answer (product and quantity) and confirm there are enough items in stock to fill the order. If there is not enough items in stock a message will be logged to the console stating 'Not enough items in stock! Try again...'. Otherwise the message would state 'your purchase for the item was successfull and display the price of the item'. Then subtract the quantity sold from the inventory in the database product table.


Click on the link below to watch my video deminstration.

https://drive.google.com/open?id=1mHVLfE1Y5UudnaFFE2tgHqDHiMDiwvgD

