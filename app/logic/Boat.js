
var Boat = function(data){
  this.userId = data.userId;
}

Boat.prototype = {
  emitCoods: function(){
    this.io.to('viewer').emit({ latLng: this.latLng, timestamp: this.timestamp });
  },
  setData: function(data){
    this.userId = data.userId;
    this.latLng = [data.lat, data.lng];
    this.sog = data.sog;
    this.cog = data.cog;
    this.acc = data.acc;
    this.timestamp = data.timestamp;
  }
}

module.exports = Boat;