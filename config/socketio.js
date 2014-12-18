
var insPos = App.database('database').insertPosition
  , user = App.database('database').verifyUser;

function socketIO(app, io){

  io.on('connection', function(socket){
    var userType = socket.handshake.headers['user-agent'].split('/');
    if(userType[0] == 'Mozilla'){ //this is a viewer
      socket.join('viewer');
    }

    socket.on('login', function(data, cb){
      console.log(data);
      user(data.username, function(err, res){
        console.log(res);
        cb(res);
      });
    });

    socket.on('login-ios', function(data, cb){

      user(data, function(err, res){
        console.log(res);
        io.to(socket).emit('loginAck', res);
      });
    });

    //Authenticate the socket via tokens
    socket.on('handshake', function(data, cb){
      //Query DB, Insert/Authenticate User, Return their client status
      if(data.userType == 3){
        socket.join('racers');
        socket.userId = data.userId;
        cb({ key: 'handshake', raceState: true });
      }
      
    });

    socket.on('kill', function(){
      console.log('kill');
      io.to('racers').emit('disconnAll');
    })

    socket.on('trans', function(){
      console.log('transmit');
      io.to('racers').emit('transmit');
    })


    //Accept position report from current USER
    socket.on('position', function(data, cb){
      console.log(data);
      insPos(data, function(err, result){
        io.to('viewer').emit('position', data); 
      })
    });

    socket.on('position-ios', function(data){
      var arrData = data.split(',');
      var json = {
        userId: arrData[0],
        username: arrData[1],
        lat: arrData[2],
        lng: arrData[3],
        sog: arrData[4],
        cog: arrData[5],
        acc: arrData[6],
        timestamp: arrData[7]
      };

      console.log(json);

      insPos(json, function(err, result){
        io.to('viewer').emit('position', json);
      })
      
    })


    //Tell viewers a boat has disconnected
    socket.on('leave', function(data){
      console.log(data);
      io.to('viewer').emit('userDisconnect', data.userId);
    })
    socket.on('disconnect', function(data){
      console.log(data);
    });

  });
}

module.exports = socketIO;