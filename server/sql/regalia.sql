DROP DATABASE if exists regalia;
CREATE DATABASE regalia;
USE regalia;

CREATE TABLE users (
    ID int NOT NULL,
    Email text NOT NULL,    
    First_Name text NOT NULL,
    Last_Name text NOT NULL,
    Hashed_Pass text NOT NULL,
    PRIMARY KEY (ID)	
);

CREATE TABLE orders (
    OrderID int NOT NULL,
    UserID int NOT NULL,
    Date_Posted date NOT NULL,
    Height text,
    Weight text,
    Cap_Size text,
    Degree_Level text NOT NULL,
    College_Name text NOT NULL,
    College_City text NOT NULL,
    College_State text NOT NULL,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (UserID) REFERENCES users(ID)
);

CREATE TABLE admins (
    AdminID int NOT NULL,
    Email text,
    PRIMARY KEY (AdminID)
);

CREATE TABLE secrets (
    Secret_Code text NOT NULL,
    PRIMARY KEY (Secret_Code)
);




