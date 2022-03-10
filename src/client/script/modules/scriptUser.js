let login = document.getElementById("login");
let loginText = document.getElementById("login-span");
let mdp = document.getElementById("password");
let mdpText = document.getElementById("mdp-span");
let prenom = document.getElementById("userPrenom");
let prenomText = document.getElementById("prenom-span");
let nom = document.getElementById("Nom");
let nomText = document.getElementById("nom-span");
let email = document.getElementById("mail");
let emailText = document.getElementById("mail-span");
let tel = document.getElementById("numPhone");
let telText = document.getElementById("tel-span");


login.onchange = () => {
    loginText.innerHTML = login.value;
}

mdp.onchange = () => {
    mdpText.innerHTML = mdp.value;
}

prenom.onchange = () => {
    prenomText.innerHTML = prenom.value;
}

nom.onchange = () => {
    nomText.innerHTML = nom.value;
}

mail.onchange = () => {
    mailText.innerHTML = mail.value;
}

tel.onchange = () => {
    telText.innerHTML = tel.value + " g";
}

(function() {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()


nom.onchange();
prenom.onchange();
login.onchange();
mdp.onchange();
tel.onchange();
mail.onchange();