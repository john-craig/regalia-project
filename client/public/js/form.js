var err = document.getElementById('userError');

function validateForm() {

  var invalid = false;

  var errors = [];

  var alpha = new RegExp("[a-zA-Z]");
  var num = new RegExp("[0-9]");
  var lbs = new RegExp("[\x00]");

  var capsize = document.getElementById("cap").value;
  var weight = document.getElementById("weight").value;
  var heightFeet = document.getElementById("heightFeet").value;
  var heightInches = document.getElementById("heightInches").value;
  var college = document.getElementById("college").value.trim();
  var city = document.getElementById("city").value.trim();
  var state = document.getElementById("state").value.trim();


  if(!num.test(weight) && weight != "") {
    invalid = true;
    errors.push("Invalid field: Weight");
    
  }

  if(!alpha.test(college)) {
    invalid = true;
    errors.push("Invalid field: College Name");
    
  }

  if(!alpha.test(city)) {
    invalid = true;
    errors.push("Invalid field: College City");
   
  }

  if(!alpha.test(state)) {
    invalid = true;
    errors.push("Invalid field: College State");
  
  }
  
   

  

    if(capsize == "-" && weight == "" && heightFeet == "-" && heightInches == "-") {
      errors.push("Please either enter a cap size or a height and weight.");
      invalid = true;
    }
  
    if(weight == "" && heightFeet == "-" && heightInches == "-" && capsize != "-") {
      if(confirm("No selection made for height and weight (only ordering cap). Is this correct? (This choice can be updated.)")) {
        //Do nothing...submit form normally
        //return true;
      } else {
        invalid = true;
      }
    } 
    
    if(weight != "" && heightFeet != "-" && heightInches != "-" && capsize == "-") {
      if(confirm("No selection for cap size (only ordering gown). Is this correct? (This choice can be updated.)")) {
        //Do nothing...submit form normally
        //return true;
      } else {
        invalid = true;
      }
    }

    if (weight == "" && heightFeet != "-" && heightInches != "-") {
      errors.push("Please enter your weight.");
      invalid = true;
    } 
    if (weight != "" && heightFeet == "-" && heightInches == "-") {
      errors.push("Please enter a valid height.");
      invalid = true;
    } 

    if(heightFeet == "-" && heightInches != "-") {
      errors.push("Please enter a valid height.");
      invalid = true;
    }

    if(heightFeet != "-" && heightInches == "-") {
      errors.push("Please enter a valid height.");
      invalid = true;
    }
    
  console.log(invalid);
  if(invalid) {
      err.innerText = "The following errors have been found: \n";
      err.style.visibility = "visible";
      for(var i = 0; i < errors.length; i++) {
          err.innerText += errors[i]+"\n";
      }
      event.preventDefault();
      return false;
  }

}

function unRed(box) {
  document.getElementById(box).classList.remove('redbox');
}