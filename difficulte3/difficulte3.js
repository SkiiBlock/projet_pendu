var response;

window.onload = load();
    
function load() {                       // Création alphabet
    
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
    
    var ua = navigator.userAgent;
    var x = ua.indexOf('Chrome');
    var y = ua.indexOf('Firefox');
    
    if (x != -1) {
        requestXML('difficulte3.xml');
    }
    
    if (y != -1) {
        requestText('ecole.txt');
    }
}

function requestXML(url) {
    
    var xhttp = new XMLHttpRequest();
    var categorie = document.getElementById('info').innerHTML;
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            reponseXML(xhttp, categorie);
        }
    }
    
    xhttp.open('GET', url, true);
    xhttp.send();
    
}

function requestText(url) {
    
    var xhttp = new XMLHttpRequest();
    var categorie = document.getElementById('info').innerHTML;
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            responseText(this);
        }
    }
    
    xhttp.open('GET', url, true);
    xhttp.send();
    
}

function reponseXML(xhttp, categorie) {
      
    var i = Math.floor(Math.random() * 6)
    var xml = xhttp.responseXML.getElementsByTagName(categorie)[0].getElementsByTagName('mot')[i].childNodes[0].nodeValue;
     
    var mot = xml.split('');
    response = mot;
    
    tableau(mot);
    
}

function responseText(xhttp) {              // Récupération de toutes les entrées possibles + choix aléatoire
    
    var text = xhttp.responseText.split('\n');
    xhttp.responseText = null;
    
    var node = Math.floor(Math.random()*text.length);
    text[node] = text[node].trim();
    
    response = text[node].split('');
    tableau(response);
    
}

function tableau(mot) {           // Création tableau + affichage dans tableau
    
    var tableau = document.getElementById('affichageMot');
    tableau.deleteRow(-1);
    var ligne = tableau.insertRow(-1);
    
    for (var i=0; i<mot.length; i++) {
        var colonne = ligne.insertCell(i);
        colonne.innerHTML = '';
    }
}

function grabId(e) {
	var e = window.event || e;
	var targ = e.target || e.srcElement;
    
    var x = targ.innerHTML;
    
    for (var i=0; i<response.length; i++) {
        var y = response.indexOf(x, i);
        
        if (y != -1) {
            affichageTableau(y);
            suppressionLettre(x);
        }
        
    }

}

function affichageTableau(y) {          // Affichage lettre dans 'affichageMot' + win
    
    var tableau = document.getElementById('affichageMot').getElementsByTagName('td');
    tableau[y].innerHTML = response[y];
    
    var z = [];
    for (var i=0; i<tableau.length; i++) {
        z.push(tableau[i].innerHTML);     
    }
    
    var a = response.toString();
    var b = z.toString();
    
    if (a == b) {
        win();
    }
        
}

function suppressionLettre(x) {                 // Suppresion lettre dans 'table'
    
    var tableau = document.getElementById('table').getElementsByTagName('td');
    
    for (var i=0; i<tableau.length; i++) {
        if (tableau[i].innerHTML == x) {
            tableau[i].innerHTML = '';
        }
    }
}

function win() {
    console.log('Tu as trouvé le mot !');
    setTimeout(function reset() {
        var tableau = document.getElementById('table');
    
        tableau.deleteRow(-1);
        tableau.deleteRow(-1);
        load();
        
    }, 2000);
}