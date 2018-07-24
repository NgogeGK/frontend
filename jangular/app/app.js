var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster','ngCookies','ui.bootstrap','ngStorage']);

app.config(['$routeProvider','$httpProvider',
  function ($routeProvider,$httpProvider) {
      //fix CORS
      //Reset headers to avoid OPTIONS request (aka preflight)
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
      //
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/payment', {
                title: 'Payments',
                templateUrl: 'partials/payment.html',
                controller: 'paymentCtrl'
            })
            .when('/expenditure', {
                title: 'Expenditure',
                templateUrl: 'partials/expenditure.html',
                controller: 'expenditureCtrl'
            })
            .when('/expenditure_report', {
                title: 'Expenditure Reports',
                templateUrl: 'partials/expenditure_report.html',
                controller: 'expenditureCtrl'
            })
            .when('/contribution', {
                title: 'Contributions',
                templateUrl: 'partials/contribution.html',
                controller: 'contributionCtrl'
            })
            .when('/contribution_report',{
                title: 'Contribution Report',
                templateUrl: 'partials/contribution_report.html',
                controller: 'contributionReportCtrl'
            })
            .when('/login', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            // .when('/dashboard', {
            //     title: 'Dashboard',
            //     templateUrl: 'partials/dashboard.html',
            //     controller: 'dashboardCtrl'
            // })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/payment.html',
                controller: 'paymentCtrl'
            })
            .when('/signup', {
                title: 'Sign Up',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl',
                role: '0'
            })
            .when('/member', {
                title: 'Members',
                templateUrl: 'partials/member.html',
                controller: 'authCtrl',
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }]).run(['$rootScope','$location','$cookieStore','toaster',function ($rootScope,$location,$cookieStore,toaster){
        $rootScope.$on("$routeChangeStart",function(event,next,current){
            $rootScope.authenticated = false;
            var checkIn = $cookieStore.get('sess');
            if(checkIn !=null){
               $rootScope.authenticated = true;
               $rootScope.username = checkIn.jina;
               $rootScope.apikey = checkIn.apikey;
                //check if the user is trying to be smart
                var nextpath = next.$$route.originalPath;
                if (nextpath =='/login'){
                    toaster.pop("error","Info","Dear " + $rootScope.username + " You can't login in twice");
                    $location.path("/payment");
                }
            }else{
                var nextUrl = next.$$route.originalPath;
                  if (nextUrl == '/login') {
                        //toaster.pop("success","info","Login to Access the CONSOLE");
                  } else {
                       toaster.pop("error","Malicious Activity","Login to Access the CONSOLE");
                      $location.path("/login");
                   }
            }
        });
  }]);
  //for every routechange check whether cookie is set.
  //if not log out the user