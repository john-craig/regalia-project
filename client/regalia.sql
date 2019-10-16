

CREATE DATABASE `regalia`; 

CREATE TABLE `caps` (
  `CapID` int(11) DEFAULT NULL,
  `Cap_Size` text
);
CREATE TABLE `colleges` (
  `CollegeID` int(11) DEFAULT NULL,
  `Name` text,
  `City` text,
  `State` text
);
CREATE TABLE `faculty` (
  `FacultyID` int(11) DEFAULT NULL,
  `First_Name` text,
  `Last_Name` text,
  `Email` text
);
CREATE TABLE `gowns` (
  `GownID` int(11) DEFAULT NULL,
  `Height` text,
  `Weight` text
);
CREATE TABLE `orders` (
  `Date_Ordered` date DEFAULT NULL,
  `FacultyID` int(11) DEFAULT NULL,
  `RegaliaID` int(11) DEFAULT NULL
);
CREATE TABLE `regalia` (
  `RegaliaID` int(11) DEFAULT NULL,
  `GownID` int(11) DEFAULT NULL,
  `CapID` int(11) DEFAULT NULL,
  `CollegeID` int(11) DEFAULT NULL
);
