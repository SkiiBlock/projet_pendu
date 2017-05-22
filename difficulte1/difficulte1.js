    /**** VARIABLES GLOBALES ****/
var response;
var coups = 0;
var pinTable = [];
var motTire = [];
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var bResponse = 0;
var interval = null;
var corrige = [];

window.onload = load();     // fonction lancé au chargement de la page
    
function load() {       // fonction utilisé pour initialiser le code et l'affichage
    
    /**** CREATION D'UN ALPHABET ****/
    var tableau = document.getElementById('table');     // on récupère l'ID du tableau
    
    var ligne = tableau.insertRow(-1);      // insertRow() permet d'insérer une ligne
    for (var i=0; i<13; i++) {
        var colonne = ligne.insertCell();   // insertCell() permet d'insérer une colonne
        colonne.innerHTML += alphabet[i];
    }
    
    var ligne = tableau.insertRow(-1);      // on recommence pour une nouvelle ligne
    for (var i=13; i<26; i++) {
        var colonne = ligne.insertCell();
        colonne.innerHTML += alphabet[i];
    }
    
    /**** TEST DU NAVIGATEUR ****/
    if (motTire != 20) {
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
    }
    
    /**** AFFICHAGE EMPLACEMENT IMAGE ****/
    var image = new Image();        // on créé une nouvelle image js 
    image.src = '../Image/reset.png';
    
    image.addEventListener('load', function() {
        var reduction = 9;      // coefficient réducteur pour l'image
        var img = document.getElementById('img');       // on récupère l'ID de l'image (html)
        
        img.src = image.src;        // on applique l'image, puis les réductions
        img.width = Math.round(image.width / reduction);
        img.height = Math.round(image.height / reduction);
    });
                
    
}

function requestXML(url) {      /**** XMLHttpRequest (méthode #1) ****/
    
    var xhttp = new XMLHttpRequest();                           // création de la requête
    var categorie = document.getElementById('info').innerHTML;  // on récupère la catégorie de la page chargé
    
    xhttp.open('GET', url, true);       // on ouvre la requête
    xhttp.send();                       // on envoie la requête
    
    xhttp.onreadystatechange = function() {     // .onreadystatechange vérifie si les variables vont changer
        if (this.readyState == 4 && this.status == 200) {
            reponseXML(xhttp, categorie);       // on lance la fonction réponse quand les variables ont changé et que la requête a réussi
        }
    }    
}

function requestText(url) {     /**** XMLHttpRequest (méthode #2) ****/
    
    var xhttp = new XMLHttpRequest();
    var categorie = document.getElementById('info').innerHTML;
    
    xhttp.open('GET', url, true);
    xhttp.send();
    
    xhttp.onreadystatechange = function() {     
        if (this.readyState == 4 && this.status == 200) {
            responseText(this);         // on change ici la fonction réponse car on récupère du texte
        }
    }
}

function reponseXML(xhttp, categorie) {     /**** RECUPERATION REPONSE (méthode #1) ****/

    var r = Math.floor(Math.random() * 20)       // on tire un nombre aléatoire entre 0 et le nombre de mot maximum
    var xml = xhttp.responseXML.getElementsByTagName(categorie)[0].getElementsByTagName('mot')[r].childNodes[0].nodeValue;                  // on récupère un mot de la liste en fonction du nombre tiré
    
    if (motTire.indexOf(xml) != -1) {       // on vérifie si le mot a déjà été tiré
        requestXML('difficulte1.xml')
    }else{
        motTire.push(xml);
    }
    
    if (motTire.length == 11) {                 // si la liste est de 10 mots, on lance la fin du jeu
        finDuJeu();
    }
    
    response = xml.split('');       // on découpe le mot tiré
    tableau(response);       // on lance la fonction avec le mot tiré
}

function responseText(xhttp) {              /**** RECUPERATION REPONSE (méthode #2) ****/
    
    var text = xhttp.responseText.split('\n');  // on récupère la liste de mot    
    var i = Math.floor(Math.random()*text.length);
    var t = text[i].trim(); // .trim() supprime les espaces
    
    
    if (motTire.indexOf(t) != -1) {
        requestText(categorie+'.txt');
    }else{
        motTire.push(t);
    }
    
    if (motTire.length == 11) {                 // si la liste est de 10 mots, on lance la fin du jeu
        finDuJeu();
    }

    response = t.split('');
    tableau(response);
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

function grabId() {    /**** RECUPERATION LETTRE ****/
    var e = window.event || e;            // on utilise deux méthodes pour récupérer l'élément cliqué
	var targ = e.target || e.srcElement;   // .target fait référence à l'objet
    
    var x = targ.innerHTML;
    rechercheLettre(x);
    
    var audio = new Audio('../Image/2006.mp3');
    audio.play();
}

window.onkeydown = function(e) {        /**** RECUPERATION LETTRE (CLAVIER) ****/
    var x = e.which;            // .which renvoie le code la touche
    var y = alphabet[(x-65)];       // on adapte le code à la variable alphabet
    rechercheLettre(y);
    
    var audio = new Audio('../Image/2006.mp3');
    audio.play();
}

function rechercheLettre(x) {       /**** RECHERCHE LETTRE DANS MOT TIRE ****/
    
    for (var i=0; i<26; i++) {      // on s'assure que le joueur a cliqué sur une lettre
        if (x == alphabet[i]) {
            if (response.indexOf(x, 0) == -1) {              // si la lettre n'est pas dans le mot...
                coups++;
                if (coups == 9) {loose();}
                
                /**** AFFICHAGE IMAGE ****/
                var image = new Image();
                image.src = '../Image/' + coups + '.png';   // on affiche l'image en fonction du nombre de coups ratés
                
                image.addEventListener('load', function() {
                    var reduction = 9;
                    var img = document.getElementById('img');
                    
                    img.src = image.src;
                    img.width = Math.round(image.width / reduction);
                    img.height = Math.round(image.height / reduction);
                });                
            }
            
            var b = 0;
            while (b<response.length) {     // la boucle while est importante : elle permet de trouver si la lettre tirée n'est pas plusieurs fois présente
                var a = response.indexOf(x, b);
                
                if (a != -1) {          // si on trouve la lettre dans le mot...
                    pinTable.push(a);   // .push(x) ajoute x à la fin du tableau
                    b = a + 1;          // on s'assure que la recherche se relancera après la lettre trouvé
                }
        
                if (a == -1) {              // si on ne trouve pas la lettre, on arrête la boucle
                    b = response.length;
                }
            }
            suppressionLettre(x);
            affichageTableau();
        }
    }
}

function affichageTableau() {       /**** AFFICHAGE LETTRE DANS TABLEAU ****/

    var c = 0;
    while (c<pinTable.length) {     // la boucle while est importante : elle permet d'écrire plusieurs fois la lettre tirée si elle est plusieurs fois présente
        
        var x = pinTable[c];
        
        var tableau = document.getElementById('affichageMot').getElementsByTagName('td');
        tableau[x].innerHTML = response[x];     // on écrit la lettre dans le tableau en fonction de sa place dans le mot
        
        /**** TEST MOT ****/
        var z = [];
        for (var i=0; i<tableau.length; i++) {      // on écrit dans l'array z les lettres trouvées par l'utilisateur
            z.push(tableau[i].innerHTML);
        }
    
        var a = response.toString();        // .toString() renvoie une chaîne de caractère
        var b = z.toString();
    
        if (a == b) {       // on compare les deux mots
            win();
        }
        c++;
    }
}

function suppressionLettre(x) {                 // Suppresion lettre dans 'table'
    
    var tableau = document.getElementById('table').getElementsByTagName('td');
    
    for (var i=0; i<tableau.length; i++) {
        if (tableau[i].innerHTML == x) {	// si la lettre tirée est égale à la lettre du tableau, on la supprime
            tableau[i].innerHTML = '';
        }
    }
}

function win() {	/**** MOT TROUVE ****/
    var textJS = document.getElementById('textJS');	// on récupère la zone de texte et on écrit
    textJS.innerHTML = "Tu as trouvé le mot !";
    textJS.style.color = 'green';
    
    setTimeout(function reset() {	// au bout de 2s, on lance la fonction
        var tableau = document.getElementById('table');		// on efface le tableau
        textJS.innerHTML = '';
        
        coups = 0;	// reset des variables
        pinTable = [];
        response = [];
        bResponse++;	// on ajoute 1 au nb de bonne réponse
    
        tableau.deleteRow(-1);
        tableau.deleteRow(-1);
        load();        // on relance la fonction 'load()'
    }, 2000);
    
    corrige.push('1');	// on ajoute 0 à l'array 'corrige'
    
    var audio = new Audio('../Image/2020.mp3');		// son de victoire
    audio.play();
    
    if (motTire.length == 20) {                 // si la liste est de 20 mots, on lance la fin du jeu
        finDuJeu();
    }
}

function loose() {	/**** MOT NON TROUVE ****/
    var textJS = document.getElementById('textJS');
    textJS.innerHTML = "Tu n'as pas trouvé le mot !";
    textJS.style.color = 'red';
    
    setTimeout(function reset() {
        var tableau = document.getElementById('table');
        textJS.innerHTML = '';
        
        coups = 0;
        pinTable = [];
        response = [];
    
        tableau.deleteRow(-1);
        tableau.deleteRow(-1);
        load();
    }, 2000);
    
    corrige.push('0');	// on ajoute 1 à l'array 'corrige'
    
    if (motTire.length == 20) {                 // si la liste est de 20 mots, on lance la fin du jeu
        finDuJeu();
    }
}

function finDuJeu() {	/**** FIN DE LA PARTIE ****/
    var x = document.getElementById('info').innerHTML;
    
    var textJS = document.getElementById('textJS');	// on récupère le nombre de bonne réponse et le thème et on l'affiche
    textJS.innerHTML = "Tu as terminé le thème " + x + '<br>';
    textJS.innerHTML += "Tu as "+ bResponse +" bonnes réponses sur 10";
    textJS.style.color = 'green';
    
    //console.log(motTire);
    interval = setInterval(affichageFinPendu, 2000);	// on lance la fonction 'affichageFinPendu' toutes les 2s
    
}

function affichageFinPendu() {
    var tableau = document.getElementById('affichageMot')//.getElementsByTagName('td');
    tableau.deleteRow(-1);
    
    var image = new Image();        // on créé une nouvelle image js 
    image.src = '../Image/9.png';
    
    image.addEventListener('load', function() {
        var reduction = 9;      // coefficient réducteur pour l'image
        var img = document.getElementById('img');       // on récupère l'ID de l'image (html)
        
        img.src = image.src;        // on applique l'image, puis les réductions
        img.width = Math.round(image.width / reduction);
        img.height = Math.round(image.height / reduction);
    });
    
    var table = document.getElementById('table');	// on efface le tableau alphabet
    table.deleteRow(-1);
    table.deleteRow(-1);
    
    var z = motTire[0].split('');	// on récupère le 1e mot de l'array et on le découpe
    var ligne = tableau.insertRow(-1);
    for (var i=0; i<z.length; i++) {	// on créé le tableau en fonction de la longueur du mot
        var colonne = ligne.insertCell(i);
        colonne.innerHTML = '';
    }
    var table = tableau.getElementsByTagName('td');	// on affiche le mot
    for (var i=0; i<table.length; i++) {
        table[i].innerHTML = z[i];
    }
	
    motTire.shift();	// on retire le mot de l'array
    
    var y = corrige[0];	// on récupère le code corrigé correspondant
    var x = document.getElementById('ecranJeu');
    
    if (y == 0) {	// si le corrige est 0, on affiche en rouge
        x.style.color = 'red';
    }
    
    if (y == 1) {	// si le corrige est 1, on affiche en vert
        x.style.color = 'green';
    }
    
    corrige.shift();	// on retire le nombre de l'array

    if (motTire.length == 0) {	// on arrête l'intervalle quand l'array est vide
        clearInterval(interval);
	    
	     document.getElementById("quitter").style.display = "inline";
	     document.getElementById("rejouer").style.display = "inline";
    }
}
