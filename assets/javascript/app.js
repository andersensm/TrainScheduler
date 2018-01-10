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
  $("#trainName").val("")
  $("#destination").val("")
  $("#arrivalTime").val("")
  $("#frequency").val("")
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
  //log Form values
  console.log(name,destination,arrivalTime,frequency)
  //set firebase
  database.ref().set({
    name: name,
    destination: destination,
    arrivalTime: arrivalTime,
    frequency: frequency
  })
  //clear Form
  clearForm();
  




})
