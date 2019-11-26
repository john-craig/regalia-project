

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

function validateForm() {

  var invalid = false;

  var errors = [];

  var alpha = new RegExp("[a-zA-Z]");
  var num = new RegExp("[0-9]");
  var lbs = new RegExp("[\x00]");
  var mail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

  var fname = document.getElementById("fname").value.trim();
  var lname = document.getElementById("lname").value.trim();
  var email = document.getElementById("email").value.trim();
  var cwid = document.getElementById("cwid").value.trim();
  var capsize = document.getElementById("cap").value;
  var weight = document.getElementById("weight").value;
  var heightFeet = document.getElementById("heightFeet").value;
  var heightInches = document.getElementById("heightInches").value;
  var degree = document.getElementById("degree").value.trim();
  var college = document.getElementById("college").value.trim();
  var city = document.getElementById("city").value.trim();
  var state = document.getElementById("state").value.trim();

  if(alpha.test(fname) == false) {
    invalid = true;
    errors.push("Invalid field: First Name");
    document.getElementById("fname").classList.add('redbox');
    //document.getElementsByClassName("invalid").style.visible = true;
    //document.getElementsByClassName("invalid").innerText = "Invalid field: First Name";
  }

  if(!alpha.test(lname)) {
    invalid = true;
    errors.push("Invalid field: Last Name");
    document.getElementById("lname").classList.add('redbox');
  }

  if(!mail.test(email) || !email.includes("@marist.edu")) {
    invalid = true;
    errors.push("Invalid field: Email");
    document.getElementById("email").classList.add('redbox');
  }

  if(!num.test(cwid)) {
    invalid = true;
    errors.push("Invalid field: CWID");
    document.getElementById("cwid").classList.add('redbox');
  }

  if(!num.test(weight) && weight != "") {
    invalid = true;
    errors.push("Invalid field: Weight");
    document.getElementById("weight").classList.add('redbox');
  }

  if(!alpha.test(college)) {
    invalid = true;
    errors.push("Invalid field: College Name");
    document.getElementById("college").classList.add('redbox');
  }

  if(!alpha.test(city)) {
    invalid = true;
    errors.push("Invalid field: College City");
    document.getElementById("city").classList.add('redbox');
  }

  if(!alpha.test(state)) {
    invalid = true;
    errors.push("Invalid field: College State");
    document.getElementById("state").classList.add('redbox');
  }
  
  if(invalid) {
    event.preventDefault();
    alert(errors.toString());
    return false;
  } 
  else {

    if(capsize == "-" && weight == "" && heightFeet == "-" && heightInches == "-") {
      alert("Please either enter a cap size or a height and weight.");
      return false;
    }
  
    if(weight == "" && heightFeet == "-" && heightInches == "-" && capsize != "-") {
      if(confirm("No selection made for height and weight (only ordering cap). Is this correct? (This choice can be updated.)")) {
        alert("Valid form.");
      } else {
        return false;
      }
    } 
    
    if(weight != "" && heightFeet != "-" && heightInches != "-" && capsize == "-") {
      if(confirm("No selection for cap size (only ordering gown). Is this correct? (This choice can be updated.)")) {
        alert("Valid form.");
      } else {
        return false;
      }
    }

    if (weight == "" && heightFeet != "-" && heightInches != "-") {
      alert("Please enter your weight.");
      return false;
    } 
    if (weight != "" && heightFeet == "-" && heightInches == "-") {
      alert("Please enter a valid height.");
      return false;
    } 

    if(heightFeet == "-" && heightInches != "-") {
      alert("Please enter a valid height.");
      return false;
    }

    if(heightFeet != "-" && heightInches == "-") {
      alert("Please enter a valid height.");
      return false;
    }
    
  } 


  alert("Valid form.");
 
}

function unRed(box) {
  document.getElementById(box).classList.remove('redbox');
}