var mysql = require('mysql')
  , pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost', 
      user: 'tchittick', 
      database: 'fiasco', 
      password: '1tchittick!' })

module.exports.verifyUser = function(username, callback){

  pool.getConnection(function(err, dbConn){
    dbConn.query('Select * From users Where username = ?', [username], function(err, result){
      if(err) throw err;

      dbConn.release();

      var user;
      if(result.length == 1){
        user = result[0]
        callback(null, { key: 'login', userId: user.id, username: username, usertypeID: 3, transmit: true });
      } else if(result.length == 0){
        dbConn.query('Insert Into users Set ?', { username: username, usertypeID: 3 }, function(err, result){
          if(err) throw err;

          callback(null, { key: 'login', id: result.insertId, username: username, usertypeID: 3, transmit: true });
        })
      } else {
        callback(true, null); //create err codes instead of 'true'
      }
    });
  });

}


module.exports.insertPosition = function(obj, cb){

  var pos = { userId: obj.userId
    , lat: obj.lat
    , lng: obj.lng
    , acc: obj.acc
    , sog: obj.sog
    , cog: obj.cog
    , timestamp: obj.timestamp };

  pool.getConnection(function(err, dbConn){
    dbConn.query('Insert Into position Set ?', pos, function(err, results){
      if(err) throw err;

      dbConn.release();

      cb(obj);
    });
  });

}