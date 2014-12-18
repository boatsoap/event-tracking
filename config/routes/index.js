
var user = App.database('database').verifyUser;

function allRoutes(app){

  app.get('/', function(req, res){
    res.render('playback.jade');
  })

  app.get('/animate', function(req, res){
    res.render('animated.jade');
  })


  app.get('/viewer', function(req, res){
    res.sendFile(App.appPath('/app/views/index.html'));
  })

  app.post('/mobile/login', function(req, res){
    var json;

    user(req.body.username, function(err, result){

      if(err){
        json = JSON.stringify({ result: 'err' })
      } else {
        json = JSON.stringify(result)
      }

      

      res.setHeader('Content-Type', 'application/json');
      res.end(json);
    })

  })

    //API Routes
    //App.require('config/routes/api')(app);

    //HTML Routes
    //App.require('config/routes/viewer')(app);

}

module.exports = allRoutes;