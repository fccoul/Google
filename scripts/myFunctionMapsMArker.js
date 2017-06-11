//var iconBase="C:/Users/FHCOULIBALY/Desktop/Search/Google/Map/Src/Imgs/";
var iconBase='https://maps.google.com/mapfiles/kml/shapes/';
var iconBasePerso='C:/Users/FHCOULIBALY/Desktop/Search/Google/Map/Src/Imgs/';
//url free icon marqueur
//https://www.iconfinder.com/search/?q=map&maximum=32&price=free
/*
Geocoding is the process of converting addresses (like "1600 Amphitheatre Parkway, Mountain View, CA") 
into geographic coordinates (like latitude 37.423021 and longitude -122.083739), which you can use to place markers or position the map.
Reverse geocoding is the process of converting geographic coordinates into a human-readable address. 
The reverse geocoder also lets you find the address for a given place ID.

Before using the Geocoding service in the Google Maps JavaScript API, first ensure that the Google Maps Geocoding API is enabled in the Google API Console, 
in the same project you set up for the Google Maps JavaScript API.
*/
var geocoder;
var icons={
	parking:{icon:iconBase+'parking_lot_maps.png'},
	library:{icon:iconBase+'library_maps.png'},
	info:{icon:iconBase+'info-i_maps.png'}
	//
	,persoRed:{icon:iconBasePerso+'1.png'}
	,persoBlue:{icon:iconBasePerso+'3.png'}
};
var marker;
var markers=[];
var map;
var features;
var labels='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex=0;
var infoWindow;
var service;
function initialize()
{
	var myLatLng=new google.maps.LatLng(5.3150298,-4.0172704);
	var placeInit=new google.maps.LatLng(5.356121,-3.966640);
	//--map est  La classe JavaScript qui représente une carte 
	       map=new google.maps.Map(document.getElementById('map_canvas'),{
		       center:{lat:5.356121,lng:-3.966640},
			   //center:new google.maps.LatLng(5.3150298,-4.0172704),
			   zoom: 13,
			   mapTypeId:google.maps.MapTypeId.ROADMAP
			   //ROADMAP : plan classique,sans image satellite , ni relief
			   //SATELLITE pour les photos satellite
			   //HYBRID pour afficher les photos satellites avec le plan superposé
			   //TERRAIN pour afficher les reliefs
		   });
	  
	  infoWindow=new google.maps.InfoWindow();
	 
	 //---geocodeing...
	  geocoder=new google.maps.Geocoder;
	  
	  
	   //---tour eiffel
			//var tourEiffel=new google.maps.LatLng(48.858262, 2.292519);
	  features=[
		 {
			
			 position:new google.maps.LatLng(5.3150298,-4.0172704),
			 //position:tourEiffel,
			 type:'info'
			 ,title:'Job IT'
		 },
		 {
			 //position:new google.maps.LatLng(5.356121,-3.966640),
			 position:new google.maps.LatLng(5.3555496,-3.9665173999999297),//Cap NORD
			 type:'parking'
			  
		 },
		 {
			 position:new google.maps.LatLng(5.373453,-3.999598),
			 type:'persoRed'
			  
		 },
		 {
			 position:new google.maps.LatLng(5.371413,-3.990350),
			 type:'library'
			 ,title:''
		 },
		 {
			 position:new google.maps.LatLng(5.335991,-3.962680),
			 type:'persoBlue'
			 ,title:'Ivoire Golf Club' 
		 },
	 ];
	 
	//---place
	  service=new google.maps.places.PlacesService(map);
	  service.nearbySearch({
		  location:placeInit,
		  radius:500,
		  type :['store']//['store'] //url https://developers.google.com/places/supported_types
	  },callback);
	 
	 //----envent mouseOver
	 /*
	  google.maps.event.addListener(marker,'mouseover',(function(marker)
					 {
						  //------------geocoding
					       //geocodeLatLng(geocoder,map,infoWindow);
						   //geocodeLatLng(geocoder,map,infoWindow,marker);
					      //-----------
						 
						 return function()
						 {
							 
							 
							 var content=contentElse;
							 infoWindow.setContent(content);
							 infoWindow.open(map,marker);
							 
						 }
						 
					 })(marker));*/
	 /*
	marker=new google.maps.Marker({
		position:myLatLng,
		map:map
	});
	*/
	/*
	marker=new google.maps.Marker({
		position:new google.maps.LatLng(5.3150298,-4.0172704),
		map:map
	});
	*/
	/*
	console.log('ok');
	var icon=iconBase+'1.jpg';
	addMarker(5.3150298,-4.0172704,map,icon);
	icon=iconBase+'2.jpg';
	addMarker(5.356121,-3.966640,map,icon);	
	icon=iconBase+'1.png';
	addMarker(5.373453,-3.999598,map,icon);	
	icon=iconBase+'7.jpg';
	addMarker(5.371413,-3.990350,map,icon);
	*/
	

}

function callback(results,status)
{
	if(status===google.maps.places.PlacesServiceStatus.OK)
	{
		var Place='no name';
		 console.log(results);
		for(var i=0;i<results.length;i++)
		{
		  console.log(results[i].name +"coordenates : "+results[i].geometry.location);
		  //if(features.position)
			//Place= results[i].name;
		}
		
		//-------------
		 //---create markers
			 features.forEach(function(feature)
			 {
				 var marker=new google.maps.Marker({
					 position:feature.position,
					 icon:icons[feature.type].icon,
					 map:map
					 ,title:feature.title //---info bulle...
					 
				 });
				 // To add the marker to the map, call setMap();
				 //marker.setMap(map);
				 //----masquer dun marqueur de la carte...
					   //if(feature.title!='Job IT')
					   //marker.setMap(null);
				 //------utilie pour fction click button...
				 markers.push(marker);
				 
				 //infoWindows
				    //place services
					
					//--findIndex : recherche l'index de la valeur dans un tableau d'elemnt
					//var indexPlace=results.findIndex(x=>x.geometry.location.lat()=='5.3555496');
					var indexPlace=results.findIndex(x=>x.geometry.location.lat()==feature.position.lat() && x.geometry.location.lng()==feature.position.lng());
					console.log(feature.position.lat()+"---"+feature.position.lng());
					//console.log(results[0].geometry.location);
					console.log("la value de l'index :"+indexPlace);
					var PlaceName="no place name";
					if(indexPlace!=-1)
					{    
						PlaceName=results[indexPlace].name;
					}
					console.log(PlaceName);
					//else
						//PlaceName="no mame !";
					 
				 marker.addListener('mouseover',function(){geocodeLatLng(geocoder,map,infoWindow,marker,PlaceName)});
				 //geocodeLatLng(geocoder,map,infoWindow,marker);
				 
			 
			 });
	}
}

function addMarker(lat,lng,map,icon)
{
	marker=new google.maps.Marker({
		position:new google.maps.LatLng(lat,lng),
		map:map,
		//customize icon marker
		//icon:"https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png"
		icon:icons[library].icon 
		
	});
	markers.push(marker);
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers()
{
	setMapOnAll(null);
}

function addMarkerLocation(tabLocation)
{
	var i=0;
	tabLocation.forEach(function(location)
	 {
        //--------affiche de marqueur item by item avec le timeOut...
		i++;
			setTimeout(function()
			{		
				marker=new google.maps.Marker({
				position:location.position,
				map:map,
				label:'KP',
				//Animation 	
				//DROP indique que le marqueur devrait tomber du haut de la carte à son emplacement final (generalement utilisé a la creation du marqueur)
				//BOUNCE indique que le marqueur devrait rebondir en place.jusqu'à ce que sa propriété d'animation soit explicitement définie comme nulle.
				//animation:google.maps.Animation.BOUNCE
				animation:google.maps.Animation.DROP
				//,draggable:true //---possiblite de deplacer le marqueur sur la carte...
				 });
				 if(location.title=='Ivoire Golf Club')
				 { marker.setDraggable(true);
				  
				  //--affiche un popup window(text ou images) pour infos complementaire sur un marqueur par ex...
				  var contentstring=getInfoMarker(marker);
				  /*
				  infoWindow=new google.maps.InfoWindow({
									content:contentstring,
									,maxWidth: 200,
									position:marker.getPosition()
				                 });	
								 */

                  //--------animation			 	
                  //marker.addListener('click',toggleBounce);	
                     google.maps.event.addListener(marker,'click',(function(marker)
					 {
						 
						 return function()
						 {
							 toggleBounce(marker);
							 var content=contentElse;
							 infoWindow.setContent(contentstring);
							 infoWindow.setOptions({maxWidth:230});
							 //infoWindow.open(map,this);
							 infoWindow.open(map,marker);
						 }
					 })(marker));				  
				 }
				 else
				 {
					
					 //console.log(marker.getPosition());
					 var contentElse='<p>mes coordonnées : '+marker.getPosition()+'</p>';
					  google.maps.event.addListener(marker,'mouseover',(function(marker)
					 {
						  //------------geocoding
					       //geocodeLatLng(geocoder,map,infoWindow);
						   //geocodeLatLng(geocoder,map,infoWindow,marker);
					      //-----------
						 
						 return function()
						 {
							 var content=contentElse;
							 infoWindow.setContent(content);
							 infoWindow.open(map,marker);
						 }
						 
					 })(marker));
					 /*
					 infoWindow=new google.maps.InfoWindow({
									content:contentElse
										 
					 });
					  
					 if(infoWindow==null)
					    infoWindow=new google.maps.InfoWindow();
					 infoWindow.setContent(contentElse);
					 */
					 //infoWindow.setPosition(marker.getPosition());
				                 	
					marker.setLabel(labels[labelIndex++ % labels.length]);
					
					/*
					marker.addListener('click',function(){
						alert('no ivoire golf');
						infoWindow.open(map,marker);
					});
					*/
				 }
				 markers.push(marker);
			},i*200);
	 });
	 console.log('tableau regeneré :' +markers.length);
	
}
 
//function toggleBounce()
function toggleBounce(marker)
{

	if(marker.getAnimation()!=null)
	{
		console.log("OK");
		marker.setAnimation(null);
		//--OK
		 infoWindow.close();
	}
	else
	{
		console.log("KO - failed");
		marker.setAnimation(google.maps.Animation.BOUNCE);
		
		//alert('ah bon');
		// infoWindow.open(map,marker);
	}
}
//Shows any markers currently in the array.
function showMarkers()
		{
			console.log(markers.length);
			if(markers.length==0)
				addMarkerLocation(features);
			setMapOnAll(map);
		}
		
//Deletes all markers in the array by removing references to them.
function deleteMarkers()
{
	clearMarkers();//on les reture de la carte
	markers=[];//on vide le tableau de markeurs....
	console.log(markers.length);
}

// Sets the map on all markers in the array.
function setMapOnAll(map)
{
	for	(var i=0;i<markers.length;i++)
	{
		markers[i].setMap(map);
	}
}

function getInfoMarker(marker)
{
	var ContentString='<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">infos Kpleus</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Rivira 4</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: FCO, coordonnées GPS :'+marker.getPosition()+' </p>'+
            '</div>'+
            '</div>';
return ContentString;
}

//function geocodeLatLng(geocoder,map,infowindow)
function geocodeLatLng(geocoder,map,infowindow,marker,PlaceName)
{
	var latlng=marker.getPosition();
  geocoder.geocode({'location':latlng},function(results,status)
	  {
		  if(status==='OK')
		  {
			   var contentElse='<p>mes coordonnées : '+marker.getPosition()+'</p>';
			   var PlaceUser='<p>'+PlaceName+'</p>';
			  if(results[1])
			  {
				  console.log(results[1].formatted_address);// adresse de l'emplacment...
				  infoWindow.setContent(PlaceUser+results[1].formatted_address + contentElse);
				  infowindow.open(map,marker);
			  }
			  else
			  {
				  infoWindow.setContent('sorry, aucune adresse trouvée'); 
			  }
		  }
		  else
		  {
			  console.log('Geocoder failed due to : '+status);
			  alert('Geocoder failed due to : '+status);
		  }
	  });		  
}

