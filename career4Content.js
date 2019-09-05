console.log("Loaded Content Script");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received");
    if (request.message = "data_sent") {
        var fields = request.fields;

        var formFields = document.getElementsByClassName("RCMFormField");

        if (formFields != null) {
            for (var i = 0; i < formFields.length; i++) {
                var formatted = formFields[i].innerText.toLowerCase();
                if (formatted.includes("first name")) formFields[i].getElementsByTagName("INPUT")[0].value = fields.firstName;
                else if (formatted.includes("last name")) formFields[i].getElementsByTagName("INPUT")[0].value = fields.lastName;
                else if (formatted.includes("primary phone")) formFields[i].getElementsByTagName("INPUT")[0].value = fields.phone;
                else if (formatted.includes("state")) {
                    var select = formFields[i].getElementsByTagName("SELECT");
                    if (select == null) continue;
                    select = select[0];
                    if (select == null) continue;
                    var options = formFields[i].getElementsByTagName("OPTION");
                    var state = fields.state.toLowerCase();
                    console.log("STATE: " + state);
                    console.log("SELECT: " + select);
                    for (var j = 0; j < options.length; j++) {
                        if (options[j].innerText.toLowerCase().includes(state)) {
                            console.log("SETTING STATE: " + options[j].value);
                            state = options[j].value;
                            break;
                        }
                    }
                    select.value = state;
                }
                else if (formatted.includes("street address")) formFields[i].getElementsByTagName("INPUT")[0].value = fields.address;
                else if (formatted.includes("city")) formFields[i].getElementsByTagName("INPUT")[0].value = fields.city;
                else if (formatted.includes("postal code")) formFields[i].getElementsByTagName("INPUT")[0].value = fields.zip;
            }
        }
    }
});