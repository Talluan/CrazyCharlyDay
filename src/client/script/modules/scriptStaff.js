let categ = document.getElementById("categ");
let categText = document.getElementById("categ-span");
let nom = document.getElementById("itemName");
let nomText = document.getElementById("nom-span");
let descr = document.getElementById("descr");
let descrText = document.getElementById("descr-span");
let prix = document.getElementById("prix");
let prixText = document.getElementById("prix-span");
let poids = document.getElementById("poids");
let poidsText = document.getElementById("poids-span");


categ.onchange = () => {
    categText.innerHTML = categ.value;
}

nom.onchange = () => {
    nomText.innerHTML = nom.value;
}

descr.onchange = () => {
    descrText.innerHTML = descr.value;
}

prix.onchange = () => {
    prixText.innerHTML = prix.value;
}

poids.onchange = () => {
    poidsText.innerHTML = poids.value;
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


categ.onchange();
nom.onchange();
descr.onchange();
prix.onchange();
poids.onchange();