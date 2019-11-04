DROP DATABASE if exists regalia;
CREATE DATABASE regalia;
USE regalia;

CREATE TABLE faculty (
    FacultyID int NOT NULL DEFAULT 0,
    First_Name text,
    Last_Name text,
    Email text,
    PRIMARY KEY (FacultyID)
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

CREATE TABLE orders (
    Date_Posted date NOT NULL,
    FacultyID int NOT NULL,
    GownID int DEFAULT 0,
    CapID int DEFAULT 0,
    CollegeID int DEFAULT 0,
    PRIMARY KEY (Date_Posted, FacultyID),
    FOREIGN KEY (GownID) REFERENCES gowns (GownID),
    FOREIGN KEY (CapID) REFERENCES caps (CapID),
    FOREIGN KEY (CollegeID) REFERENCES colleges (CollegeID)
);

CREATE TABLE admin (
    AdminID int DEFAULT 0,
    Email text,
    PRIMARY KEY (AdminID)
)

INSERT INTO gowns
VALUES (0, 'N/A', 'N/A');

INSERT INTO caps
VALUES (0, 'N/A');

INSERT INTO faculty
VALUES ('12345678', 'Brian', 'Gormanly', 'brian.gormanly@marist.edu');



