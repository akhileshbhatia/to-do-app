var express=require('express');
var app=new express();
var mongoose=require('mongoose');
var router=express.Router();
var bodyParser=require('body-parser');
var todo=require('./model/TODO');

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/views'));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

mongoose.connect('mongodb://localhost:27017/NewTodoDb');

router.route('/GetData')
 .get(function(req,res){
   todo.find({},function(err,todolist){
     if(err)
     {
       res.send(err);
     }
     else {
    //   console.log("************");
      // console.log(todolist);
       res.json(todolist);
     }
   })
 });
 router.route('/SaveData')
 .post(function(req,res){
   var TodoObj=new todo(req.body);
   TodoObj.title=req.body.title;
   TodoObj.description=req.body.description;
   TodoObj.status=req.body.status;

     TodoObj.save(TodoObj,function(err){
       if(err)
       {
         res.send(err);
       }

      res.sendFile(__dirname+"/views"+"/TodoList.html");

      console.log("Created")
     });
 });

 app.use('/api',router);
 var server=app.listen(5000,function(){
 console.log('server is listening to 5000');
  });

 app.get("/",function(req,res){
   res.sendFile(__dirname+"/views"+"/TodoList.html");
 });
