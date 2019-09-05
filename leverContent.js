console.log("Loaded Content Script");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received");
    if (request.message = "data_sent") {
        var fields = request.fields;
        var inputs = document.getElementsByTagName("INPUT");

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].name == "name") inputs[i].value = fields.firstName + " " + fields.lastName;
            else if (inputs[i].name == "email") inputs[i].value = fields.email;
            else if (inputs[i].name == "phone") inputs[i].value = fields.phone;
            else if (inputs[i].name == "urls[LinkedIn]") inputs[i].value = fields.linkedin;
        }
        
        var selects = document.getElementsByTagName("SELECT");

        for (var i = 0; i < selects.length; i++) {
            if (selects[i].name == "eeo[gender]") selects[i].value = fields.gender;
            else if (selects[i].name == "eeo[race]") {
                var options = selects[i].getElementsByTagName("OPTION");
                var race = fields.race;
                for (var j = 0; j < options.length; j++) {
                    if (options[j].innerText.toLowerCase().includes(fields.race.toLowerCase())) {
                        race = options[j].innerText;
                        break;
                    }
                }
                selects[i].value = race;
            }
        }
    }
});