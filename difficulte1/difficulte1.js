window.onload = function init() {
    
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

function requestXML(url) { //fonction => request un mot dans le XML
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            responseText(this);
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send();
}

/*function reponseXML(xhttp, categorie) {
    
    var i = Math.floor(Math.random() * 6)
    var xml = xhttp.responseXML.getElementsByTagName(categorie)[0].getElementsByTagName('mot')[i].childNodes[0].nodeValue;
    
    console.log(xml);
    
    var mot = xml.split('');
    
    console.log(mot);
    tableau(mot);
    
}*/

function responseText(xhttp) {
    
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

function tableau(mot) {
    
    var tableau = document.getElementById('affichageMot');
    tableau.deleteRow(-1);
    var ligne = tableau.insertRow(-1);
    
    for (var i=0; i<mot.length; i++) {
        var colonne = ligne.insertCell(i);
        colonne.innerHTML += mot[i].toUpperCase();
    }
}
