var firebaseConfig = {
    apiKey: "AIzaSyC8dAW5F2vXuUbaPrtmhwGb8lqHEpDU2CU",
    authDomain: "kwitter-48121.firebaseapp.com",
    databaseURL: "https://kwitter-48121-default-rtdb.firebaseio.com",
    projectId: "kwitter-48121",
    storageBucket: "kwitter-48121.appspot.com",
    messagingSenderId: "195460584655",
    appId: "1:195460584655:web:ac39a019cbb2f1d889d3ba",
    measurementId: "G-NT9S3G9NY2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//YOUR FIRE BASE LINKS

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
msg = document.getElementById("msg").value;
firebase.database().ref(room_name).push({
name:user_name,
message:msg,
like:0
});

document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebase_message_id = childKey;
     message_data = childData;
//Start code
     console.log(firebase_message_id);
       console.log(message_data);
       name = message_data['name'];
       message = message_data['message'];
     like = message_data['like'];
     name_with_tag = "<h4> "+ name +"<img class='user_tick' src='https://cdn.dribbble.com/users/4536/screenshots/1399681/circle_check_sierra60.gif'></h4>";
     message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
     span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

    row = name_with_tag + message_with_tag +like_button + span_with_tag;       
    document.getElementById("output").innerHTML += row;
//End code
  } });  }); }
getData();

function updateLike(message_id)
{
console.log("clicked on like button - " + message_id);
button_id = message_id;
likes = document.getElementById(button_id).value;
updated_likes = Number(likes) + 1;
console.log(updated_likes);

firebase.database().ref(room_name).child(message_id).update({
    like : updated_likes  
 });

}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("kwitter.html");
}















