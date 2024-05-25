// const scriptURL = 'https://script.google.com/macros/s/AKfycbxisfXzsyjAc-3FrJ674ZQy3CJa1Kvq8b6xJViboTrjhLYSj9EBQM7z2ljzLcUSz0h5QQ/exec'

let api =
  "https://script.google.com/macros/s/AKfycbzBtJAuj7OkpU6a_em1QB9yucXBC7axVnGDX0NW3GP_VKVN9up3kke0tF5O3jNZ37hW/exec";
let form = document.querySelector("form");
let save = document.querySelector("#save");
function saveData() {
    save.textContent = "Sending...";
    let obj = {
      title: form[0].value,
      name: form[1].value,
      ph: form[2].value,
      company: form[3].value,
      tcompany: form[4].value,
    };
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
        console.error('Error:', error);
        alert('Error occurred. Please try again later.');
        save.textContent = "Send";
      });
  }

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

// var phone = "7202914552";
    var title = constructTitleKandiMachine();
    var title1 = constructTitleLooms();
    var message = encodeURIComponent("Date: " + formattedDate + "\nTime: " + formattedTime + "\n\n" + title + "\nReason :" + reasone + "\n\n" + title1 + "\nReason :" + reasone1);
    var url = "https://wa.me/" + phone + "/?text=" + message;

    
    window.open(url, '_blank');

}



function operate(){
    sendWhatsAppMessage();
}