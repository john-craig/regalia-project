DROP DATABASE if exists regalia;
CREATE DATABASE regalia;
USE regalia;

CREATE TABLE orders (
    Date_Posted date NOT NULL,
    ID int NOT NULL,
    Height text,
    Weight text,
    Cap_Size text,
    Degree_Level text NOT NULL,
    College_Name text NOT NULL,
    College_City text NOT NULL,
    College_State text NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE users (
    Email varchar(50) NOT NULL,    
    First_Name text,
    Last_Name text,
    ID int NOT NULL,
    Hashed_Pass text,
    PRIMARY KEY (Email),
    FOREIGN KEY (ID) REFERENCES orders(ID)	
);

CREATE TABLE admins (
    AdminID int NOT NULL,
    Email text,
    PRIMARY KEY (AdminID)
);




