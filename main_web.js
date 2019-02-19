var src_layer= [['City','Города'],
		['Village','Поселки'],
		['Ruins','Руины'],
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
var terrainSize = 8192;
var CellSize = 1000;
var centerMap= [500,500];
var terrainCorners = [[0,0],[1000, 1000]];
L.CRS.Map = L.extend({}, L.CRS.Simple, {transformation: new L.Transformation(0.256, 0, -0.256, 256)});	
//// base maps

var layerBaseMap = L.tileLayer("http://kenshimap.my1.ru/map/{z}/{x}/{y}.jpg", {
    minNativeZoom: 0,
    maxNativeZoom: 5,
    noWrap: true,
    continuousWorld: true,
});

var layerBaseMapLoc = L.tileLayer("http://kenshimap.my1.ru/map/l{z}/{x}/{y}.jpg", {
    minNativeZoom: 1,
    maxNativeZoom: 5,
    noWrap: true,
    continuousWorld: true,
});

var baseMaps = { 
	"Карта с локациями": layerBaseMapLoc,            
	'"Чистая" карта': layerBaseMap,
};
			 
var map = L.map('map', {
    crs: L.CRS.Map,
    minZoom: 0,
    maxZoom: 5,
    //layers: enabled_layers,
	layers: [layerBaseMapLoc, layer["City"]],
    Bounds: terrainCorners,
    maxBounds: terrainCorners,
    attributionControl: false,
    //zoomSnap: 0.5,
    //zoomDelta: 0.5,
	zoom: 1,center:centerMap,
});
map.fitBounds(terrainCorners);
var hash = new L.Hash(map);


L.control.layers(baseMaps, overlays).addTo(map);

var arr_markers = [
{type:'City', x:566, y:386, nameRU:'Плохие зубы',		name:'Bad Teeth',	title:'<i>Святая Нация</i><br>хорошо защищенный город, который можно отыскать на горном перевале «зеленой» зоны Гордость Окрана.'}, 
{type:'City', x:646, y:373, nameRU:'Бугристый Холм',	name:'Blister Hill',title:'<i>Святая Нация</i><br>крупный населенный пункт, находящийся на северо-востоке центральной области мира и способный похвастаться большим количеством различных магазинов.'}, 
{type:'City', x:542, y:309, nameRU:'Стопка',			name:'Stack',       title:'<i>Святая Нация</i><br>большое поселение, которое базируется в юго-восточной области центральной части мира на границе фракции. Находится неподалеку от Хаба и Западного Улья, поэтому является неплохим местом для воров и торговцев.'}, 
{type:'City', x:447, y:197, nameRU:'Адмаг',				name:'Admag',		title:'<i>Королевство Шеков</i><br>столица фракции, находящаяся в северной области региона Пустыня Стенна, прямо на возвышенности. Здесь можно отыскать башню Гильдии Воров.'}, 
{type:'City', x:442, y:287, nameRU:'Скуин',				name:'Squin',		title:'<i>Королевство Шеков</i><br>можно отыскать в западной области Пограничной Зоны. В нем имеются бары и базовые магазины. Здесь имеются сравнительно безопасные месторождения меди и железа.'}, 
{type:'City', x:109, y:228, nameRU:'Выдержка Скитальца',name:'Drifter’s Last',title:'<i>Союзные города</i><br>находится в юго-западной области мира в регионе под названием Крюк. Рядом с ним можно найти фермы, из-за которых в окрестностях часто встречаются фермеры-мятежники.'}, 
{type:'City', x:221, y:476, nameRU:'Катун',				name:'Catun',		title:'<i>Союзные города</i><br>находится в регионе под названием Поля Костей. Знаменит своим магазином оружия Катунских Мастеров.'}, 
{type:'City', x:187, y:291, nameRU:'Клаунстэди',		name:'Clownsteady',	title:'<i>Союзные города</i><br>Находится в юго-западной области мира на границе региона Южные болота.'}, 
{type:'City', x:869, y:798, nameRU:'Барк',				name:'Bark',		title:'<i>Союзные города</i><br>прибрежный населенный пункт, находящийся в районе, именуемом Великая пустыня.'}, 
{type:'City', x:480, y:710, nameRU:'Грань', 			name:'Brink',		title:'<i>Союзные города</i><br>можно отыскать в восточной области карты в регионе под названием Побережье Штормгапа.'}, 
{type:'City', x:819, y:682, nameRU:'Шо-Баттаи',			name:'Sho-Battai',	title:'<i>Союзные города</i><br>можно отыскать посередке Великой пустыни.'}, 
{type:'City', x:740, y:617, nameRU:'Стоат',				name:'Stoat',		title:'<i>Союзные города</i><br>расположен в юго-западной области Великой пустыни.'}, 
{type:'City', x:741, y:734, nameRU:'Груз',				name:'Heft',		title:'<i>Союзные города</i><br>столица фракции, расположенная на южной стороне Великой пустыни.'}, 
{type:'City', x:641, y:663, nameRU:'Хен',				name:'Heng',		title:'<i>Союзные города</i><br>укрепленный населенный пункт, основанный в районе Хен.'}, 
{type:'City', x:483, y:789, nameRU:'Черная Ссадина',	name:'Black Scratch',title:'<i>Техноохотники</i><br>находится в восточной области карты в Запределье. Она славится своей Большой библиотекой, в которой хранятся самые разнообразные чертежи и книги.'}, 
{type:'City', x:337, y:564, nameRU:'Ровная лагуна',		name:'Flats Lagoon',title:'<i>Техноохотники</i><br>находится в одноименном районе, к востоку от болота.'}, 
{type:'City', x:278, y:542, nameRU:'Траур',				name:'Mourn',		title:'<i>Техноохотники</i><br>полуразрушенное поселение, находящееся в районе Поля Костей. Тут обитает Большая Белая Горилла.'}, 
{type:'City', x:791, y:416, nameRU:'Край Мира',			name:'World’s End',title:'<i>Техноохотники</i><br>столица фракции, находящаяся в Руке Оркана. Знаменита своим университетом Машинистов, хранящим в себе разные артефакты и технологические вещи.'}, 
{type:'City', x:488, y:326, nameRU:'Хаб',				name:'The Hub',		title:'Разрушен, находится в западной области карты в регионе под названием Пограничье. Тут обитают различные преступники и изгои.'},
{type:'City', x:625, y:219, nameRU:'Безродный',			name:'Mongrel',		title:'можно найти в западной области карты в центральной части Туманных островов. Имеет немало магазинов с редкими товарами.'},
{type:'City', x:334, y:340, nameRU:'Акула',				name:'Shark',		title:'находится в Болотах и является пристанищем 5 разных банд.'},
{type:'City', x:288, y:679, nameRU:'Скачок',			name:'Spring',		title:'находится в регионе Авантюра Стоба. Тут обитают противники работорговли.'},

{type:'City', x:543, y:529, nameRU:'Черная пустыня',	name:'Black Desert City',title:'находится в центральной области Мертвых земель. Тут обитают скелеты.'},
{type:'City', x:875, y:289, nameRU:'Логово Людаедов',	name:'Canniball Capital',title:'находится'},
{type:'City', x:145, y:615, nameRU:'',					name:'Southern Hive',	title:'находится'},
{type:'City', x:87,  y:471, nameRU:'',					name:'Fish Lsle',		title:'находится'},
];
    for (var i = 0; i < arr_markers.length; i++) {
		var a = arr_markers[i];
		var fullname  = a.nameRU+' ('+a.name+')';
		var fullpop  = Icon[a.type].name+': '+a.nameRU+' ('+a.name+') ['+a.x+' ,'+a.y+']<br>'+a.title;
		L.marker([(a.x),a.y],{title:fullname,icon:Icon[a.type]} ).bindPopup(fullpop).addTo(layer[a.type]);
    };


//	Для Coordinates
	var c = new L.Control.Coordinates();
	c.addTo(map);
	function onMapClick(e) {c.setCoordinates(e);}
	map.on('click', onMapClick);	


