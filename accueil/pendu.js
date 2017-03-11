console.log("Chargement de Js : OK "); //Test du JavaScript


/*function supprimer(supp, objet_id){                        --- FONCTION FAIRE DISPARAITRE BOUTONS ---
	
 	var elem=document.getElementById(supp);
	//obj.style.width = '0px';
	elem.style.display = 'none';
	
	var elem=document.getElementById(supp+1)
	elem.style.display = 'none';
	
	var elem=document.getElementById(supp+2)
	elem.style.display = 'none';
	
	afficher(objet_id);
}*/


function afficher(id){                                /* -- Fonction affichage theme -- */
	
	console.log("Niveau selectionné : " + id);

	for (var i = 1; i < 4; i++){
		
		
        var elem2=document.getElementById("themesDifficulte"+ i);
		elem2.style.display = 'none';
		elem2.style.width = "0px" ;
		
	}
	
	var elem=document.getElementById("themesDifficulte"+ id);
	elem.style.display = 'flex';
	elem.style.width = "500px" ;

	
}
