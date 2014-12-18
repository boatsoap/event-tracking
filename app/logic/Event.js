
var Event = function(name){
  this.name = name;
  this.marks = [];
  this.rc = [];
  this.raceNum = 0;
  this.users = [];
}

Event.prototype = {
  getMarks = function(){
    return this.marks;
  },
  getRC = function(){
    return this.rc;
  },
  getRaceNum = function(){
    return this.raceNum;
  },
  getUsers = function(){
    return this.users;
  },
  addMark = function(lat, lng){
    this.marks.push([lat, lng]);
  },
  setRC = function(lat, lng){
    this.rc = [lat, lng]
  },
  nextRace = function(){
    this.raceNum ++;
  },
  newUser = function(user){
    this.users.push(user);
  },
  onNewViewer = function(){
    
  }
}