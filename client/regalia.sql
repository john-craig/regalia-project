DROP DATABASE if exists regalia;
CREATE DATABASE regalia;
USE regalia;

CREATE TABLE orders (
    Date_Posted date NOT NULL,
    FacultyID int NOT NULL,
    RegaliaID int NOT NULL,
    PRIMARY KEY (Date_Posted),
    PRIMARY KEY (FacultyID),
    PRIMARY KEY (RegaliaID),
    FOREIGN KEY (FacultyID) REFERENCES faculty (FacultyID),
    FOREIGN KEY (RegaliaID) REFERENCES regalia (RegaliaID)
);

CREATE TABLE faculty (
    FacultyID int NOT NULL,
    First_Name text DEFAULT '',
    Last_Name text DEFAULT '',
    Email text DEFAULT ''
    PRIMARY KEY (FacultyID)
);

CREATE TABLE regalia (
    RegaliaID int NOT NULL,
    GownID int DEFAULT -1,
    CapID int DEFAULT -1,
    CollegeID int DEFAULT -1
    PRIMARY KEY (RegaliaID),
    FOREIGN KEY (GownID) REFERENCES gowns (GownID),
    FOREIGN KEY (CapID) REFERENCES caps (CapID),
    FOREIGN KEY (CollegeID) REFERENCES colleges (CollegeID)
);

CREATE TABLE gowns (
    GownID int NOT NULL,
    Height text DEFAULT '',
    Weight text DEFAULT '',
    PRIMARY KEY (GownID)
);

CREATE TABLE caps (
    CapID int NOT NULL,
    Cap_Size text DEFAULT '',
    PRIMARY KEY (CapID)
);

CREATE TABLE colleges (
    CollegeID int NOT NULL,
    College_Name text DEFAULT '',
    College_City text DEFAULT '',
    College_State text DEFAULT ''
);

