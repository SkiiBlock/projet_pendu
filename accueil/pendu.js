	console.log("Chargement de Js : OK "); //Test du JavaScript

function supprimer(supp, objet_id){  
	
 	var elem=document.getElementById(supp);
	//obj.style.width = '0px';
	elem.style.display = 'none';
	
	var elem=document.getElementById(supp+1)
	elem.style.display = 'none';
	
	var elem=document.getElementById(supp+2)
	elem.style.display = 'none';
	
	afficher(objet_id);
}

function afficher(objet_id){
	
	console.log("Le niveau de difficulté est : " + objet_id);
	
}


	
	
	
	/*if (obj.style.display == 'inline-block') {
		obj.style.display='none'
	}else{
		obj.style.display='block'
	}*/

