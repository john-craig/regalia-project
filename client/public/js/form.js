//var api = require('server/js/api.js');

var cwid = 0;
var firstN = "";
var lastN = "";
var email = "";
var cap = "";
var height = "";
var weight = "";
var degree = "";
var college = "";
var city = "";
var state = "";

function submitForm() {

  /*
  cwid = document.getElementById("cwid").innerText;
  firstN, lastN = document.getElementById("name").innerText.toUpperCase().split(" ");
  email = document.getElementById("email").innerText;
  //cap = document.getElementById("cap").innerText;
  height = document.getElementById("height").innerText;
  weight = document.getElementById("weight").innerText;
  //degree = document.getElementById("degree").innerText;
  college = document.getElementById("college").innerText;
  city = document.getElementById("city").innerText;
  state = document.getElementById("state").innerText;
  
  var data = {
    "CWID": cwid,
    "FirstName": firstN,
    "LastName": lastN,
    "Email": email,
    //"Cap": cap,
    "Height": height,
    "Weight": weight,
    //"Degree": degree,
    "College": college,
    "City": city,
    "State": state
  }
  */

  fetch('/submit', {
    method: 'post',
    headers: {'Content-Type': 'application/json, charset=UTF-8'}
  })
  
  //console.log(data);
  //window.location = 'thanks';

  //api.submit(['testy boy', 'the dude', 'mad lad mcgee', 'shannon'])
}

