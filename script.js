

document.getElementById("accessDenied").style.width = "100vw";
document.getElementById("accessDenied").style.height = "100vh";

window.onload = function() {
  var currentTime = new Date();
  var currentHour = currentTime.getHours();

  if (currentHour >= 20 || currentHour < 8) { // 9 PM (21:00) to 8 AM (08:00)
      document.getElementById("accessDenied").style.display = "block";
      var messageDiv = document.getElementById("accessDenied");
    messageDiv.innerHTML = "<h1 style='font-size: 28px;'><B>Sorry!</B></h1><p>You cannot access at this time.</p>";
    document.getElementById("login").style.display = "none";
  } else {
      document.getElementById("accessDenied").style.display = "none";
      document.getElementById("login").style.display = "block";
      // document.getElementById("accessDenied").style.display = "none";
      var messageDiv = document.getElementById("accessDenied");
      messageDiv.innerHTML = "";
  
      document.querySelector("body").style.overflow = "hidden";
  }
};



function login() {
  let user = document.getElementById("username").value;
  let psd = document.getElementById("password").value;

  if (
    (user == "Raju" && psd == "9978260142")||
    (user == "" && psd == "")) {
        window.location.href = "index1.html";
  } else {
    document.getElementById("accessAllowed").style.display = "none";
    alert("Invalid Username or Password!");
  }
}
