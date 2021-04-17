const express = require('express')
    multer = require('multer')
    bodyParser = require('body-parser')
    flash = require('connect-flash')
    path = require('path')
    mongoose = require('mongoose')
    methodOverride = require('method-override')

    app = express()

    SpaceInfo = require('./models/space_info')
    User = require('./models/user')

    mongoose.connect("mongodb://localhost/planinfo", { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.set("useCreateIndex", true);
    mongoose.set('useFindAndModify', false);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + "/public"));
    app.use(methodOverride("_method"));
    app.use(flash());

    app.use(require("express-session")({
        secret: "Option",
        saveUninitialized: false,
      }));

      app.use(function(req, res, next){
        res.locals.currentUser = req.user;
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success");
        next();
      });

      app.get("/", (req, res)=>{
          res.render("landing_page")
      })

      app.get("/insert_info", (req, res)=>{
          res.render("Insert_Info")
      })

      app.post("/insert_info", (req, res)=>{
          var type = req.body.type
          var description = req.body.description

          var spaceInfo = new SpaceInfo({
            type: type,
            description: description
          })

          spaceInfo.save((err, saved)=>{
            if(err){
              console.log(err);
              res.redirect('/')
            } else {
              res.redirect("/display_info")
            }
          })
      })
      app.get("/display_info", (req, res)=>{
        SpaceInfo.find({}, (err, data)=>{
          if(err){
            console.log(err);
          } else {
            res.render('display_info', {data: data})
          }
        })
      })

      app.get("/Planets", (req, res)=>{
        res.render("Planets")
    })
    app.get("/Stars", (req, res)=>{
      res.render("Stars")
  })
     app.get("/Milkyway", (req, res)=>{
    res.render("Milkyway")
  })
app.get("/Asteroids", (req, res)=>{
  res.render("Asteroids")
})
app.get("/news", (req, res)=>{
  res.render("news")
})

      app.put("/update", (req, res)=>{
        var type = req.body.type
            description = req.body.description
            hidden_name = req.body.hidden_name
            hidden_description = req.body.hidden_description
        console.log(hidden_name);

        SpaceInfo.DeleteOne({type: hidden_name}, {$set: {type: type, description: description}}, (err, updated)=>{
          if(err){
            console.log(err);
          } else {
            res.redirect("/display_info")
          }
        })
      })
      app.listen(8000, ()=>{
          console.log("Started at port 8000");
      })