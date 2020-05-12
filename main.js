let oldRegionId = "region_hauts_de_france"
let listRegion;
function demarrer() {
    //On charge les infos des régions
    chargerJSON("./listRegion.json", (text) => { listRegion = JSON.parse(text) })
    //On fait l'abonnement de toutes les zones de la carte
    var allPath = document.getElementsByTagName('path');
    for(var i=0; i<allPath.length; i++) {
       if(allPath[i].id.startsWith('region_')) {
          document.getElementById(allPath[i].id).addEventListener('click', afficherProfil)
       }
    }
}

function afficherProfil() {
    document.getElementById(oldRegionId).style.fill = "rgb(255, 255, 255)"
    oldRegionId = this.id
    this.style.fill = "rgb(252, 186, 3)"
    let nom = listRegion[this.id].nom
    let prefecture = listRegion[this.id].prefecture
    let population = listRegion[this.id].population
    let sectionUl = document.getElementById('departement')
    sectionUl.innerHTML = ""
    document.getElementById('nom').innerHTML = nom
    document.getElementById('prefecture').innerHTML = `Prefecture : ${prefecture}`
    document.getElementById('population').innerHTML = `Nombre d'habitants : ${population}`
    document.getElementById('listDep').innerHTML = "Liste des départements :"

    for(let i=0;i<listRegion[this.id].departements.length;i++) {
        let li = document.createElement('li')
        li.innerHTML = listRegion[this.id].departements[i]
        sectionUl.appendChild(li)
    }
}




function chargerJSON(file, callback) {
    let rawFile = new XMLHttpRequest()
    rawFile.overrideMimeType("application/json")
    rawFile.open("GET", file, true)
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState == 4 && rawFile.status == "200") {
            callback(rawFile.responseText)
        }
    }
    rawFile.send(null)
}


window.addEventListener('load', demarrer)