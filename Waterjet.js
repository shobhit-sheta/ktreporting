// const scriptURL = 'https://script.google.com/macros/s/AKfycbxisfXzsyjAc-3FrJ674ZQy3CJa1Kvq8b6xJViboTrjhLYSj9EBQM7z2ljzLcUSz0h5QQ/exec'

let api =
  "https://script.google.com/macros/s/AKfycbxQ3SWppSu4f0IntV-06RnF_4lGH1pgpjP6CECC7drltal3SIJUfQOQuGEMe6a92qT5ag/exec";
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

  var phone = "7202914552";
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
  var url = "https://wa.me/" + phone + "/?text=" + message;

  window.open(url, "_blank");
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
