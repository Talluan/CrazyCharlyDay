import config from "./config.js"

function getCategories() {
    let pr = fetch(config.host + config.categories)
    pr.then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                console.log('response error : ' + response.status)
                return Promise.reject(new Error(response.statusText))
            }
        })
        .catch(error => {
            console.log("erreur: " + error)
        })
}

function displayCategories() {
    let categories = getCategories()

    let cat = document.getElementById("categories")


}

export default {
    getCategories
}