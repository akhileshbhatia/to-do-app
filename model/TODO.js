var mongoose=require('mongoose');
var schema=mongoose.Schema;
var userSchema=new schema({userid:String,title:String,description:String,status:Boolean});
module.exports=mongoose.model('todos',userSchema);
