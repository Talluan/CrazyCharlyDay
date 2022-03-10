import { config } from "./config.js";

document.getAdminCateg = () => {
    console.log("yes")
    const categ = document.getElementById("categ");
    fetch(config.host+"/api/categories").then(response => response.json()).then(categories => {
        categories.forEach(categorie => {
            // <option value="<?= $key['name'] ?>"><?= $key['name'] ?></option>
            const option = document.createElement("option");
            option.value = categorie.id;
            option.innerHTML = categorie.nom;
            categ.appendChild(option);
        });
    });
};

window.onload = document.getAdminCateg;