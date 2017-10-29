// $("#submitButton").on("click", function(event) {
// console.log("this is successful.")
// alert("test")
// event.preventDefault();
// });


var config = {
    apiKey: "AIzaSyArrGn21NYI82Whj4igrW_8u0NGekgBfE4",
    authDomain: "train-scheduler-6.firebaseapp.com",
    databaseURL: "https://train-scheduler-6.firebaseio.com",
    projectId: "train-scheduler-6",
    storageBucket: "train-scheduler-6.appspot.com",
    messagingSenderId: "361420812020"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var role = "";
var startDate = "";
var monthlyRate = "";
var monthsWorked = "";
var totalBilled = "";

// Capture Button Click
$("#submitButton").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    name = $("#employeename").val().trim();
    console.log(name);
    role = $("#role").val().trim();
    console.log(role);
    startDate = $("#startDate").val().trim();
    console.log(startDate);
    monthlyRate = $("#monthlyRate").val().trim();
    console.log(monthlyRate);


    monthsWorked = -(moment(startDate).diff(moment(), "months"));
    console.log("months worked" + monthsWorked);
    totalBilled = (monthsWorked * monthlyRate);
    console.log("total billed: " + totalBilled);

    // Code for "Setting values in the database"
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        monthsWorked: monthsWorked,
        totalBilled: totalBilled
    });

});


database.ref().on("child_added", function (childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);





    // full list of items to the well
    $("#current-trains").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
        " </span><span id='email'> " + childSnapshot.val().role +
        " </span><span id='age'> " + childSnapshot.val().startDate +
        " </span><span id='comment'> " + childSnapshot.val().monthlyRate +
        " </span><span id='comment'> " + childSnapshot.val().monthsWorked + 
        " </span><span id='comment'> " + childSnapshot.val().totalBilled + " </span></div>");


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// // Firebase watcher + initial loader HINT: .on("value")
// database.ref().on("value", function (snapshot) {

//     // Log everything that's coming out of snapshot
//     console.log(snapshot.val());
//     console.log(snapshot.val().name);
//     console.log(snapshot.val().email);
//     console.log(snapshot.val().age);
//     console.log(snapshot.val().comment);

//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);

//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });