// const scriptURL = 'https://script.google.com/macros/s/AKfycbxisfXzsyjAc-3FrJ674ZQy3CJa1Kvq8b6xJViboTrjhLYSj9EBQM7z2ljzLcUSz0h5QQ/exec'

let api =
  "https://script.google.com/macros/s/AKfycbxVR4pTkpxlS7rnWZv0yobZbRDiBXL9M6y4ZmVnCdjTLu_aP58Y9U1RdaU6YJYp3V8hjw/exec";
let form = document.querySelector("form");
let save = document.querySelector("#save");
// let CheckedKandi = getCheckedKandi();
// let UncheckedKandi = getUncheckedKandi();
// let passaria = document.getElementById("passaria").value;

  function constructTitleLooms() {
    var title = "Looms";
    var selectedOptions = [];
    var uncheckedOptions = [];

    var groups = document.querySelectorAll('.looms .looms1');
    groups.forEach(function(group) {
        var checkboxes = group.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
              uncheckedOptions.push(checkbox.value);
            }else {
              selectedOptions.push(checkbox.value);
          }
        });
    });

    var checkedCount = selectedOptions.length;
    if (selectedOptions.length > 0) {
      title += " :*" + checkedCount + "*";
  }

    var uncheckedCount = uncheckedOptions.length;
    if (uncheckedCount > 0) {
        title += "\nBandh Looms Line : " + "\n*" + uncheckedCount + " (" + uncheckedOptions.join(", ") + ")*" ;
    }
    return title;
}

function constructTitleKandiMachine() {
    var title = "Kandi Machine";
    var selectedOptions = [];
    var uncheckedOptions = [];

    if (document.getElementById('LS').checked) {
      uncheckedOptions.push("LS");
    } else {
      selectedOptions.push("LS");
    }
    if (document.getElementById('RG').checked) {
      uncheckedOptions.push("RG");
    } else {
      selectedOptions.push("RG");
    }
    if (document.getElementById('SS').checked) {
      uncheckedOptions.push("SS");
    } else {
      selectedOptions.push("SS");
    }

    var checkedCount = selectedOptions.length;
    if (selectedOptions.length > 0) {
      title += " :*" + checkedCount + "*";
  }

  var uncheckedCount = uncheckedOptions.length;
  if (uncheckedCount > 0) {
      title += "\nBandh Kandi Machine : " + "\n*" + uncheckedCount + " (" + uncheckedOptions.join(", ") + ")*" ;
  }

    return title;
}

function sendWhatsAppMessage() {
    var reasone = document.getElementById('reasone').value;
    var reasone1 = document.getElementById('reasone1').value;

    // var reasone = document.getElementById('reasone').value;

    
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var formattedDate = day + "/" + month + "/" + year;

    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    var formattedTime = hours + ":" + (minutes < 10 ? '0' : '') + minutes + " " + ampm;
    
    var groupName = "Reporting"; // Replace with your WhatsApp group name
    var phone = encodeURIComponent("Reporting");

var phone = "7202914552";
    var title = constructTitleKandiMachine();
    var title1 = constructTitleLooms();
    var passaria = document.getElementById("passaria").value;
    var message = encodeURIComponent("Date: " + formattedDate + "\nTime: " + formattedTime + "\n\n" + title + "\nReason :" + reasone + "\n\n" + title1 + "\nReason :" + reasone1+ "\n\nPassaria :" + " *"+passaria+"*");
    var url = "https://wa.me/" + phone + "/?text=" + message;

    
    window.open(url, '_blank');

}


// Function to get checked checkboxes within the .kandi block
function getCheckedKandi() {
  const checked = [];
  const checkedBoxes = document.querySelectorAll('.kandi input[type="checkbox"]:checked');
  
  checkedBoxes.forEach(checkbox => {
    checked.push(checkbox.value);
  });

  return checked;
}

// Function to get unchecked checkboxes within the .kandi block
function getUncheckedKandi() {
  const unchecked = [];
  const uncheckedBoxes = document.querySelectorAll('.kandi input[type="checkbox"]:not(:checked)');
  
  uncheckedBoxes.forEach(checkbox => {
    unchecked.push(checkbox.value);
  });

  return unchecked;
}

// Function to get checked checkboxes within the .looms block
function getCheckedLooms() {
  const checked = [];
  const checkedBoxes = document.querySelectorAll('.looms input[type="checkbox"]:checked');
  
  checkedBoxes.forEach(checkbox => {
    checked.push(checkbox.value);
  });

  return checked;
}

// Function to get unchecked checkboxes within the .looms block
function getUncheckedLooms() {
  const unchecked = [];
  const uncheckedBoxes = document.querySelectorAll('.looms input[type="checkbox"]:not(:checked)');
  
  uncheckedBoxes.forEach(checkbox => {
    unchecked.push(checkbox.value);
  });

  return unchecked;
}

function saveData() {

  const date = new Date();  // Get today's date and time
const formattedDate = date.toLocaleString(); // Format the date and time as a string
     
  const CheckedKandi = getCheckedKandi();
  const UncheckedKandi = getUncheckedKandi();

  // Convert arrays to comma-separated strings
  const checkedKandiText = CheckedKandi.join(', ');
  const uncheckedKandiText = UncheckedKandi.join(', ');

  const reasone = document.getElementById("reasone").value;
  
  const CheckedLooms = getCheckedLooms();
  const UncheckedLooms = getUncheckedLooms();
  
  // Convert arrays to comma-separated strings
  const checkedLoomsText = CheckedLooms.join(', ');
  const uncheckedLoomsText = UncheckedLooms.join(', ');
  
  const reasone1 = document.getElementById("reasone1").value;
  
  const passaria = document.getElementById("passaria").value;
  
  // Construct the data object
  let obj = {
    sheet: "Looms",
    date: formattedDate,
    kandi: uncheckedKandiText,
    bandhKandi: checkedKandiText,
    reasone: reasone,
    looms: uncheckedLoomsText,
    bandhLooms: checkedLoomsText,
    reasone1: reasone1,
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


function operate(){
  saveData();
    sendWhatsAppMessage();
}