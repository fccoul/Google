function initMap()
	  {
	  //alert('hello');
	  //Deux options doivent obligatoirement être renseignées pour chaque carte : center et zoom.
	  //-les niveaux de zoom supérieurs >0 offrent une vue rapprochée à une résolution plus élevée.
	  //---niveaux de zoom
	  /*
	  1 : Le monde
5 : La masse continentale/le continent
10 : Ville
15 : Rues
20 : Immeubles
*/
//--map est  La classe JavaScript qui représente une carte 
	       var map=new google.maps.Map(document.getElementById('myMap'),{
		       center:{lat:5.356121,lng:-3.966640},
			   zoom: 14
		   });
	  }

$(document).ready(function () {
	//alert($("#txt").val());
	//alert("kpleus");
	
	 
});
	


	   
 
