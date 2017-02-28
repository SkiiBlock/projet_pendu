function requestXML(url, categorie) { //fonction => request un mot dans le XML
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            reponseXML(this, categorie);
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send();
}

function reponseXML(xhttp, categorie) {
    
    var i = Math.floor(Math.random() * 6)
    var xml = xhttp.responseXML.getElementsByTagName(categorie)[0].getElementsByTagName('mot')[i].childNodes[0].nodeValue;
    
    console.log(xml);
    
    var mot = xml.split('');
    
    console.log(mot);
    
}
