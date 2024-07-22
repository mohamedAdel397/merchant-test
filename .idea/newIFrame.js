let cardholdername = document.createElement("input");
let cardNumber = document.createElement("input");
let expirartionMM = document.createElement("input");
let expirartionYY = document.createElement("input");

cardholdername.setAttribute("type", "text");
cardNumber.setAttribute("type", "text");
expirartionMM.setAttribute("type","text");
expirartionYY.setAttribute("type","text");

cardholdername.setAttribute("placeholder", "Cardholder Name");
cardNumber.setAttribute("placeholder", "################");
expirartionMM.setAttribute("placeholder","MM");
expirartionYY

cardholdername.style.width = "200px";
cardholdername.style.padding = "10px";
cardholdername.style.margin = "10px 0";

cardNumber.style.width = "200px";
cardNumber.style.padding = "10px";
cardNumber.style.margin = "10px 0";

expirartionMM.style.width = "200px";
expirartionMM.style.padding = "10px";
expirartionMM.style.margin = "10px 0";


document.getElementById("input-container").appendChild(cardNumber);
document.getElementById("input-container").appendChild(cardholdername);
document.getElementById("input-container").appendChild(expirartionMM);

