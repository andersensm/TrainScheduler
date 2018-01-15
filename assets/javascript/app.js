// Initialize Firebase
var config = {
  apiKey: "AIzaSyC1IoAZUFW4j0J6c8WIV_n5ZrTRsGhPHR4",
  authDomain: "train-hw-5556c.firebaseapp.com",
  databaseURL: "https://train-hw-5556c.firebaseio.com",
  projectId: "train-hw-5556c",
  storageBucket: "",
  messagingSenderId: "4373189865"
};
firebase.initializeApp(config);
//Store in variable database
var database = firebase.database()
//Function to clear Form
function clearForm() {
  $("#trainName, #destination, #arrivalTime, #frequency").val("")
}
///Get data from firebase
function getData() {
  database.ref().on("child_added", function(snapshot) {
    var childSnapShot = snapshot.val()
    //Make the tbody, tr, td to be populated with the values gathered from the child_added
    var tBody = $("tBody")
    var tRow = $("<tr class='table-secondary'>")
    var tName = $("<th scope='row'>").text(childSnapShot.name)
    var tDestination = $("<td>").text(childSnapShot.destination)
    var tFirstTrain = $("<td>").text(childSnapShot.firstTrain)
    var tArrivalTime = $("<td>").text(childSnapShot.arrivalTime)
    var tFrequency = $("<td>").text(childSnapShot.frequency)
    var tMinsAway = $("<td>").text(childSnapShot.minsAway)
    tRow.append(tName,tDestination,tFirstTrain,tArrivalTime,tFrequency,tMinsAway)
    tBody.append(tRow)
  })
}
//Form on click submit
$("#submit").on("click", function(event) {
  //Prevent HTML page reset
  event.preventDefault()
  //Call function to gather form values
  var name = $("#trainName").val().trim()
  var destination = $("#destination").val().trim()
  var firstTrainJson = moment((JSON.stringify($("#firstTrain").val().trim())), "HH:mm").format("hh:mm a")
  var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm")
  var frequency = $("#frequency").val().trim()
  //Log Form values
  console.log("form values: ", name, destination, firstTrain, frequency)
 //Minute Difference between Current Time and first train
  var diffTime = moment().diff(moment(firstTrain), "minutes")
  console.log("diffTime", diffTime)
  //Calculates remainder between difference and frequency of arrivals
  var tRemainder = diffTime % frequency
  console.log("tRemainder", tRemainder)
  //Calculates time until next Train arrival
  var minutesToArrival = frequency - tRemainder
  console.log("minutesToArrival", minutesToArrival)
  //Adds the minutes to next arrival calulation to the "next arrival" object
  var nextTrain = moment().add(minutesToArrival, "minutes")
  console.log("nextTrain: ", nextTrain)
  //Turns "next arrival" object to display out of HH:mm into standard time with AM/PM
  var nextTrainFormat = moment(nextTrain).format("hh:mm a")
  console.log("nextTrainFormat: ", nextTrainFormat)
  //Set firebase
  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrainJson,
    arrivalTime: nextTrainFormat,
    frequency: frequency,
    minsAway: minutesToArrival
  })
  //Post data from submitted form to HTML table
  getData(clearForm());
})
