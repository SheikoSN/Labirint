   app.config(function($routeProvider){
        $routeProvider.when('/login',
            {
                templateUrl:'public/images/login.html',
                controller:'loginController'

            });
       $routeProvider.when('/sign-up',
           {
               templateUrl:'public/images/sign-up-form.html',
               controller:'signUpForm'

           });
        $routeProvider.when('/book-list',
            {
                templateUrl:'public/images/book-list.html',
                controller:'mainController'

            });
       $routeProvider.when('/description-book',
           {
               templateUrl:'public/images/description-book.html',
               controller:'mainController'

           });
       $routeProvider.when('/book',
           {
               templateUrl:'public/images/books.html',
               controller:'mainController'

           });
       $routeProvider.when('/new-book',
           {
               templateUrl:'public/images/new-book.html',
               controller:'mainController'
           });
       $routeProvider.when('/read-demo',
           {
               templateUrl:'public/images/read-demo.html',
               controller:'mainController'
           });
        $routeProvider.otherwise({redirectTo: '/login'});
    });
