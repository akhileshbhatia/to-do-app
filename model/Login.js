var mongoose=require('mongoose');
var schema=mongoose.Schema;
var loginSchema=new schema({userid:String,password:String});
module.exports=mongoose.model('userlogindetails',loginSchema);
