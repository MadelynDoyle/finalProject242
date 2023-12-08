function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        document.getElementById("successMessage").style.display = "block";
        document.getElementById("errorMessage").style.display = "none";
    } else {
        document.getElementById("successMessage").style.display = "none";
        document.getElementById("errorMessage").style.display = "block";
    }
}
/*document.addEventListener("DOMContentLoaded", function() {
    const jsonData = {
        "name": "Madelyn Doyle",
        "date": "11/02/2023",
        "email": "doylemr@email.sc.edu",
        "phone": "8435556767",
        "resale?": "yes",
        "chuck-roast": "2-3lbs",
        "shoulder-roast": "4-5lbs",
        "brisket": "whole",
        "ribeye-bone-in": "3/4",
        "ribeye-bone-out": "1 1/2",
        "short-ribs-bone-in": "yes",
        "beef-stew": "10lbs",
        "shanks": "whole",
        "proterhouse-tbone": "1",
        "Tinderlion-filet": "1 1/2",
        "NY-strip": "3/4",
        "sirloin-bone-in": "1 1/2",
        "sirloin-bone-out": "1",
        "sirlion-tip-roast": "4-5lbs",
        "top-round-roast": "2-3lbs",
        "bottom-round-roast": "2-3lbs",
        "cubed-steak": "10lbs",
        "ground-beef": "1lb packs",
        "organs": "all",
        "img": "images/meatcase3.jpg"
    };

    const infoList = document.getElementById("customer-info");

    for (const [key, value] of Object.entries(jsonData)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${key}: ${value}`;
        infoList.appendChild(listItem);
    }
});*/
const getBeefSheet = async () => {
    try {
      return (await fetch("api/beefSheet/")).json();
    } catch (error) {
      console.log(error);
    }
  };

  const showBeefSheet = async () => {
    let beef = await getBeefSheet();
    let beefSheetdiv = document.getElementById("beefSheetdiv");
    beefSheetdiv.innerHTML = "";
    beef.forEach((beef) => {
      const section = document.createElement("section");
      section.classList.add("beef");
      beefSheetdiv.append(section);
  
      const a = document.createElement("a");
      a.href = "#";
      section.append(a);
  
      const h3 = document.createElement("h3");
      h3.innerHTML = beef.firstName;
      a.append(h3);
  
      a.onclick = (e) => {
        e.preventDefault();
        displayDetails(beef);
      };
    });
  };

  const addEditBeefSheet = async (e) => {
    e.preventDefault();
    const form = document.getElementById("beef-form");
    const formData = new FormData(form);
    let response;

  
      response = await fetch("/api/beefSheet", {
        method: "POST",
        body: formData,
      });

  
    if (response.status != 200) {
      console.log("Error posting data");
    }
  
    beef = await response.json();
  
    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showBeefSheet();
  };

  const resetForm = () => {
    const form = document.getElementById("book-form");
    form.reset();
    form._id = "-1";
  };

  window.onload = () => {
    showBeefSheet();
    document.getElementById("beef-form").onsubmit = addEditBeefSheet;
  };
