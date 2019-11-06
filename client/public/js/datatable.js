function getData() {
    var table = document.getElementById("formData");

    fetch('/api/datatable')
    .then((res) => res.json())
    .then(function(data) {
        if(data.length > 0) {
            for(var i = 0; i < data.length; i++) {
                var row = table.insertRow(-1);

                var name = row.insertCell(-1);
                var cwid = row.insertCell(-1);
                var email = row.insertCell(-1);
                var weight = row.insertCell(-1);
                var height = row.insertCell(-1);
                var college = row.insertCell(-1);
                var city = row.insertCell(-1);
                var state = row.insertCell(-1);

                name.innerText = data[i].name;
                cwid.innerText = data[i].cwid;
                email.innerText = data[i].email;
                weight.innerText = data[i].weight;
                height.innerText = data[i].height;
                college.innerText = data[i].college_name;
                city.innerText = data[i].college_city;
                state.innerText = data[i].college_state;

            }
        }
    })
}