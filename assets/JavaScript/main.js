// Initialize Firebase
var config = {
    apiKey: "AIzaSyDkc3AOI1D6S8-HmG_EWULsW-OLnfMZfNA",
    authDomain: "trainschedule-fe5ea.firebaseapp.com",
    databaseURL: "https://trainschedule-fe5ea.firebaseio.com",
    projectId: "trainschedule-fe5ea",
    storageBucket: "trainschedule-fe5ea.appspot.com",
    messagingSenderId: "678416463731"
};
firebase.initializeApp(config);

// create global database var for easier coding
var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grab user input and format the train start in moment js proper format (returned as string)
    var trainName = $("#employee-name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainRate = $("#rate-input").val().trim();

    // Create local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: dest,
        start: trainStart,
        rate: trainRate
    };

    // Upload employee data to the database
    database.ref().push(newTrain);

    // Log user input everything to console
    console.log(trainName.name);
    console.log(dest.destination);
    console.log(trainStart.start);
    console.log(trainRate.rate);

    // alert("Train successfully added");

    // Clear all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});

// Create Firebase event for adding trains to the database and a row in the html table when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;

    // Employee Info
    console.log(trainName);
    console.log(dest);
    console.log(trainStart);
    console.log(trainRate);



    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(trainRate),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});