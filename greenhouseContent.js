console.log("Loaded Content Script");
chrome.storage.local.get("firstName", function(event) {
    console.log("Got: " + event.firstName);
})
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
                else if (inputs[i].id == "job_application_location") inputs[i].value = fields.city + ", " + fields.state;
            }
        }

        var customFields = document.getElementById("custom_fields");
        if (customFields != null) {
            var fieldEntries = customFields.getElementsByClassName("field");

            for (var i = 0; i < fieldEntries.length; i++) {
                if (fieldEntries[i].innerText.toLowerCase().includes("linkedin")) {
                    var inputs = fieldEntries[i].getElementsByTagName("INPUT");
                    for (var j = 0; j < inputs.length; j++) {
                        if (inputs[j].type == "text") {
                            inputs[j].value = fields.linkedin;
                            break;
                        }
                    }
                }
            }
        }

    }
});