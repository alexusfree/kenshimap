"use strict";
L.Control.Coordinates=L.Control.extend({options:{
			position:'bottomleft',latitudeText:'x',longitudeText:'y',promptText:'Нажмите Ctrl+C чтобы скопировать координаты',precision:4},
initialize:function(options)
{L.Control.prototype.initialize.call(this,options);
},onAdd:function(map)
{var className='leaflet-control-coordinates',that=this,container=this._container=L.DomUtil.create('div',className);
this.visible=false;
L.DomUtil.addClass(container,'hidden');
L.DomEvent.disableClickPropagation(container);
this._addText(container,map);
L.DomEvent.addListener(container,'click',function(){var lat=L.DomUtil.get(that._lat),lng=L.DomUtil.get(that._lng),latTextLen=this.options.latitudeText.length+1,lngTextLen=this.options.longitudeText.length+1,latTextIndex=lat.textContent.indexOf(this.options.latitudeText)+latTextLen,lngTextIndex=lng.textContent.indexOf(this.options.longitudeText)+lngTextLen,latCoordinate=lat.textContent.substr(latTextIndex),lngCoordinate=lng.textContent.substr(lngTextIndex);
//var x_temp =latCoordinate.toFixed(1);
//var y_temp =lngCoordinate.toFixed(1);
var x_temp =Math.round(latCoordinate * 10) / 10;
var y_temp =Math.round(lngCoordinate * 10) / 10;
window.prompt(this.options.promptText,'x:'+x_temp+', y:'+y_temp);
},this);
return container;
},_addText:function(container,context)
{this._lat=L.DomUtil.create('span','leaflet-control-coordinates-lat',container),this._lng=L.DomUtil.create('span','leaflet-control-coordinates-lng',container);
return container;
},setCoordinates:function(obj)
{if(!this.visible){L.DomUtil.removeClass(this._container,'hidden');
}
if(obj.latlng){L.DomUtil.get(this._lat).innerHTML='<strong>'+this.options.latitudeText+':</strong> '+obj.latlng.lat.toFixed(this.options.precision).toString();
L.DomUtil.get(this._lng).innerHTML='<strong>'+this.options.longitudeText+':</strong> '+obj.latlng.lng.toFixed(this.options.precision).toString();
}}});
