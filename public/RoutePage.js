var module=angular.module('myApp',['ngRoute']);

module.controller('AppCtrl', function($scope,MyService) {
  $scope.message = 'Hello World!';

    $scope.save=function(){
       var Obj={title:$scope.title,description:$scope.description,status:false};

       MyService.saveData(Obj);

            $scope.addtable=false;
 };
 $scope.addtable=false;
});


module.config(function($routeProvider){
  $routeProvider.
      when('/All',
        {
          templateUrl:"All.html",
          controller:"AllController"
        }).
      when('/Complete',
        {
            templateUrl:"Complete.html",
            controller:"AllController"
        }).
        when('/InComplete',
          {
              templateUrl:"Incomplete.html",
              controller:"AllController"
          }).
        otherwise({redirectTo:"/All"});
});






module.factory('MyService',function($http,$q){

//  Initially the data is unknown....
  var data=[];
  var newdata=[];

  return{
     getData:function(){
     var deferred=$q.defer();
       if(data.length!=0)
       {
         newdata=data;
         deferred.resolve(data);
       }
       else {
                   $http.get('/api/GetData')
                     .success(function(response){
                       data= response;

                      // console.log("****"+data);
                        deferred.resolve(data);
                      })
                     .error(function(response){
                       deferred.reject(response);
                     });

       }
             return deferred.promise;
     },

     saveData:function(dataToSave){

       var config={
        headers : {
                  'Content-Type': 'application/json'
            }
         }
      $http.post('/api/SaveData',dataToSave,config)
        .success(function(response, status, header, config)
        {

            data.push(dataToSave);

       })
       .error(function (data, status, header, config) {
    //     console.log(data);
       });
     }

}

});

// module.factory('broadcastService',function($scope){
//   return{
//     get:function(){
//       $http.get('/api/GetData')
//           .success(function(response){
//             $scope.user_data = response;
//             console.log($scope.user_data);
//             console.log(response);
//           })
//           .error(function(data){
//             console.log("Error:"+data);
//           });
//     }
//   }
// });




// module.controller('AllController',function($scope,$http){
//   $http.get('/api/GetData')
//     .success(function(response){
//       $scope.user_data = response;
//       console.log($scope.user_data);
//       console.log(response);
//     })
//     .error(function(data){
//       console.log("Error:"+data);
//     });
// });

module.controller('AllController',function($scope,MyService){

   $scope.user_data=[];

$scope.$on('saved',function(event,args){
  $scope.user_data=args;
});
     MyService.getData().
      then(
         function(data){
          $scope.user_data=data;

         },
        function(result){
          console.log("Failed to get the result"+result);
        });


});


module.filter("changestatus",function(){
  return function(item,type){
    var filtereditems=[];
    for(var i=0;i<item.length;i++)
    {
      if(item[i].status==type)
      {
        filtereditems.push(item[i]);
      }
    }
    return filtereditems;
  }

});
