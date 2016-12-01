app.controller('loginController',['$scope','$rootScope','$window','appService', function ( $scope,$rootScope, $window, appService) {

    $scope.enterUser = {
        log: '',
        pass: ''
    };

    $scope.falseValidation = false;
    $scope.trueValidation = true;
    $rootScope.login = true;
    $rootScope.newBook =false;
    $scope.errorMessage = '';
    $scope.validationScheme =/[!@#$%^&*()+=,?'":;`~]/;

    $scope.loginning = function () {
        appService.logIn($scope.enterUser).success(function (response) {
            console.log(response);
           if(response.status == 404){
                $scope.falseValidation = true;
                $scope.trueValidation = false;
            }
            else {
                document.cookie = "name=" + response + "; path=/; expires=";
                $window.location.href = '/#/book-list';
            }
        }).error(function (data) {
            console.error("error in posting");
        })
    };

    $scope.validationLogin = function(){

        if($scope.enterUser.log.length < 1 || $scope.enterUser.log == undefined || $scope.enterUser.log.search($scope.validationScheme) != -1){
            var element=document.getElementById('login');
            element.focus();
            $scope.falseValidation = true;
            $scope.trueValidation = false;
            $scope.errorMessage = 'invalid name !!!';

        }
        else if( $scope.enterUser.log == undefined  || $scope.enterUser.pass.length < 1){
            element = document.getElementById('pass');
            element.focus();
            $scope.falseValidation = true;
            $scope.trueValidation = false;
            $scope.errorMessage = 'invalid password !!!';
        }
        else{
            $scope.falseValidation = false;
            $scope.trueValidation = true;
        }
    }

}]);