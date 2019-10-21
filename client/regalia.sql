DROP DATABASE if exists regalia;
CREATE DATABASE regalia;
USE regalia;

CREATE TABLE orders (
    Date_Posted date NOT NULL,
    FacultyID int NOT NULL,
    RegaliaID int NOT NULL,
    PRIMARY KEY (Date_Posted, FacultyID, RegaliaID),
    FOREIGN KEY (FacultyID) REFERENCES faculty (FacultyID),
    FOREIGN KEY (RegaliaID) REFERENCES regalia (RegaliaID)
);

CREATE TABLE faculty (
    FacultyID int NOT NULL,
    First_Name text,
    Last_Name text,
    Email text,
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
    Height text,
    Weight text,
    PRIMARY KEY (GownID)
);

CREATE TABLE caps (
    CapID int NOT NULL,
    Cap_Size text,
    PRIMARY KEY (CapID)
);

CREATE TABLE colleges (
    CollegeID int NOT NULL,
    College_Name text,
    College_City text,
    College_State text,
    PRIMARY KEY (CollegeID)
);

