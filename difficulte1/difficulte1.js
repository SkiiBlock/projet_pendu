var response;       // création des variables globales nécessaire pour plusieurs fonctions
var coups = 0;
var pinTable = [];
var motTire = [];
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var bResponse = 0;

window.onload = load();
    
function load() {       // fonction utilisé pour initialiser le code et l'affichage
    
    /**** CREATION D'UN ALPHABET ****/
    
    console.log(alphabet);
    var tableau = document.getElementById('table');
    
    var ligne = tableau.insertRow(-1);      // insertRow() permet d'insérer une ligne
    for (var i=0; i<13; i++) {              // on ne met que les 13 premières lettres
        var colonne = ligne.insertCell();   // insertCell() permet d'insérer une colonne
        colonne.innerHTML += alphabet[i];
    }
    
    var ligne = tableau.insertRow(-1);      // on recommence pour une nouvelle ligne
    for (var i=13; i<26; i++) {             // on part maintenant de la 14e lettre
        var colonne = ligne.insertCell();
        colonne.innerHTML += alphabet[i];
    }
    
    /**** TEST DU NAVIGATEUR ****/
    
    var ua = navigator.userAgent;           // userAgent nous renvoie des informations sur le navigateur utilisé, stocké dans la variable 'ua'
    var x = ua.indexOf('Chrome');           // on cherche quel est le navigateur utilisé
    var y = ua.indexOf('Firefox');
    
    if (x != -1) {                          // indexOf() renvoie -1 lorsqu'il ne trouve pas le mot recherché (ici 'Chrome' ou 'Firefox')
        requestXML('difficulte1.xml');
    }
    
    if (y != -1) {
        var categorie = document.getElementById('info').innerHTML;
        requestText(categorie+'.txt');
    }
    
    var image = new Image();
    image.addEventListener('load', function() {
        var reduction = 1;
        var img = document.getElementById('img');
        var div = document.getElementById('div0');

        reduction = Math.max(image.width / (div0.clientWidth), image.height / (div0.clientHeight));
        img.src = image.src;
        img.width = Math.round(image.width / reduction);
        img.height = Math.round(image.height / reduction);
    });
                
    image.src = '../Image/reset.png';
}

function requestXML(url) {      /**** XMLHttpRequest (méthode #1) ****/
    
    var xhttp = new XMLHttpRequest();                           // création de la requête
    var categorie = document.getElementById('info').innerHTML;  // on récupère la catégorie de la page chargé
    
    xhttp.onreadystatechange = function() {     // .onreadystatechange vérifie si les variables vont changer
        if (this.readyState == 4 && this.status == 200) {
            reponseXML(xhttp, categorie);       // on lance la fonction réponse quand les variables ont changé et que la requête a réussi
        }
    }
    
    xhttp.open('GET', url, true);       // on ouvre la requête
    xhttp.send();                       // on envoie la requête
    
}

function requestText(url) {     /**** XMLHttpRequest (méthode #2) ****/
    
    var xhttp = new XMLHttpRequest();
    var categorie = document.getElementById('info').innerHTML;
    
    xhttp.onreadystatechange = function() {     
        if (this.readyState == 4 && this.status == 200) {
            responseText(this);         // on change ici la fonction réponse car on récupère du texte
        }
    }
    
    xhttp.open('GET', url, true);
    xhttp.send();
    
}

function reponseXML(xhttp, categorie) {     /**** RECUPERATION REPONSE ****/
      
    var i = Math.floor(Math.random() * 18)       // on tire un nombre aléatoire entre 0 et le nombre de mot maximum
    var xml = xhttp.responseXML.getElementsByTagName(categorie)[0].getElementsByTagName('mot')[i].childNodes[0].nodeValue;                  // on récupère un mot de la liste en fonction du nombre tiré
     
    response = xml.split('');        // .split('') permet de couper le mot entre chaque lettre
                                    // on enregistre le mot tiré dans la variable globale 'response'
    
    if (motTire.length == 18) {
        finDuJeu();
    }
    
    var x = 0;
    while (x<motTire.length) {      // on lance la fonction pour tester chaque entrée de la variable en fonction de sa longueur
        if (motTire[x] == xml) {    // on regarde si le mot tiré a déjà été tiré
            requestXML('difficulte1.xml');
        }
        x++;
    }
    
    var y = motTire.indexOf(xml);
    if (y == -1) {      // on enregistre le mot tiré uniquement s'il n'a pas déjà été tiré
        motTire.push(xml);
    }
    
    tableau(response);       // on lance la fonction avec le mot tiré
    console.log(motTire);
}

function responseText(xhttp) {              /**** RECUPERATION REPONSE ****/
    
    var text = xhttp.responseText.split('\n');
    xhttp.responseText = null;
    
    var i = Math.floor(Math.random()*text.length);
    text[i] = text[i].trim();
    
    response = text[i].split('');
    
    if (motTire.length == 18) {
        finDuJeu();
    }
    
    var x = 0;
    while (x<motTire.length) {
        if (motTire[x] == text[i]) {
            requestText('ecole.txt');
        }
        x++;
    }
    
    var y = motTire.indexOf(text[i]);
    if (y == -1) {
        motTire.push(text[i]);
    }
    
    tableau(response);
    console.log(motTire);
}

function tableau(mot) {     /**** CREATION TABLEAU ****/
    
    var tableau = document.getElementById('affichageMot');
    tableau.deleteRow(-1);      // deleteRow() permet de supprimer une ligne
    var ligne = tableau.insertRow(-1);
    
    for (var i=0; i<mot.length; i++) {          // on insère une colonne vide pour chaque lettre du mot
        var colonne = ligne.insertCell(i);
        colonne.innerHTML = '';
    }
}

function grabId(e) {
    var e = window.event || e;              // on utilise deux méthodes pour récupérer l'élément cliqué
	var targ = e.target || e.srcElement;
    
    var x = targ.innerHTML;
    var y = 0;
    
    pinTable = [];
    var a = response.indexOf(x, 0);
    var b = 0;
    
    for (var i=0; i<26; i++) {
        if (x == alphabet[i]) {
            if (a == -1) {
                suppressionLettre(x);
                coups++;
                
                
                
                var image = new Image();
                image.addEventListener('load', function() {
                    var reduction = 1;
                    var img = document.getElementById('img');
                    var div = document.getElementById('div0');

                    reduction = Math.max(image.width / (div0.clientWidth), image.height / (div0.clientHeight));
                    img.src = image.src;
                    img.width = Math.round(image.width / reduction);
                    img.height = Math.round(image.height / reduction);
                });
                
                image.src = '../Image/' + coups + '.png';
                
                if (coups == 9) {loose();}                
            }
    
            while (b<response.length) {
        
                var a = response.indexOf(x, b);
        
                if (a != -1) {
                    pinTable.push(a);
                    b = a + 1;
                }
        
                if (a == -1) {
                    b = response.length;
                }
            }
            suppressionLettre(x);
            affichageTableau();
        }
    }
}

function affichageTableau(y) {          // Affichage lettre dans 'affichageMot' + win

    var c = 0;
    
    while (c<pinTable.length) {
        
        var x = pinTable[c];
        
        var tableau = document.getElementById('affichageMot').getElementsByTagName('td');
        tableau[x].innerHTML = response[x];
    
        var z = [];
        for (var i=0; i<tableau.length; i++) {
            z.push(tableau[i].innerHTML);     
        }
    
        var a = response.toString();
        var b = z.toString();
    
        if (a == b) {
            win();
        }
        
        c++;
        
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
        
        coups = 0;
        pinTable = [];
        response = [];
        bResponse++;
    
        tableau.deleteRow(-1);
        tableau.deleteRow(-1);
        load();
        
    }, 2000);
}

function loose() {
    console.log("Tu n'as pas trouvé le mot !");
    setTimeout(function reset() {
        var tableau = document.getElementById('table');
        
        coups = 0;
        pinTable = [];
        response = [];
    
        tableau.deleteRow(-1);
        tableau.deleteRow(-1);
        load();
        
    }, 2000);
}

function finDuJeu() {
    alert('GG');
    console.log("Tu as "+ bResponse +" bonnes réponses sur 18")
}
