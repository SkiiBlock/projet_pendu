var response;
var count = 0;

window.onload = function () {                       // Création alphabet
    
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
    
    requestText('apple.txt');
    
    /*var ua = navigator.userAgent;
    var x = ua.indexOf('Chrome');
    var y = ua.indexOf('Firefox');
    
    if (x != -1) {
        requestXML('difficulte1.xml');
    }
    
    if (y != -1) {
        requestText('apple.txt');
    }*/
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
     
    console.log(mot);
    
    tableau(mot);
      
}

function responseText(xhttp) {              // Récupération de toutes les entrées possibles + choix aléatoire
    
    var text = xhttp.responseText.split('\n');
    xhttp.responseText = null;
    
    var node = Math.floor(Math.random()*text.length);
    text[node] = text[node].trim();
    
    response = text[node].split('');
    console.log(response);
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

function core() {                   // Recherche lettre
    
    var x = event.target.innerHTML;
    console.log(x);
    
     /*for (var i=0; i<response.length; i++) {
        var y = response.indexOf(x, i);
        console.log(y);
        
        if (y == -1) {
            suppressionLettre(x);
        }else{
            affichageTableau(y);
            suppressionLettre(x);
        }
        
    }*/
    
    var z = 0;
    var i = 0;
    
    while (i < response.length) {
        i++
        var y = response.indexOf(x, z);
        
        if (y != -1) {
            affichageTableau(x);
            suppressionLettre(y);
            z = y;
        }
        
        if (y == -1) {
            suppressionLettre(y);
        }
    }    
}

function affichageTableau(y) {          // Affichage lettre dans 'affichageMot' + win
    
    var tableau = document.getElementById('affichageMot').getElementsByTagName('td');
    console.log(tableau.length);
    console.log(response);
    tableau[y].innerHTML = response[y];
    count++;
    console.log(count);
    if (count == tableau.length) {
        console.log('GAGNE');
    }
    
    
}

function suppressionLettre(x) {                 // Suppresion lettre dans 'table'
    
    var tableau = document.getElementById('table').getElementsByTagName('td');
    
    for (var i=0; i<tableau.length; i++) {
        if (tableau[i].innerHTML == x) {
            tableau[i].innerHTML = ' ';
        }
    }
}
