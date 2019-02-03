$(document).ready(function () {
    });
$(document).ready(function() { 

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

    $("#train").on("click", function(event) {
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var arrival = $("#arrival").val().trim();
        var frequency = $("#frequency").val().trim();
        var train = {
            trainName: trainName,
            destination: destination,
            arrival: arrival,
            frequency: frequency
        }
        database.ref().push(train);

        $("#trainName").val("");
        $("#destination").val("");
        $("#arrival").val("");
        $("#frequency").val("");
    });

    database.ref().on("child_added", function(snapshot) {

        var train = snapshot.val();
        var trainFrequency = train.frequency;
        var chosenTrainTime = train.arrival;
        var setTrainTime = moment(chosenTrainTime, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var compareTimes = currentTime.diff(moment(setTrainTime), "minutes");
        var timeRemainder = compareTimes % trainFrequency;
        var minutesAway = trainFrequency - timeRemainder;
        var nextTrain = moment().add(minutesAway, "minutes");
        var millitaryTime = moment(nextTrain).format("hh:mm");

        var newRow = $("<tr>").append(
            $("<td>").text(train.trainName),
            $("<td>").text(train.destination),
            $("<td>").text(train.arrival), 
            $("<td>").text(millitaryTime),
            $("<td>").text(minutesAway)
        );
        $("#displayTable > tbody").append(newRow);
    });

    $('#dtDynamicVerticalScrollExample').DataTable({
    "scrollY": "50vh",
    "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
});