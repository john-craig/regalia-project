
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
                    if(data[i].FacultyID == posted[j]) {
                        used = true;
                    }
                }
                if(!used) {
                var row = table.insertRow(-1);

                var name = row.insertCell(-1);
                var cwid = row.insertCell(-1);
                var email = row.insertCell(-1);
                var weight = row.insertCell(-1);
                var height = row.insertCell(-1);
                var college = row.insertCell(-1);
                var city = row.insertCell(-1);
                var state = row.insertCell(-1);

                name.innerText = data[i].First_Name + " " + data[i].Last_Name;
                cwid.innerText = data[i].FacultyID;
                email.innerText = data[i].Email;
                weight.innerText = data[i].Weight;
                height.innerText = data[i].Height;
                college.innerText = data[i].College_Name;
                city.innerText = data[i].College_City;
                state.innerText = data[i].College_State;

                posted.push(data[i].FacultyID);
                }
            }
        }
    })
}