var config = {
                apiKey: "AIzaSyArrGn21NYI82Whj4igrW_8u0NGekgBfE4",
                authDomain: "train-scheduler-6.firebaseapp.com",
                databaseURL: "https://train-scheduler-6.firebaseio.com",
                projectId: "train-scheduler-6",
                storageBucket: "train-scheduler-6.appspot.com",
                messagingSenderId: "361420812020"
            };
            firebase.initializeApp(config);

            var database = firebase.database();

            // Button click event
            $("#submitButton").on("click", function (event) {
                event.preventDefault();

                // Initial Values
                var trainName = $("#trainName").val().trim();
                console.log("Train Name: " + trainName);
                var destination = $("#destination").val().trim();
                console.log("Destination: " + destination);
                var firstTrain = $("#firstTrain").val().trim();
                console.log("Start Date: " + firstTrain);
                var frequency = $("#frequency").val().trim();
                console.log("Frequency: " + frequency);

                // Code for "Setting values in the database"
                database.ref().push({
                    trainName: trainName,
                    destination: destination,
                    firstTrain: firstTrain,
                    frequency: frequency,
                });
            });

            database.ref().on("child_added", function (childSnapshot) {
                var name = childSnapshot.val().trainName;
                var destination = childSnapshot.val().destination;
                var frequency = childSnapshot.val().frequency;

                function decrementmin() {
                    location.reload();
                };

                var frequency = parseInt(frequency);
                var currentTime = moment();
                var enteredTime = moment(childSnapshot.val().time, 'HH:mm');
                var trainTime = moment(enteredTime).format('HH:mm');

                $('#currentTime').text(currentTime);
                $('table').append(
                    "<tr><td>" + childSnapshot.val().trainName +
                    "</td><td>" + childSnapshot.val().destination +
                    "</td><td>" + childSnapshot.val().frequency +
                    "</td><td>" + moment(nextTrain).format("HH:mm a") +
                    "</td><td>" + minutesAway + "</td></tr>");
            });