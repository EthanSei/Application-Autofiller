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
    }
});