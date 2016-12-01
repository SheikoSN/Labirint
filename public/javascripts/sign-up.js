app.controller('signUpForm',['$scope','$rootScope','$window', 'appService', function ($scope, $rootScope,$window, appService) {
    $scope.userData= {
        name: '',
        surname: '',
        login: '',
        password: '',
        email: ''
    };
    $scope.repeatPassword='';
    $scope.falseValidation = false;
    $scope.trueValidation = true;
    $scope.errorMessage = '';
    $scope.validationScheme =/[!@#$%^&*()+=,?'":;`~]/;
    $scope.signUp = function () {
        if($scope.trueValidation == true) {
            appService.createUser($scope.userData).success(function (data) {
                $window.location.href = '/#/book-list';
                console.log("posted successfully");
            }).error(function (data) {
                console.error("error in posting");
            })
        }
    };

    $scope.validation = function(){

        if($scope.userData.name.length < 1 || $scope.userData.name == undefined || $scope.userData.name.search($scope.validationScheme) != -1){
            var element=document.getElementById('fn');
            element.focus();
            $scope.falseValidation = true;
            $scope.trueValidation = false;
            $scope.errorMessage = 'invalid name !!!';

        }

        else if($scope.userData.surname.length <1 || $scope.userData.surname == undefined || $scope.userData.surname.search($scope.validationScheme) != -1){
            element=document.getElementById('ln');
            element.focus();
            $scope.falseValidation = true;
            $scope.trueValidation = false;
            $scope.errorMessage = 'invalid surname !!!';
            console.log($scope.name, $scope.userData);
        }
        else if($scope.userData.login.length<1 || $scope.userData.login == undefined  || $scope.userData.login.search($scope.validationScheme) != -1){
            element=document.getElementById('login');
            element.focus();
            $scope.falseValidation = true;
            $scope.trueValidation = false;
            $scope.errorMessage = 'invalid login !!!';
        }

        else if($scope.userData.password.length < 1 || $scope.userData.password == undefined){
            element=document.getElementById('pass');
            element.focus();
            $scope.falseValidation = true;
            $scope.trueValidation = false;
            $scope.errorMessage = 'enter your password !!!';
        }
        else if($scope.userData.password !=  $scope.repeatPassword) {
            element=document.getElementById('pass');
            element.focus();
            $scope.falseValidation = true;
            $scope.trueValidation = false;
            $scope.errorMessage = 'enter your password !!!';
        }
        else{
            $scope.falseValidation = false;
            $scope.trueValidation = true;
        }
    }
}]);