console.log("Loaded Content Script");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received");
    if (request.message = "data_sent") {
        var fields = request.fields;

        var mainFields = document.getElementById("main_fields");

        if (mainFields != null) {
            var inputs = mainFields.getElementsByTagName("INPUT");

            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].id == "first_name") inputs[i].value = fields.firstName;
                else if (inputs[i].id == "last_name") inputs[i].value = fields.lastName;
                else if (inputs[i].id == "email") inputs[i].value = fields.email;
                else if (inputs[i].id == "phone") inputs[i].value = fields.phone;
                else if (inputs[i].id == "job_application_location") inputs[i].value = fields.location;
            }
        }

    }
});