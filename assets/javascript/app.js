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
    //make the tbody, tr,td to be populated with the values gathered from the child_added
    var tBody = $("tBody")
    var tRow = $("<tr class='table-secondary'>")
    var tName = $("<th scope='row'>").text(childSnapShot.name)
    var tDestination = $("<td>").text(childSnapShot.destination)
    var tArrivalTime = $("<td>").text(childSnapShot.arrivalTime)
    var tFrequency = $("<td>").text(childSnapShot.frequency)
    var tMinsAway = $("<td>").text(childSnapShot.minsAway)
    tRow.append(tName,tDestination,tArrivalTime,tFrequency,tMinsAway)
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
  var firstTrain = $("#firstTrain").val().trim()
  var frequency = $("#frequency").val().trim()
  //Log Form values
  console.log("form values: ", name, destination, firstTrain, frequency)
  //First Train -1 year
  firstTime = moment(firstTrain, "HH:mm").subtract(1, "years")
 //Minute Difference between Current Time and first train
  var diffTime = moment().diff(moment(firstTime), "minutes")
  console.log("diffTime", diffTime)
  //Calculates remainder between difference and frequency of arrivals
  var tRemainder = diffTime % frequency
  console.log("tRemainder", tRemainder)
  //Calculates how often they travel and the remainder
  var minutesToArrival = frequency - tRemainder
  console.log("minutesToArrival", minutesToArrival)
  //
  var nextTrain = moment().add(minutesToArrival, "minutes")
  var nextTrainFormat = moment(nextTrain).format('hh:mm a')
  //Set firebase
  database.ref().push({
    name: name,
    destination: destination,
    arrivalTime: nextTrainFormat,
    frequency: frequency,
    minsAway: minutesToArrival
  })
  //Post data from submitted form to HTML table
  getData(clearForm());
})
