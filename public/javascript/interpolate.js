
function inter(p1, p2){
  var points = [];
  points.push(p1);
  for(var n=1; n<9; n++){

    var point = { latLng: [(p1.latLng[0] + (n/1) * (p2.latLng[0] - p1.latLng[0])),
      (p1.latLng[1] + (n/1) * (p2.latLng[1] - p1.latLng[1]))], 
      timestamp: p1.timestamp + (n/1) * (p2.timestamp - p1.timestamp) }

    points.push(point);
    console.log(points);
  }
  
  points.push(p2);

  return points;

}

inter({latLng: [-122.498999, 37.956739], timestamp: 1417027784000},
  {latLng: [-122.498977, 37.956918], timestamp: 1417027792000})