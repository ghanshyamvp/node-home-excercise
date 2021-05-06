# node-home-excercise

hello! i'm ghanshyam parakhiya and i have made the documentation of home excercise apis as below.

# yarn is used as package manager in this project,run below command to start dev server of this project

make sure mysql(xampp or wamp or mysql driver) is running in your local machine 
create database named "home_excercise" in mysql

yarn intall
yarn run migrate
yarn run dev
and server start listening on port 4000


# v10.16.3 node version used in this project

# i have use typeORM with mysql database.

as this a excercise project i have used auto-sync entity rather than migration.

# express-validators is been used for validate form data

# below apis is been created in this project

get all product
get single product
get most viewed product
add product
delete product

pass currency=GBP in query parameters to get price in GBP currency
pass limit=10 in query parameters to get custom records of mostviewed product

postman api collection link -https://www.getpostman.com/collections/412c8793d1a3a987aac3
