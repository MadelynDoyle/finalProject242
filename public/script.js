const resetForm = () => {
  const form = document.getElementById("beef-form");
  form.reset();
  form._id = "-1";
};
const submitForm = async (event) => {
  event.preventDefault();

  const firstName = document.getElementsByName("firstName")[0].value;
  const lastName = document.getElementsByName("lastName")[0].value;
  const email = document.getElementsByName("email")[0].value;
  const date = document.getElementsByName("date")[0].value;
  const phoneNum = document.getElementsByName("phoneNum")[0].value;
  const chuckRoast = document.getElementsByName("chuckRoast")[0].value;
  const shoulderRoast = document.getElementsByName("shoulderRoast")[0].value;
  const Brisket = document.getElementsByName("Brisket")[0].value;
  const flankSteak = document.getElementsByName("flankSteak")[0].value;
  const skirtSteak = document.getElementsByName("skirtSteak")[0].value;
  const triTip = document.getElementsByName("triTip")[0].value;
  const ribeyeBoneIn = document.getElementsByName("ribeyeBoneIn")[0].value;
  const ribeyeBoneOut = document.getElementsByName("ribeyeBoneOut")[0].value;
  const shortRibsBoneIn = document.getElementsByName("shortRibsBoneIn")[0].value;
  const beefStew = document.getElementsByName("beefStew")[0].value;
  const shanks = document.getElementsByName("shanks")[0].value;
  const TBone = document.getElementsByName("TBone")[0].value;
  const tenderloinFilet = document.getElementsByName("tenderloinFilet")[0].value;
  const newYorkStrip = document.getElementsByName("newYorkStrip")[0].value;
  const sirloinBoneIn = document.getElementsByName("sirlionBoneIn")[0].value;
  const sirloinBoneOut = document.getElementsByName("sirloinBoneOut")[0].value;
  const sirloinTipRoast = document.getElementsByName("sirloinTipRoast")[0].value;
  const topRoundRoast = document.getElementsByName("topRoundRoast")[0].value;
  const bottomRoundRoast = document.getElementsByName("bottomRoundRoast")[0].value;
  const cubedSteak = document.getElementsByName("cubedSteak")[0].value;
  const groundBeef = document.getElementsByName("groundBeef")[0].value;
  const organMeat = document.getElementsByName("organMeat")[0].value;

  if (firstName && lastName && email && date && phoneNum && chuckRoast && shoulderRoast && Brisket && flankSteak && skirtSteak && triTip && ribeyeBoneIn && ribeyeBoneOut && shortRibsBoneIn && beefStew && shanks && TBone && tenderloinFilet && newYorkStrip && sirloinBoneIn && sirloinBoneOut && sirloinTipRoast && topRoundRoast && bottomRoundRoast && cubedSteak && groundBeef && organMeat) {
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("errorMessage").style.display = "none";
  } else {
    document.getElementById("successMessage").style.display = "none";
    document.getElementById("errorMessage").style.display = "block";
  };

  try {
      const response = await fetch("/api/beefSheet", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });

      if (response.status === 200) {
          console.log("Form submitted successfully!");
      } else {
          console.error("Error submitting form:", response.statusText);
      }
  } catch (error) {
      console.error("An error occurred:", error);
  }
};


const getBeefSheet = async () => {
  try {
    return (await fetch("api/beefSheet/")).json();
  } catch (error) {
    console.error(error);
  }
};

const showBeefSheet = async () => {
  try {
    let beef = await getBeefSheet();

    if (!beef) {
      console.error("Error fetching beef sheet: Response is undefined");
      return;
    }

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
  } catch (error) {
    console.error("An error occurred while fetching beef sheet:", error);
  }
};


const addEditBeefSheet = async (e) => {
  e.preventDefault();
  const form = document.getElementById("beef-form");
  const formData = new FormData(form);
  console.log([...formData.entries()]);
  let response;

  try {
    response = await fetch("/api/beefSheet", {
      method: "POST",
      body: formData,
    });

    if (response.status !== 200) {
      console.error("Error posting data");
    }

    beef = await response.json();

    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showBeefSheet();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

window.onload = () => {
  showBeefSheet();
  document.getElementById("beef-form").onsubmit = addEditBeefSheet;
};