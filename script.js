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
document.addEventListener("DOMContentLoaded", function() {
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
});
