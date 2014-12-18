var Boat = function(data){
  this.userId = data.userId;
  this.positions = [];
  this.marker = L.Marker.moveableMarker([37, -122], 0).addTo(map);
}

Boat.prototype = {
  newPosition: function(data){
    this.positions.push({latLng: [data.lat, data.lng], timestamp: data.timestamp});
    if(this.positions.length > 3){
      var oldPos = this.positions[1]
        , newPos = this.positions[2]
      this.marker.move(oldPos.latLng, (newPos.timestamp - oldPos.timestamp));
      this.positions.shift();
    }
  }
}

L.Marker.MoveableMarker = L.Marker.extend({    
  initialize: function (startLatLng, options, feature) {    
    var marker_options = options.marker || {};

    if (jQuery.isFunction(marker_options)){        
        marker_options = marker_options(feature);
    }
      
    L.Marker.prototype.initialize.call(this, startLatLng, marker_options);
    
    this.popupContent = '';

    if (marker_options.getPopup){
      this.popupContent = marker_options.getPopup(feature);            
    }
    
    this.bindPopup(this.getPopupContent() + startLatLng.toString());
  },
  
  getPopupContent: function(){
    if (this.popupContent != ''){
      return '<b>' + this.popupContent + '</b><br/>'
    }
    
    return '';
  },

  move: function (latLng, transitionTime) {
    // Only if CSS3 transitions are supported
    if (L.DomUtil.TRANSITION) {
      if (this._icon) { 
        this._icon.style[L.DomUtil.TRANSITION] = 'all ' + transitionTime + 'ms linear'; 
        if (this._popup && this._popup._wrapper)
            this._popup._wrapper.style[L.DomUtil.TRANSITION] = 'all ' + transitionTime + 'ms linear'; 
      }
      if (this._shadow) { 
        this._shadow.style[L.DomUtil.TRANSITION] = 'all ' + transitionTime + 'ms linear'; 
      }
    }
    this.setLatLng(latLng);
    if (this._popup){
      this._popup.setContent(this.getPopupContent() + this._latlng.toString());
    }    
  }
});

L.Marker.moveableMarker = function(latLng, options, features){
  return new L.Marker.MoveableMarker(latLng, options, features);
};