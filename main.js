var src_layer= [['City','Города'],
		['Village','Поселки'],
		['Ruins','Руины'],
		['RuinsLab','Руины библиотеки'],
		['Fort','Гарнизон'],
		['Mine','Шахты'],
		['Base','Базы']];
var layer = {};
var overlays = {};			
for (var i = 0; i < src_layer.length; i++) {
        var s = src_layer[i];	
	layer[s[0]] = new L.LayerGroup();
	overlays['<big>'+s[1]+'</big>'] = layer[s[0]];
 };			

	
//// Map config
var tileRes = 256;
//var terrainSize = 8192;
var CellSize = 1000;
var centerMap= [500,500];
var terrainCorners = [[0,0],[1000, 1000]];
L.CRS.Map = L.extend({}, L.CRS.Simple, {transformation: new L.Transformation(0.256, 0, -0.256, 256)});	
//// base maps
var layerBaseMapLoc		= L.tileLayer("map_loc/{z}/{x}/{y}.jpg", {
    minNativeZoom: 1,
    maxNativeZoom: 5,
    noWrap: true,
    continuousWorld: true,
	attribution: '<a href="https://t.me/alexusfree" target="_blank"> Телеграмм</a> | <a href="mailto:alexusfree@gmail.com?subject=Вопрос по карте Kenshi" target="_blank"> Почта</a>',
 });
var layerBaseMapZones	= L.tileLayer("map_zones/{z}/{x}/{y}.jpg", {
    minNativeZoom: 1,
    maxNativeZoom: 5,
    noWrap: true,
    continuousWorld: true,
	attribution: '<a href="https://t.me/alexusfree" target="_blank"> Телеграмм</a> | <a href="mailto:alexusfree@gmail.com?subject=Вопрос по карте Kenshi" target="_blank"> Почта</a>',
});
var layerBaseMapZonesTuvka = L.tileLayer("map_zone_tuvka/{z}/{x}/{y}.jpg", {
    minNativeZoom: 1,
    maxNativeZoom: 5,
    noWrap: true,
    continuousWorld: true,
	attribution: '<a href="https://t.me/alexusfree" target="_blank"> Телеграмм</a> | <a href="mailto:alexusfree@gmail.com?subject=Вопрос по карте Kenshi" target="_blank"> Почта</a>',
});

var layerBaseMapZones2 = L.tileLayer("map_zones_2/{z}/{x}/{y}.jpg", {
    minNativeZoom: 1,
    maxNativeZoom: 5,
    noWrap: true,
    continuousWorld: true,
	attribution: '<a href="https://t.me/alexusfree" target="_blank"> Телеграмм</a> | <a href="mailto:alexusfree@gmail.com?subject=Вопрос по карте Kenshi" target="_blank"> Почта</a>',
});

var layerBaseMapFertility = L.tileLayer("map_Fertility/{z}/{x}/{y}.jpg", {
    minNativeZoom: 0,
    maxNativeZoom: 5,
    noWrap: true,
    continuousWorld: true,
	attribution: '<a href="https://t.me/alexusfree" target="_blank"> Телеграмм</a> | <a href="mailto:alexusfree@gmail.com?subject=Вопрос по карте Kenshi" target="_blank"> Почта</a>',
});

var layerBaseMap		= L.tileLayer("map/{z}/{x}/{y}.jpg", {
    minNativeZoom: 0,
    maxNativeZoom: 5,
    noWrap: true,
    continuousWorld: true,
	attribution: '<a href="https://t.me/alexusfree" target="_blank"> Телеграмм</a> | <a href="mailto:alexusfree@gmail.com?subject=Вопрос по карте Kenshi" target="_blank"> Почта</a>',
});

var baseMaps = { 
	"Карта с локациями": layerBaseMapLoc,            
	'Карта с зонами': layerBaseMapZones,
	'Карта с зонами от Тувки': layerBaseMapZonesTuvka,
	'Карта с зонами от Обновленная': layerBaseMapZones2,
	'Карта плодородности': layerBaseMapFertility,
	'"Чистая" карта': layerBaseMap,
};
			 
var map = L.map('map', {
    crs: L.CRS.Map,
    minZoom: 0,
    maxZoom: 5,
    //layers: enabled_layers,
	layers: [layerBaseMapZonesTuvka, layer["City"], layer["Village"], layer["Fort"], layer["Mine"], layer["Base"]],
    Bounds: terrainCorners,
    maxBounds: terrainCorners,
    //attributionControl: false,
    //zoomSnap: 0.5,
    //zoomDelta: 0.5,
	zoom: 1,center:centerMap,
	fullscreenControl: true,
    fullscreenControlOptions: {position: 'topleft' },
});
//map.fitBounds(terrainCorners);
var hash = new L.Hash(map);

L.control.layers(baseMaps, overlays).addTo(map);





    for (var i = 0; i < arr_markers.length; i++) {
		var a = arr_markers[i];
		var fullname  = a.nameRU+' ('+a.name+')';
		//fullname = fullname+' ['+a.x+' ,'+a.y+']';
		var fullpop  = Icon[a.type].name+': '+a.nameRU+' ('+a.name+')<br>'+a.title;
		L.marker([(a.x),a.y],{title:fullname,icon:Icon[a.type]} ).bindPopup(fullpop).addTo(layer[a.type]);
    };
	

var layerSearch= L.layerGroup([
	layer["City"], layer["Village"], layer["Ruins"], layer["RuinsLab"], layer["Fort"], layer["Mine"], layer["Base"]]);
	
var controlSearch = new L.Control.Search({
		position:'topright',
		layer: layerSearch,		
//		layer: [overlays],
		initial: false,
		zoom: 5,
		marker: false,
		textErr: 'Место не найдено',
		textCancel: 'Сбросить',			
		textPlaceholder: 'Поиск…       ',	
	});
map.addControl( controlSearch );





//	Для Coordinates
	var c = new L.Control.Coordinates();
	c.addTo(map);
	function onMapClick(e) {c.setCoordinates(e);}
	map.on('click', onMapClick);	


