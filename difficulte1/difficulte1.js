window.onload = function init() {                       // Création alphabet
    
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    var tableau = document.getElementById('table');
    
    var ligne = tableau.insertRow(-1);
    for (var i=0; i<13; i++) {
        var colonne = ligne.insertCell(i);
        colonne.innerHTML += alphabet[i];
    }
    
    var ligne = tableau.insertRow(-1);
    for (var i=13; i<26; i++) {
        var x=-1;
        var colonne = ligne.insertCell(x);
        colonne.innerHTML += alphabet[i];
    }
}

function requestXML(url) {                  // Création + envoie requête XML pour récupération des entrées
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            responseText(this);
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send();
}

function responseText(xhttp) {              //Récupération de toutes les entrées possibles + choix aléatoire
    
    var text = xhttp.responseText.split('\n');
    xhttp.responseText = null;
    var node = Math.floor(Math.random()*text.length);
    text[node] = text[node].trim();
    //console.log(text[node].length);
    //console.log(text[node]);
    var response = text[node].split('');
    //console.log(response);
    tableau(response);
    
}

function tableau(mot) {           //Création tableau + affichage dans tableau
    
    var tableau = document.getElementById('affichageMot');
    tableau.deleteRow(-1);
    var ligne = tableau.insertRow(-1);
    
    for (var i=0; i<mot.length; i++) {
        var colonne = ligne.insertCell(i);
        colonne.innerHTML += mot[i].toUpperCase();
    }
}
