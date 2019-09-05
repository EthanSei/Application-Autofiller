
document.getElementById("submit").addEventListener("click", function(event) {
    // Save form data
    var fields = {
        firstName : document.getElementById("first_name").value,
        lastName : document.getElementById("last_name").value,
        email : document.getElementById("email").value,
        phone : document.getElementById("phone").value,
        address : document.getElementById("address").value,
        city : document.getElementById("city").value,
        state : document.getElementById("state").value,
        zip : document.getElementById("zip").value,
        linkedin : document.getElementById("linkedin").value,
        website : document.getElementById("website").value,
        gender : document.getElementById("gender").value,
        race : document.getElementById("race").value
    }
    chrome.storage.local.set({"firstName": fields.firstName,
                                "lastName": fields.lastName,
                                "email": fields.email,
                                "phone": fields.phone,
                                "address": fields.address,
                                "city" : fields.city,
                                "state" : fields.state,
                                "zip" : fields.zip,
                                "linkedin": fields.linkedin,
                                "website": fields.website,
                                "gender": fields.gender,
                                "race" : fields.race
                            }, function() { alert("Saving: " + JSON.stringify(fields)); }
    );

    chrome.tabs.query({active : true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        console.log("Sending message: " + JSON.stringify(fields));
        chrome.tabs.sendMessage(activeTab.id, {"message": "data_sent", "fields": fields}, function() {
            console.log("Message sent");
        });
    });
});

var fieldNames = ['firstName','lastName','email','phone','address','city','state','zip','linkedin','website','gender','race'];

chrome.storage.local.get(fieldNames, (fields) => {
    console.log("GETTING FIELDS");
    if (fields['firstName'] != null) {
        // alert("LOADED FIELDS");
        document.getElementById("first_name").value = fields['firstName'];
        document.getElementById("last_name").value = fields['lastName'];
        document.getElementById("email").value = fields['email'];
        document.getElementById("phone").value = fields['phone'];
        document.getElementById("address").value = fields['address'];
        document.getElementById("city").value = fields['city'];
        document.getElementById("state").value = fields['state'];
        document.getElementById("zip").value = fields['zip'];
        document.getElementById("linkedin").value = fields['linkedin'];
        document.getElementById("website").value = fields['website'];
        document.getElementById("gender").value = fields['gender'];
        document.getElementById("race").value = fields['race'];
    }
    else {
        // alert("NULL FIELDS");
        console.log("Couldn't Load Fields");
    }
});



// $(document).ready(function() {
//     console.log("Loaded Jquery!");
//     var fields = ['first_name','last_name','email','phone','location','linkedin','website','gender'];
//     $("#save").on('click', function() {
//         console.log("Clicked!");
//         saveFormData();
//         getFormData(fields, function(items) {
//             if (items != null) {
//                 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//                     var activeTab = tabs[0];
//                     console.log("Sending message..." + JSON.stringify(items));
//                     chrome.tabs.sendMessage(activeTab.id, {"message": "data_sent","items":items});
//                 });
//             }
//             else {
//                 console.log("ERROR: Items returned null");
//             }
//         });
//     });
//     getFormData(fields, function(items) {
//         if (items != null) {
//             $("#first_name").val(items['first_name']);
//             $("#last_name").val(items['last_name']);
//             $("#email").val(items['email']);
//             $("#phone").val(items['phone']);
//             $("#location").val(items['location']);
//             $("#linkedin").val(items['linkedin']);
//             $("#website").val(items['website']);
//             $("#gender").val(items['gender']);

//             console.log("Assigning values: " + $('#first_name').val());
//         }
//         else {
//             console.log("Init values not specified");
//         }
//     });
// });
// function saveFormData() {
//     var $fname = $("#first_name").val();
//     var $lname = $("#last_name").val();
//     var $email = $("#email").val();
//     var $phone = $("#phone").val();
//     var $location = $("#location").val();
//     var $linkedin = $("#linkedin").val();
//     var $website = $("#website").val();
//     var $gender = $("#gender").val();

//     if (!$fname || !$lname) {
//         console.log("ERROR: Data not specified in required fields!");
//         return;
//     }

//     chrome.storage.sync.set({'first_name':$fname, 'last_name':$lname, 'email':$email, 'phone':$phone, 'location':$location, 'linkedin':$linkedin, 'website':$website, 'gender':$gender}, function() {
//         console.log("Settings saved!");
//     });


// }
// function getFormData(key, callback) {
//     chrome.storage.sync.get(key, (items) => {
//         console.log('Returned: ' + items['name']);
//         callback(items);
//     });
// }