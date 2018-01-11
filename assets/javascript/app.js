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
//store in variable database
var database = firebase.database()

//function to clear Form
function clearForm() {
  $("#trainName, #destination, #arrivalTime, #frequency").val("")
}
///get data from firebase
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
//calculate mins away from current time
function displayMinsAway(){
  var now = moment().format("HH:mm");
  console.log(now)
  return now;
  /*
  var timeForm = moment(arrivalTime).to(moment(now))
  return timeForm;
  */
}
//form on click submit
$("#submit").on("click", function(event) {
  //prevent HTML page reset
  event.preventDefault()
  //call function to gather form values
  var name = $("#trainName").val().trim()
  var destination = $("#destination").val().trim()
  var arrivalTime = $("#arrivalTime").val().trim()
  var frequency = $("#frequency").val().trim()
  var minsAway = displayMinsAway()
  //log Form values
  console.log(name,destination,arrivalTime,frequency)
  //set firebase
  database.ref().push({
    name: name,
    destination: destination,
    arrivalTime: arrivalTime,
    frequency: frequency,
    minsAway: minsAway
  })
  //post data from submitted form to HTML table
  getData(clearForm());
})
