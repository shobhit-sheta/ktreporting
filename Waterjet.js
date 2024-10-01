// const scriptURL = 'https://script.google.com/macros/s/AKfycbxisfXzsyjAc-3FrJ674ZQy3CJa1Kvq8b6xJViboTrjhLYSj9EBQM7z2ljzLcUSz0h5QQ/exec'

let api =
  "https://script.google.com/macros/s/AKfycbypCwSE6_YYo5gJIs6YWM43xDEWJRvMw2L91R0q44yUkPPNoAJTX_5wdFMaDasDiv7m_A/exec";
let form = document.querySelector("form");
let save = document.querySelector("#save");
// let CheckedKandi = getCheckedKandi();
// let UncheckedKandi = getUncheckedKandi();
// let passaria = document.getElementById("passaria").value;

function constructTitleWaterjetMachine() {
  var title = "Waterjet Machine";
  var selectedOptions = [];
  var uncheckedOptions = [];

  if (document.getElementById("1-6").checked) {
    uncheckedOptions.push("1-6");
  } else {
    selectedOptions.push("1-6");
  }
  if (document.getElementById("7-13").checked) {
    uncheckedOptions.push("7-13");
  } else {
    selectedOptions.push("7-13");
  }
  if (document.getElementById("29-33").checked) {
    uncheckedOptions.push("29-33");
  } else {
    selectedOptions.push("29-33");
  }
  if (document.getElementById("34-38").checked) {
    uncheckedOptions.push("34-38");
  } else {
    selectedOptions.push("34-38");
  }
  if (document.getElementById("39-44").checked) {
    uncheckedOptions.push("39-44");
  } else {
    selectedOptions.push("39-44");
  }
  if (document.getElementById("45-50").checked) {
    uncheckedOptions.push("45-50");
  } else {
    selectedOptions.push("45-50");
  }

  var checkedCount = selectedOptions.length;
  if (selectedOptions.length > 0) {
    title += " :*" + checkedCount + "*";
  }

  var uncheckedCount = uncheckedOptions.length;
  if (uncheckedCount > 0) {
    title +=
      "\nBandh Waterjet Machine : " +
      "\n*" +
      uncheckedCount +
      " (" +
      uncheckedOptions.join(", ") +
      ")*";
  }

  return title;
}

function sendWhatsAppMessage() {
  var reasone = document.getElementById("reasone").value;

  // var reasone = document.getElementById('reasone').value;

  var currentDate = new Date();

  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var formattedDate = day + "/" + month + "/" + year;

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();

  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  var formattedTime =
    hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + ampm;

  var groupName = "Reporting"; // Replace with your WhatsApp group name
  var phone = encodeURIComponent("Reporting");

  var title = constructTitleWaterjetMachine();
  var passaria = document.getElementById("passaria").value;
  var message = encodeURIComponent(
    "Date: " +
      formattedDate +
      "\nTime: " +
      formattedTime +
      "\n\n" +
      title +
      "\nReason :" +
      reasone +
      "\n\nPassaria :" +
      " *" +
      passaria +
      "*"
  );
  // var groupInviteLink = "https://chat.whatsapp.com/D6vESUtvUkTA2Mto9s8uhK"; // Replace with your actual invite link
// window.open(groupInviteLink, '_blank');
var url = "https://wa.me/" + phone + "/?text=" + message;

    
window.open(url, '_blank');
}

// Function to get checked checkboxes within the .Waterjet block
function getCheckedWaterjet() {
  const checked = [];
  const checkedBoxes = document.querySelectorAll(
    '.Waterjet input[type="checkbox"]:checked'
  );

  checkedBoxes.forEach((checkbox) => {
    checked.push(checkbox.value);
  });

  return checked;
}

// Function to get unchecked checkboxes within the .Waterjet block
function getUncheckedWaterjet() {
  const unchecked = [];
  const uncheckedBoxes = document.querySelectorAll(
    '.Waterjet input[type="checkbox"]:not(:checked)'
  );

  uncheckedBoxes.forEach((checkbox) => {
    unchecked.push(checkbox.value);
  });

  return unchecked;
}

function saveData() {
  const date = new Date(); // Get today's date and time
  const formattedDate = date.toLocaleString(); // Format the date and time as a string
  const CheckedWaterjet = getCheckedWaterjet();
  const UncheckedWaterjet = getUncheckedWaterjet();

  console.log(UncheckedWaterjet);
  // Convert arrays to comma-separated strings
  const checkedWaterjetText = CheckedWaterjet.join(", ");
  const uncheckedWaterjetText = UncheckedWaterjet.join(", ");

  const reasone = document.getElementById("reasone").value;
  const passaria = document.getElementById("passaria").value;

  // Construct the data object
  let obj = {
    sheet: "Waterjet",
    date: formattedDate,
    waterjet: uncheckedWaterjetText,
    bandhWaterjet: checkedWaterjetText,
    reasone: reasone,
    passaria: passaria,
  };
  save.textContent = "Sending...";
  fetch(api, {
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((res) => res.text())
    .then((data) => {
      alert(data);
      // sendPDF(); // <- Here's the call to sendPDF()
      form.reset();
      save.textContent = "Send";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error occurred. Please try again later.");
      save.textContent = "Send";
    });
}

function operate() {
  saveData();
  sendWhatsAppMessage();
}





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
    (user == "Manish" && psd == "6354957851")) {
    document.querySelector("body").style.overflow = "auto";
    document.getElementById("accessAllowed").style.display = "block";
    document.getElementById("login").style.display = "none";
  } else {
    document.getElementById("accessAllowed").style.display = "none";
    alert("Invalid Username or Password!");
  }
}
