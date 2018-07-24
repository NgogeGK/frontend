app.controller('authCtrl', ['$scope','$rootScope','$routeParams','$location','$http','Data','toaster','$cookieStore','$localStorage'
,function ($scope, $rootScope, $routeParams, $location, $http, Data,toaster,$cookieStore,$localStorage) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.title = "Treasury Console";
    $scope.activity = "Register Member";
    $scope.doLogin = function (apiuser) {
        //successful login get the apikey from the response and store it locally
        //to use it for subsequent calls
        var posTdata = angular.toJson({
            "email":apiuser.email,
            "password":apiuser.password
        });
        //post to the server
        $http({
            method: 'POST',
            url: 'https://kwamboka.herokuapp.com/auth',
            //url: 'https://kwamboka.herokuapp.com/auth',
            headers : {'Content-Type': 'application/json'},
            data:posTdata
        }).then(function successCallback(response) {
            if(response.data.status){
                toaster.pop('success','Login Attempt',"Welcome "+response.data.message.user_name);
                var sess = {
                    username :response.data.message.user_email ,
                    apikey :response.data.message.api_key,
                    jina: response.data.message.user_name
                };
                $cookieStore.put('sess',sess);

                //pull the required data and store in local storage
                /*
                * 1 users
                * 2. departments
                * 3. contributions
                * 4. */
                getStartUpData();
                getUsers();
                $location.path('payment');
            }else{
                $location.path('login');
            }
        }, function errorCallback(response) {
            //toaster.pop('error', "Login Attempt", "Wrong Username or Password");
            toaster.pop('error', "Login Attempt", "Wrong Username or Password");
        });

    };
        $scope.logout = function () {
             var sessCookie = $cookieStore.get('sess');
             if (sessCookie!=" ") {
               // Removing a cookie
                $cookieStore.remove('sess');
                 toaster.pop('success', "Sign out activity", "You've logged out succesffully");
               $location.path('login');
             }

        }

 $scope.signUp = function (signup) {
    // toaster.pop('success','',signup);
    var checkIn = $cookieStore.get('sess');
        if(checkIn !=null){
            $rootScope.apikey = checkIn.apikey;
        }
        
        var posTdata = angular.toJson({
            "api-key": $rootScope.apikey,
            "email": signup.email,
            "password":"12345",
            "name": signup.name,
            "residence": signup.address,
            "phone": signup.phone,
            "type": signup.type || 1,


        });
        //post to the server
        $http({
            method: 'POST',
            // url: 'https://kwamboka.herokuapp.com/auth',
            url: 'https://kwamboka.herokuapp.com/register',
            headers : {'Content-Type': 'application/json'},
            data:posTdata
        }).then(function successCallback(response) {
            if(response.data.status){
                toaster.pop('success','Sign up success',response.data.message);
                $scope.signup = {};
                getUsers();
                // $location.path('payment');
            }else{
                $location.path('login');
            }
        }, function errorCallback(response) {
            //toaster.pop('error', "Login Attempt", "Wrong Username or Password");
            toaster.pop('error', "Sign up Failed", response.data.message);
        });

    };
        function getStartUpData() {
            var checkIn = $cookieStore.get('sess');
            if(checkIn !=null){
                $rootScope.apikey = checkIn.apikey;
            }
            var auth = angular.toJson({
                "api-key":$rootScope.apikey,
                "command":"retrieve"
            });
            //get Departments
            $http({
                method: 'POST',
                url: 'https://kwamboka.herokuapp.com/departments',
                headers : {'Content-Type': 'application/json'},
                data: auth,
            }).then(function successCallback(response) {
                if(response.data.status){
                    $localStorage.departments = response.data.message;
                }else{
                    $localStorage.departments = 0;
                    toaster.pop('error', "Data fetch Attempt", response.data.error);
                }

            }, function errorCallback(response) {
                toaster.pop('error', "Data fetch Attempt", response.data.error);
            });

            //get Departments
            $http({
                method: 'POST',
                url: 'https://kwamboka.herokuapp.com/contribution',
                headers : {'Content-Type': 'application/json'},
                data: auth,
            }).then(function successCallback(response) {
                $localStorage.contributions = response.data.message;

            }, function errorCallback(response) {
                toaster.pop('error', "Data fetch Attempt", response.data.message);
            });

        }
        function getUsers(){
            var checkIn = $cookieStore.get('sess');
            if(checkIn !=null){
                $rootScope.apikey = checkIn.apikey;
            }
            var auth = angular.toJson({
                "api-key":$rootScope.apikey
            });
            $http({
                method: 'POST',
                url: 'https://kwamboka.herokuapp.com/memberget',
                headers : {'Content-Type': 'application/json'},
                data: auth,
            }).then(function successCallback(response) {
                // $rootScope.users = response.data.message;
                $localStorage.users = response.data.message;

            }, function errorCallback(response) {
                toaster.pop('error', "Data fetch Attempt", response.data.error);
            });
        }

}]);
