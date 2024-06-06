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
  i3_divformpopup.style.display = "block";

  /* div form*/
  i4_formpopup = document.createElement("form");
  i4_formpopup.classList.add("form-container");

  /* Titre*/
  i5_title = document.createElement("h2");
  i5_Titletext = document.createTextNode("Veuillez vous connecter");
  i5_title.appendChild(i5_Titletext);
  /* label email*/
  i5_emailLabel = document.createElement("label");
  i5_emailLabel.setAttribute("for", "valueEmail");
  i51_emailLabelStrong = document.createElement("strong");
  i51_emailLabel = document.createTextNode("E-mail");
  i51_emailLabelStrong.appendChild(i51_emailLabel);
  i5_emailLabel.appendChild(i51_emailLabelStrong);

  i5_inputMail = document.createElement("input");
  i5_inputMail.classList.add("form-container");
  i5_inputMail.setAttribute("type", "text");
  i5_inputMail.setAttribute("id", "valueEmail");
  //i5_inputMail.setAttribute("name", "email");
  i5_inputMail.setAttribute("placeholder", "Votre Email");

  i5_inputMail.required = true;

  i5_pswLabel = document.createElement("label");
  i5_pswLabel.setAttribute("for", "valuePsw");
  i5_pswLabelText = document.createTextNode("Mot de passe");
  i5_pswLabel.appendChild(i5_pswLabelText);
  i51_pswLabel = document.createElement("strong");
  i51_pswLabeltext = document.createTextNode("Mot de passe");
  i51_pswLabel.appendChild(i51_pswLabeltext);
  i5_pswLabel.appendChild(i51_pswLabel);

  i5_inputPsw = document.createElement("input");

  i5_inputMail.classList.add("form-container");
  i5_inputPsw.setAttribute("type", "password");
  i5_inputPsw.setAttribute("id", "valuePsw");
  //i5_inputPsw.setAttribute("name", "psw");
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
  btnsubmit.setAttribute("type", "submit");
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

fcancel = document.getElementById("btnCancel");
if (fcancel) {
  fcancel.addEventListener("click", onCancelForm);
}
fsubmit = document.getElementById("btnSubmit");
if (fsubmit) {
  fsubmit.addEventListener("click", onSubmitForm);
}

function onCancelForm() {
  //console.log("cancel Form");
  //document.getElementById("popupForm").style.display = "none";

  document.location.href = "index.html";
  //history.back();
}

function onSubmitForm(event) {
  event.preventDefault();
  const valuemail = document.getElementById("valueEmail").value;
  const valuepass = document.getElementById("valuePsw").value;

  //console.log(valuepass && valuemail);
  //console.log("submit");
  if (valuepass && valuemail) {
    if (valuepass.toUpperCase() === "CSSV") {
      sessionStorage.setItem("connect", JSON.stringify(true));
      document.location.href = "index.html";
    } else {
      sessionStorage.setItem("connect", JSON.stringify(false));
      window.alert("Vous n'êtes pas connecté !!");
    }
    setStateConnected();
    //console.log("submit");
  }
}
