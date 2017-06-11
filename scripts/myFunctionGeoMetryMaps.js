//google.maps.MapTypeId.ROADMAP : definit le type de carte à afficher , ici ROADMAP le mode plan
//SATELLITE pour les photos satellite
//HYBRID pour afficher les photos satellites avec le plan superposé
//TERRAIN pour afficher les reliefs

var previousPosition=null;	
var markers=[];
var marker;
function initialize()
{
  map=new google.maps.Map(document.getElementById("map_canvas"),{
                          zoom:13,
						  center:new google.maps.LatLng(5.3150298,-4.0172704),
						  mapTypeId:google.maps.MapTypeId.ROADMAP
  });
  //----using html5
  
  if(navigator.geolocation)
  {
	 /* 
     var watchId=navigator.geolocation.watchPosition(successCallback,
												      null,
													  {enableHighAccuracy:true}
													  );
	*/
	var watchId=navigator.geolocation.getCurrentPosition(successCallback,
												      null,
													  {enableHighAccuracy:true}
													  );
  }
  else
    alert("Votre navigateur ne prend pas en compte la geolocalisation HTML 5");
  
}

function successCallback(position)
{

//Afin de ne jamais prendre en compte les coordonnées imprécises du Wifi et de la 3G sans GPS, 
//il nous suffit donc d'ajouter un seuil de précision minimal en mètres qui va englober tout le contenu du successCallback.
//-if(position.coords.accuracy < 100)
//map.panTo :permet de centrer la carte sur de nouvelles coordonnées
   map.panTo(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
   //afin de representer la position exacte, ns utilisons un marqueur
   /*
   var marker=new google.maps.Marker({
									position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
									map: map});
									
									
			
	//plusieurs markeurs sur la map
	var marker2=new google.maps.Marker({
									position: new google.maps.LatLng("5.336035","-4.002577"),
									map: map});		
			
			*/
	//gestion des marqueurs via un tableau	
	addMarker(position.coords.latitude,position.coords.longitude);
	addMarker("5.336035","-4.002577");
	addMarker("5.359205","-3.979027");
	
	//---------------------------------------
    //---circle 
	var myCircle=new google.maps.Circle({
		//center : new google.maps.LatLng(-33.87365, 151.20689),
		center :new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
		radius : 5000,//rayon de 5km
		strokeColor :"#3498DB" ,
		fillColor : "#FFFF00"
    });
	myCircle.setMap(map);
	/*
	Circle circle=map.addCircle(new CircleOptions()
								.center(new LatLng(-33.87365, 151.20689))
								.radius(1000)
								.strokeColor(Color.Red)
								.fillColor(Color.Blue));
								*/
			
   // alert(previousPosition);
	//alert(position.coords.longitude);
	previousPosition=new google.maps.LatLng(5.298601,-3.986418); //--coordonnes Cap Sud
	 
	var otherPosition=new google.maps.LatLng(5.356442,-3.967083); //coordonnes cap nord
    if(previousPosition)
   {	
			//trace du parcours
			/*
			var newLineCoordinates=[
								 new google.maps.LatLng(previousPosition.coords.latitude,previousPosition.coords.longitude),
								 new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
			];
			*/
			//--pr tests
				var newLineCoordinates=[
								 previousPosition,
								 new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
								 ,otherPosition
			];
			//-un polyline est une ligne tracee entre plusieurs points
			var newLine=new google.maps.Polyline({
				   path	:newLineCoordinates,//--il sagit d'un tableau de coordonnées
				   strokeColor: "#FF0000",
				   strokeOpacity: 1.0,
				   strokeWeight:2
			
			
			
			});			
			//ajout du trace sur la carte
			newLine.setMap(map);			
	}
	
	previousPosition=position;
	
}

function addMarker(lat,lng)
{
	marker=new google.maps.Marker({
		position:new google.maps.LatLng(lat,lng),
		map:map
	});
	markers.push(marker);
}
