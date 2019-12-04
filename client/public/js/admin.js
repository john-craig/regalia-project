
function getData() {
    //document.getElementById("data").hidden = true;

    var table = document.getElementById("formData");
    var date = document.getElementById('date').value

    console.log(date)

    fetch('/u/datatable/'+date, {
        method:'POST',
        body: date,
        headers: {'Content-Type': 'application/json, charset=UTF-8'}
    })
    .then((res) => res.json())
    .then(function(data) {
        if(data.length > 0) {
            var posted = [];
            for(var i = 0; i < data.length; i++) {
                var used = false;
                for(var j = 0; j < posted.length; j++) {
                    if(data[i].ID == posted[j]) {
                        used = true;
                    }
                }
                if(!used) {
                var row = table.insertRow(-1);

                var date = row.insertCell(-1);
                var name = row.insertCell(-1);
                var cwid = row.insertCell(-1);
                var email = row.insertCell(-1);
                var weight = row.insertCell(-1);
                var height = row.insertCell(-1);
                var cap = row.insertCell(-1);
                var degree = row.insertCell(-1);
                var college = row.insertCell(-1);
                var city = row.insertCell(-1);
                var state = row.insertCell(-1);

                date.innerText = data[i].Date_Posted.split("T")[0];
                name.innerText = data[i].First_Name + " " + data[i].Last_Name;
                cwid.innerText = data[i].ID;
                email.innerText = data[i].Email;
                weight.innerText = data[i].Weight;
                height.innerText = data[i].Height;
                cap.innerText = data[i].Cap_Size;
                degree.innerText = data[i].Degree_Level;
                college.innerText = data[i].College_Name;
                city.innerText = data[i].College_City;
                state.innerText = data[i].College_State;

                posted.push(data[i].FacultyID);
                }
            }
        }
    })
}

function changeCode() {

    var code = document.getElementById('passcode').value;

    fetch('/u/changeSecret/'+code, {
        method:'POST',
        body: code,
        headers: {'Content-Type': 'application/json, charset=UTF-8'}
    })
    .then((res) => res.json())
    .then(function(data) {
        console.log(data);
    });
}

function deleteUser() {

    var email = document.getElementById('remove').value;

    fetch('/u/revokeUser/'+email, {
        method:'POST',
        body: email,
        headers: {'Content-Type': 'application/json, charset=UTF-8'}
    })
    .then((res) => res.json())
    .then(function(data) {
        console.log(data);
    })
}

function newAdmin() {

    var email = document.getElementById('newAdmin').value;

    fetch('/u/promoteAdmin/'+email, {
        method:'POST',
        body: email,
        headers: {'Content-Type': 'application/json, charset=UTF-8'}
    })
    .then((res) => res.json())
    .then(function(data) {
        console.log(data);
    })
}