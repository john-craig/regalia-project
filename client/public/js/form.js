//var api = require('server/js/api.js');

/*
function submitForm() {
  
  fetch('/submit', {
    method: 'post',
    headers: {'Content-Type': 'application/json, charset=UTF-8'}
  })
  
  //console.log(data);
  //window.location = 'thanks';

  //api.submit(['testy boy', 'the dude', 'mad lad mcgee', 'shannon'])
}


*/

function verifyForm() {

  var verified = true;

  var data = [];

  var fname = document.getElementById("fname").innerText;
  var lname = document.getElementById("lname").innerText;
  var email = document.getElementById("email").innerText;
  var cwid = document.getElementById("cwid").innerText;
  var capsize = document.getElementById("cap").value;
  var weight = document.getElementById("weight").innerText;
  var heightFeet = document.getElementById("heightFeet").value;
  var heightInches = document.getElementById("heightInches").value;
  var degree = document.getElementById("degree").innerText;
  var college = document.getElementById("college").innerText;
  var city = document.getElementById("city").innerText;
  var state = document.getElementById("state").innerText;

  //if(fname == "" || lname == "" || email == "" || cwid == "" || degree == "" || college == "" || city == "" || state == "") {
  //  verified = false;
  //  alert("Please fill out the required fields.")
  //}

  //var email = document.getElementById("email").innerText;
  //if(!email.includes("@marist.edu")) {

  //}

  if(verified) {

    

    fetch('/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json, charset=UTF-8'},
      body: JSON.stringify(data)
    })
  }
}