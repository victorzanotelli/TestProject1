function createLoginPopup() {
  let popupParent_i1 = document.querySelector("#loginForm");
  if (!popupParent_i1) {
    console.log("balise #loginForm not found...");
    return;
  }
  /*i2 div login-popup*/
  i2_divpopup = document.createElement("div");
  i2_divpopup.classList.add("login-popup");

  /* div form-popup*/
  i3_divformpopup = document.createElement("div");
  i3_divformpopup.classList.add("form-popup");
  i3_divformpopup.setAttribute("id", "popupForm");

  /* div form*/
  i4_formpopup = document.createElement("form");
  i4_formpopup.classList.add("form-container");

  /* Titre*/
  i5_title = document.createElement("h2");
  i5_Titletext = document.createTextNode("Veuillez vous connecter");
  i5_title.appendChild(i5_Titletext);
  /* label email*/
  i5_emailLabel = document.createElement("label");
  i5_emailLabel.setAttribute("for", "email");
  i51_emailLabelStrong = document.createElement("strong");
  i51_emailLabel = document.createTextNode("E-mail");
  i51_emailLabelStrong.appendChild(i51_emailLabel);
  i5_emailLabel.appendChild(i51_emailLabelStrong);

  i5_inputMail = document.createElement("input");
  i5_inputMail.classList.add("form-container");
  i5_inputMail.setAttribute("type", "text");
  i5_inputMail.setAttribute("id", "email");
  i5_inputMail.setAttribute("name", "email");
  i5_inputMail.setAttribute("placeholder", "Votre Email");

  i5_inputMail.required = true;

  i5_pswLabel = document.createElement("label");
  i5_pswLabel.setAttribute("for", "psw");
  i5_pswLabelText = document.createTextNode("Mot de passe");
  i5_pswLabel.appendChild(i5_pswLabelText);
  i51_pswLabel = document.createElement("strong");
  i51_pswLabeltext = document.createTextNode("Mot de passe");
  i51_pswLabel.appendChild(i51_pswLabeltext);
  i5_pswLabel.appendChild(i51_pswLabel);

  i5_inputPsw = document.createElement("input");

  i5_inputMail.classList.add("form-container");
  i5_inputPsw.setAttribute("type", "password");
  i5_inputPsw.setAttribute("id", "psw");
  i5_inputPsw.setAttribute("name", "psw");
  i5_inputPsw.setAttribute("placeholder", "Votre Mot de passe");

  i5_inputPsw.required = true;
  i5_div_button = document.createElement("div");
  i5_div_button.classList.add("loginBtn");

  let btnCancel = document.createElement("button");
  btnCancel.textContent = "Annuler";
  btnCancel.classList.add("form-container");
  btnCancel.setAttribute("id", "btnCancel");
  btnCancel.classList.add("btn");

  let btnsubmit = document.createElement("button");
  btnsubmit.textContent = "Connection";
  btnsubmit.classList.add("form-container");
  btnsubmit.classList.add("btn");
  btnsubmit.setAttribute("id", "btnSubmit");
  i5_div_button.appendChild(btnCancel);
  i5_div_button.appendChild(btnsubmit);

  i4_formpopup.appendChild(i5_title);
  i4_formpopup.appendChild(i5_emailLabel);
  i4_formpopup.appendChild(i5_inputMail);
  i4_formpopup.appendChild(i5_pswLabel);
  i4_formpopup.appendChild(i5_inputPsw);
  i4_formpopup.appendChild(i5_div_button);


  i3_divformpopup.appendChild(i4_formpopup);
  i2_divpopup.appendChild(i3_divformpopup);
  console.log(popupParent_i1);
  popupParent_i1.appendChild(i2_divpopup);
}
createLoginPopup();

function openForm() {
  document.getElementById("popupForm").style.display = "block";
}

function cancelForm() {

  document.getElementById("popupForm").style.display = "none";
}

function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}
function submitForm() {

  const valuemail = document.getElementById("email").Value;
  const valuepass = document.getElementById("psw").Value;
  if (!validateEmail(valuemail) || valuepass.toUpperCase() !== "CSSV") {
    window.alert("Vous n'êtes pas connecté");
    document.getElementById("popupForm").style.display = "block";
  }
  else {
    window.alert("Vous êtes connecté");
    document.getElementById("popupForm").style.display = "none";
  }

  console.log(valumail + "-" + valuepass);
}


let fopen = document.querySelector("#open-connect");
if (fopen) {
  fopen.addEventListener("click", openForm);
}

fcancel = document.getElementById("btnCancel");
if (fcancel) {
  fcancel.addEventListener("click", cancelForm);
}


fsubmit = document.getElementById("btnSubmit");
if (fsubmit) {
  fsubmit.addEventListener('click', function validate() {
    let isValid = false;
    localStorage.setItem("connect", false);
    const valuemail = document.getElementById("email").Value;
    const valuepass = document.getElementById("psw").Value;
    //while (!isValid) {
    if (validateEmail(valuemail) && valuepass.toUpperCase() === "CSSV") {
      window.alert("Vous êtes connecté");
      isValid = true;
      localStorage.setItem("connect", true);

    }
    if (isValid) {
      window.alert("Vous n'êtes pas connecté...");
      document.getElementById("popupForm").style.display = "none";
    }
  } //}
  );
}
