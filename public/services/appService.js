app.factory('appService',['$http', function ($http) {
        return {
            createUser: function (user) {
                return $http.post('/sign-up',user);
            },
            getBooks: function () {
                return  $http.get('/books');
            },
            logIn: function (data) {
                return $http.post('/login', data);
            },
            getBook: function (id) {
                return $http.get('/book/'+id);
            },
            getdemoBook:function(id) {
                return $http.get('/read/'+id);
            },
            createBook: function (book) {
                return $http.post('/login', book);
            },
            checkAuth: function(id){
                return $http.get('/auth/'+id);
            }

        };
    }]);