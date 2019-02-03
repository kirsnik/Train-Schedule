$(document).ready(function () {
    $('#dtDynamicVerticalScrollExample').DataTable({
    "scrollY": "50vh",
    "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
    });
$(document).ready(function() { 
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyATRPksRidK9teTKIplimrfS9hRJfCIwhQ",
      authDomain: "train-e7b59.firebaseapp.com",
      databaseURL: "https://train-e7b59.firebaseio.com",
      projectId: "train-e7b59",
      storageBucket: "train-e7b59.appspot.com",
      messagingSenderId: "572486441869"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Create event handler for 'Submit' click
    $("#train").on("click", function(event) {

        event.preventDefault();

        // Create object with properties
        var trainName = $("#train").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#arrival").val().trim();
        var frequency = $("#frequency").val().trim();
        var train = {
            name: trainName,
            place: destination,
            first: firstTrainTime,
            freq: frequency
        }
        //pushing all items to this the firebase database
        database.ref().push(train);
        // Clears all of the text-boxes
        $("#train").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");
    });

    database.ref().on("child_added", function(snapshot) {

        var train = snapshot.val();
        var trainFrequency = train.freq;
        //MATTS FIRST TRAIN TIME
        var chosenTrainTime = train.first;
        console.log("This is my chosen time: " + chosenTrainTime);
        //*MATTS PUSHED BACK ONE YEAR */
        var setTrainTime = moment(chosenTrainTime, "hh:mm").subtract(1, "years");
        //*MATTS CURRENT TIME
        var currentTime = moment();
        var compareTimes = currentTime.diff(moment(setTrainTime), "minutes");
        var timeRemainder = compareTimes % trainFrequency;
        var minutesAway = trainFrequency - timeRemainder;
        var nextTrain = moment().add(minutesAway, "minutes");
        var millitaryTime = moment(nextTrain).format("hh:mm");

        var newRow = $("<tr>").append(
            $("<td>").text(train.name),
            $("<td>").text(train.place),
            $("<td>").text(train.freq), 
            $("<td>").text(millitaryTime),
            $("<td>").text(minutesAway)
        );
        $("#displayTable > tbody").append(newRow);
    });
});