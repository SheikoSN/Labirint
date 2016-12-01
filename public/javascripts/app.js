var app = angular.module('myApp', ["ngRoute"]);
app.controller('mainController',['$scope','$rootScope','$window','appService', function ( $scope,$rootScope, $window, appService) {
  $scope.book = {
      author:'',
      title:'',
      year: '',
      language:'',
      description:'',
      quote:''

  };

    $scope.enterUser = {
        log: '',
        pass: ''
    };

    $rootScope.readDemoBook = {};
    $rootScope.newBook = true;
    $rootScope.login = false;
    $scope.books ={};
    $scope.cookie = document.cookie.replace(/name=/g, "");

    $scope.getBooks = function () {
        $rootScope.checkAuth();
        appService.getBooks($scope.cookie).then(function (data) {
            $rootScope.newBook = true;
            $scope.books = data.data.rows;
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.descriptionBook = function(id){
        $rootScope.checkAuth();
        appService.getBook(id).then(function (data) {
                $window.location.href='/#/description-book';
                $rootScope.bookInfo = data.data;

        }, function errorCallback(response) {
            console.log(response);
        });

    };

    $scope.readDemo = function(id){
        $rootScope.checkAuth();
        appService.getdemoBook(id).then(function (data) {
            $rootScope.readDemoBook = data.data.book;
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $rootScope.createBook = function(){
        $rootScope.checkAuth();
        appService.createBook($scope.book)
            .success(function (response) {
                $window.location.href='/#/book-list';
                console.log("book-create");
            }).error(function (data) {
            console.error("error in posting");
        })
    };

    $rootScope.checkAuth = function(){
        appService.checkAuth($scope.cookie).then(function(res){
            if(!res){
                $window.location.href='/#/login';
            }
        })

    }
    $rootScope.checkAuth();
}]);