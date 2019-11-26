DROP DATABASE if exists regalia;
CREATE DATABASE regalia;
USE regalia;

CREATE TABLE faculty (
    FacultyID int NOT NULL,
    First_Name text,
    Last_Name text,
    Email text,
    Hashed_Pass text,
    PRIMARY KEY (FacultyID)	
);

CREATE TABLE orders (
    Date_Posted date NOT NULL,
    FacultyID int NOT NULL,
    Height text,
    Weight text,
    Cap_Size text,
    Degree_Level text NOT NULL,
    College_Name text NOT NULL,
    College_City text NOT NULL,
    College_State text NOT NULL,
    PRIMARY KEY (FacultyID),
    FOREIGN KEY (FacultyID) REFERENCES faculty(FacultyID)
);

CREATE TABLE admin (
    AdminID int DEFAULT 0,
    Email text,
    PRIMARY KEY (AdminID)
)




