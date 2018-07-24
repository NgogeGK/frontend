//payment controller
app.controller('paymentCtrl', ['$scope','$rootScope','$routeParams','$location','$http','Data','toaster','$cookieStore','$localStorage'
,function ($scope, $rootScope, $routeParams, $location, $http, Data,toaster,$cookieStore,$localStorage) {
    //initially set those objects to null to avoid undefined error
        //initialize required data
    $scope.departments = $localStorage.departments;
    $scope.contributions = $localStorage.contributions;
    $scope.users = $localStorage.users;
    $scope.activity = "Create Payment";
    //create an empty array to reset the form
    $scope.contribution = {};
    //get all the users currently available in the application


    //insert a payment
    //create an empty array to reset the form
    $scope.payment = {id:'',contribution:'',amount:'',description:''};
    $scope.makePayment = function(payment,selected){
        //getting data from the session stored value
        //get the user id from the selected
        payment.id = selected.id;
        var checkIn = $cookieStore.get('sess');
        if(checkIn !=null){
            $rootScope.apikey = checkIn.apikey;
        }
        //convert the object to valid JSON
        var key = $rootScope.apikey;
        var data = angular.toJson({
            "api-key":key,
            "id":payment.id,
            "contribution":payment.contribution,
            "amount":payment.amount,
            "description":payment.description || "New Payment"
        });
        //post to the server


        $http({
            method: 'POST',
            url: 'http://localhost/jkusda_api/malipo',
            headers : {'Content-Type': 'application/json'},
            data:data
        }).then(function successCallback(response) {
            toaster.pop("success","Create Payment","Payment Created successfully");
            //CLEAR THE FORM
            $scope.payment = {id:'',contribution:'',amount:'',description:''};
            $scope.selected = {id:'', name:''};
        }, function errorCallback(response) {
            toaster.pop("error","Create Payment",response.data.message);
            console.log(response.data.message);
        });
    };
      //toggle active class
        $scope.isLinkActive = false;
        $scope.activeButtonClass=function () {
            $scope.isLinkActive =!$scope.isLinkActive;
        }
        //logout function
     $scope.logout = function () {
            // Data.get('logout').then(function (results) {
            //     Data.toast(results);
            //     $location.path('login');
            // });
            // Get cookie
             var sessCookie = $cookieStore.get('sess');
             if (sessCookie!=" ") {
               // Removing a cookie
                $cookieStore.remove('sess');

                 //clear the localstorage
                 $localStorage.$reset();
                 toaster.pop('success', "Sign out activity", "You've logged out succesffully");
               $location.path('login');
             }

        }


}]);

//expenditure controller
app.controller('expenditureCtrl',['$scope','$rootScope','$routeParams','$location','$http','Data','toaster','$cookieStore','$localStorage',
function ($scope, $rootScope, $routeParams, $location, $http, Data,toaster,$cookieStore, $localStorage) {
    $scope.activity = "Create Expenditure";
    /*
    methodName:makeExpenditure
    input:expenditure object
    */
    /*
    * data needed = departments
    * */
    $scope.departments = $localStorage.departments;
    $scope.expenditure = {id:'',amount:'',description:''};
    $scope.makeExpenditure = function (expenditure) {
        var checkIn = $cookieStore.get('sess');
        if(checkIn !=null){
            $rootScope.apikey = checkIn.apikey;
        }
        //convert the object to valid JSON
        var key = $rootScope.apikey;
        var data = angular.toJson({
            "api-key":key,
            "id":expenditure.id,
            "amount":expenditure.amount,
            "description":expenditure.description
        });
        //post to the server
        $http({
            method: 'POST',
            url: 'http://localhost/jkusda_api/expenditure',
            headers : {'Content-Type': 'application/json'},
            data:data
        }).then(function successCallback(response) {
            toaster.pop("success","Create Expenditure","Expenditure Created successfully");
            //CLEAR THE FORM
            $scope.expenditure = {id:'',amount:'',description:''};
        }, function errorCallback(response) {
            toaster.pop("error","Create Expenditure","Seems like there is a little problem");
        });

    }




    //logout button
    $scope.logout = function () {
        // Data.get('logout').then(function (results) {
        //     Data.toast(results);
        //     $location.path('login');
        // });
        // Get cookie
        var sessCookie = $cookieStore.get('sess');
        if (sessCookie!=" ") {
            // Removing a cookie
            $cookieStore.remove('sess');

            //clear the localstorage
            $localStorage.$reset();
            toaster.pop('success', "Sign out activity", "You've logged out succesffully");
            $location.path('login');
        }

    }
}]);
//contribution controller
app.controller('contributionCtrl',['$scope','$rootScope','$routeParams','$location','$http','Data','toaster','$cookieStore','$localStorage',
    function ($scope, $rootScope, $routeParams, $location, $http, Data,toaster,$cookieStore, $localStorage) {
        $scope.activity = "Create Contribution";
        /*
         methodName:makeContribution
         input:contribution object
         */
        $scope.contributions = $localStorage.contributions;
        $scope.departments = $localStorage.departments;
        $scope.contribution = {command:"create",contribution:'',id:''};
        $scope.department = {command:"create", name:""};
        $scope.reloadDepartments = function () {
            ///convert the object to valid JSON
            var key = $rootScope.apikey;
            var data = angular.toJson({
                "api-key":key,
                "command":"retrieve"
            });
            $http({
                method: 'POST',
                url: 'http://localhost/jkusda_api/departments',
                headers : {'Content-Type': 'application/json'},
                data: data,
            }).then(function successCallback(response) {
                if(response.data.status){
                    $localStorage.departments = response.data.message;
                    $scope.departments = $localStorage.departments;
                }else{
                    // $localStorage.departments = 0;
                    toaster.pop('error', "Data fetch Attempt", response.data.error);
                }

            }, function errorCallback(response) {
                toaster.pop('error', "Data fetch Attempt", response.data.error);
            });

        }

                 $scope.reloadContributions = function () {
            ///convert the object to valid JSON
            var key = $rootScope.apikey;
            var data = angular.toJson({
                "api-key":key,
                "command":"retrieve"
            });
            $http({
                 method:'POST',
                url: 'http://localhost/jkusda_api/contribution',
                headers : {'Content-Type': 'application/json'},
                data: data,
            }).then(function successCallback(response) {
                if(response.data.status){
                    $localStorage.contributions = response.data.message;
                    $scope.contributions = $localStorage.contributions;
                }else{
                    // $localStorage.departments = 0;
                    toaster.pop('error', "Data fetch Attempt", response.data.error);
                }

            }, function errorCallback(response) {
                toaster.pop('error', "Data fetch Attempt", response.data.error);
            });

        }
        $scope.makeContribution = function (contribution) {
            var checkIn = $cookieStore.get('sess');
            if(checkIn !=null){
                $rootScope.apikey = checkIn.apikey;
            }
            //convert the object to valid JSON
            var key = $rootScope.apikey;
            var data = angular.toJson({
                "api-key":key,
                "command":contribution.command,
                "contribution":contribution.contribution,
                "department":contribution.id
            });
            //post to the server
            $http({
                method: 'POST',
                url: 'http://localhost/jkusda_api/contribution',
                headers : {'Content-Type': 'application/json'},
                data:data
            }).then(function successCallback(response) {
                toaster.pop("success","Create Contribution","Contribution Created successfully");
                //CLEAR THE FORM
                $scope.contribution = {command:"create",contribution:'',id:''};
                // //reload local storage data
                 $scope.reloadContributions()

            }, function errorCallback(response) {
                toaster.pop("error","Create Contribution","Seems like there is a little problem");
            });

        }
        //create a  department
        $scope.createDepartment = function (department) {
            ///convert the object to valid JSON
            var key = $rootScope.apikey;
            var data = angular.toJson({
                "api-key":key,
                "department":department.name,
                "command":department.command
            });
            //post to the server
            $http({
                method: 'POST',
                url: 'http://localhost/jkusda_api/departments',
                headers : {'Content-Type': 'application/json'},
                data:data
            }).then(function successCallback(response) {
                toaster.pop("success","Create Department","Department Created successfully");
                //$localStorage.departments.add()
                //CLEAR THE FORM
                $scope.contribution = {command:"create",contribution:'',id:''};
                //reload local storage data for departments
                $scope.reloadDepartments()

            }, function errorCallback(response) {
                toaster.pop("error","Create Department","Seems like there is a little problem");
            });
        }

         

        //Contribution pagination
        $scope.totalContributions = $localStorage.contributions.length  ;
        $scope.totalDepartments = $localStorage.departments.length;
        $scope.contributionCurrentPage = 1;
        $scope.contributionNumPerPage = 3;
        $scope.contributionMaxSize = 5;
        $scope.contributionStartAt = 0;

        //Department pagination
        $scope.departmentCurrentPage = 1;
        $scope.departmentNumPerPage = 3;
        $scope.departmentMaxSize = 5;
        $scope.departmentStartAt = 0;
        //end of pagination
        //Edit Modal


        //logout button
        $scope.logout = function () {
            // Get cookie
            var sessCookie = $cookieStore.get('sess');
            if (sessCookie!=" ") {
                // Removing a cookie
                $cookieStore.remove('sess');
                //clear the localstorage
                $localStorage.$reset();
                toaster.pop('success', "Sign out activity", "You've logged out succesffully");
                $location.path('login');
            }

        }
    }]);
//expenditure_report controller
//app.controller('expenditureReportCtrl');
//Contribution Report controller
app.controller('contributionReportCtrl',[ '$scope','$rootScope','$routeParams','$location','$http','Data','toaster','$cookieStore','$localStorage',
    function ($scope, $rootScope, $routeParams, $location, $http, Data,toaster,$cookieStore, $localStorage) {
        $scope.activity = "Reports";
        $scope.departments = $localStorage.departments;
        $scope.contributions = $localStorage.contributions;
        // $scope.contributions = $localStorage.contributions;


        // start
        $scope.contributionTotal = 0;

        $scope.setTotals = function(item){
            if (item){
                $scope.contributionTotal += parseInt(item.amount);
            }
        }

        //end
        $scope.contributionQuery = {id:''};
        $scope.contributionQuery = {contribution:''};

        /*function to get report data*/
        /*
         * inputs:department id
         * */
        $scope.validateContributionReport = function (contributionQuery){
            if (contributionQuery.id === "") {
                return true
            } else if (contributionQuery.from !== undefined ||  contributionQuery.to !== undefined){
                return false
            } else {
                return false
            }
             // return contributionQuery.id === ""  || contributionQuery.from === undefined || contributionQuery.to === undefined
        }


        $scope.getContributionReport = function (contributionQuery){
            // console.log($scope.validateContributionReport(contributionQuery))
            console.log("Contributions",$scope.contributions)
            //reset the Totals
            $scope.contributionTotal = 0;
            $scope.contributionReportData = 0;
            var params = {'api-key':$rootScope.apikey}
            if(contributionQuery.id !== ''){
                params["department_id"]=contributionQuery.id
            }
            if(contributionQuery.contribution !== ''){
                // alert(contributionQuery.contribution)
                params["contribution"]=contributionQuery.contribution
            }
            if(contributionQuery.from !== undefined){
                params["from"]=moment(contributionQuery.from).format('YYYY-MM-DD')
            }
            if(contributionQuery.to !== undefined){
                params["to"]=moment(contributionQuery.to).format('YYYY-MM-DD')
            }

            var reportData = angular.toJson(params);
            //post to the server
            $http({
                method: 'POST',
                url: 'http://localhost/jkusda_api/contribution_report',
                headers : {'Content-Type': 'application/json'},
                data:reportData
            }).then(function successCallback(response) {
                if(response.data.status){
                    $scope.contributionReportData = response.data.message;
                    $scope.contributionQuery = {id:contributionQuery.id};
                }else{
                    toaster.pop("error","Report query",response.data.message);
                    $scope.contributionReportData = 0;
                }

            }, function errorCallback(response) {
                toaster.pop("error","Report query",response.data.message);
            });
        }
        //report pagination Object.keys(myObject).length;

        if ($scope.contributionReportData) {
            $scope.totalContributionReportData = Object.keys(contributionReportData).length;
            $scope.contributionReportCurrentPage = 1;
            $scope.contributionReportNumPerPage = 15;
            $scope.contributionReportMaxSize = 5;
            $scope.contributionReportStartAt = 0;
        } else {
            $scope.totalContributionReportData = 0;
        }


        //logout button
        $scope.logout = function () {
            // Get cookie
            var sessCookie = $cookieStore.get('sess');
            if (sessCookie!=" ") {
                // Removing a cookie
                $cookieStore.remove('sess');
                //clear the localstorage
                $localStorage.$reset();
                toaster.pop('success', "Sign out activity", "You've logged out succesffully");
                $location.path('login');
            }

        }


        $scope.edit = function (datea) {

            var sessCookie = $cookieStore.get('sess');
            if (sessCookie!=" ") {
            toaster.pop('success', "Data", "I am gonna edit this record"+datea);
            // $location.path('login');
            }

        }

        $scope.delete = function (datea) {

            var sessCookie = $cookieStore.get('sess');
            var params = {'api-key':$rootScope.apikey}
            params["command"] = "delete"
            params["code"]=datea
            if(datea != ""){
                params["code"]=datea
            }
            var delData = angular.toJson(params);

            if (sessCookie!=" ") {
                $http({
                    method: 'POST',
                    url: 'http://localhost/jkusda_api/malipo',
                    headers : {'Content-Type': 'application/json'},
                    data:delData
                }).then(function successCallback(response) {
                    if(response.data.status){
                        toaster.pop("success",response.data.message,datea);

                        // $scope.contributionReportData = response.data.message;
                        // $scope.contributionQuery = {id:contributionQuery.id};
                    }else{
                        toaster.pop("error","Delete Operation",response.data.message);
                        // $scope.contributionReportData = 0;
                    }

                }, function errorCallback(response) {
                    toaster.pop("error","Delete Operation",response.data.message);
                });
            }
                // toaster.pop('success', "Data", "I am gonna delete this record");
                // $location.path('login');
            }







$scope.signUp = function (member) {
    var checkIn = $cookieStore.get('sess');
        if(checkIn !=null){
            $rootScope.apikey = checkIn.apikey;
        }
        
        var posTdata = angular.toJson({
            "api-key": $rootScope.apikey,
            "email":member.email,
            "password":member.password,
            "name": member.name,
            "residence": member.address,
            "phone": member.phone


        });
        //post to the server
        $http({
            method: 'POST',
            url: 'http://localhost/jkusda_api/register',
            //url: 'http://localhost/jkusda_api/auth',
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
            toaster.pop('error', "Login Attempt", response.data.message);
        });

    };


        function get_departments(){
            var auth = angular.toJson({
                "api-key":$rootScope.apikey,
                "command":"retrieve"
            });
            //get Departments
            $http({
                method: 'POST',
                url: 'http://localhost/jkusda_api/departments',
                headers : {'Content-Type': 'application/json'},
                data: auth,
            }).then(function successCallback(response) {
                if(response.data.status){
                    $localStorage.departments = response.data.message;
                }else{
                    // $localStorage.departments = 0;
                    toaster.pop('error', "Data fetch Attempt", response.data.error);
                }

            }, function errorCallback(response) {
                toaster.pop('error', "Data fetch Attempt", response.data.error);
            });

        }

       

}]);


app.controller('memberCtrl',['$scope','$rootScope','$routeParams','$location','$http','Data','toaster','$cookieStore','$localStorage',
    function ($scope, $rootScope, $routeParams, $location, $http, Data,toaster,$cookieStore, $localStorage) {
        $scope.activity = "Manage Members";
       
        // create a new member
        $scope.signUp = function (member) {
    var checkIn = $cookieStore.get('sess');
        if(checkIn !=null){
            $rootScope.apikey = checkIn.apikey;
        }
        
        var posTdata = angular.toJson({
            "api-key": $rootScope.apikey,
            "email":member.email,
            "password":member.password,
            "name": member.name,
            "residence": member.address,
            "phone": member.phone


        });
        //post to the server
        $http({
            method: 'POST',
            url: 'http://localhost/jkusda_api/register',
            //url: 'http://localhost/jkusda_api/auth',
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
            toaster.pop('error', "Login Attempt", response.data.message);
        });

    };

        
        $scope.createDepartment = function (department) {
            ///convert the object to valid JSON
            var key = $rootScope.apikey;
            var data = angular.toJson({
                "api-key":key,
                "department":department.name,
                "command":department.command
            });
            //post to the server
            $http({
                method: 'POST',
                url: 'http://localhost/jkusda_api/departments',
                headers : {'Content-Type': 'application/json'},
                data:data
            }).then(function successCallback(response) {
                toaster.pop("success","Create Department","Department Created successfully");
                //$localStorage.departments.add()
                //CLEAR THE FORM
                $scope.contribution = {command:"create",contribution:'',id:''};
                //reload local storage data for departments
                $scope.reloadDepartments()

            }, function errorCallback(response) {
                toaster.pop("error","Create Department","Seems like there is a little problem");
            });
        }

         

        //Contribution pagination
        $scope.totalContributions = $localStorage.contributions.length  ;
        $scope.totalDepartments = $localStorage.departments.length;
        $scope.contributionCurrentPage = 1;
        $scope.contributionNumPerPage = 3;
        $scope.contributionMaxSize = 5;
        $scope.contributionStartAt = 0;

        //Department pagination
        $scope.departmentCurrentPage = 1;
        $scope.departmentNumPerPage = 3;
        $scope.departmentMaxSize = 5;
        $scope.departmentStartAt = 0;
        //end of pagination
        //Edit Modal


        //logout button
        $scope.logout = function () {
            // Get cookie
            var sessCookie = $cookieStore.get('sess');
            if (sessCookie!=" ") {
                // Removing a cookie
                $cookieStore.remove('sess');
                //clear the localstorage
                $localStorage.$reset();
                toaster.pop('success', "Sign out activity", "You've logged out succesffully");
                $location.path('login');
            }

        }
    }]);


app.controller('expenditureReportCtrl',[ '$scope','$rootScope','$routeParams','$location','$http','Data','toaster','$cookieStore','$localStorage',
    function ($scope, $rootScope, $routeParams, $location, $http, Data,toaster,$cookieStore, $localStorage) {
        $scope.activity = "Reports";
        $scope.departments = $localStorage.departments;
        // start
        $scope.expenditureCtrlTotal = 0;

        $scope.setTotals = function(item){
            if (item){
                $scope.expenditureTotal += parseInt(item.amount);
            }
        }

        //end
        $scope.expenditureQuery = {id:''};


        /*function to get report data*/
        /*
         * inputs:department id
         * */



        $scope.getExpenditureReport = function (contributionQuery){
            console.log("I have been called")
            //reset the Totals
            $scope.expenditureTotal = 0;
            $scope.expenditureReportData = 0;
            var params = {'api-key':$rootScope.apikey}
            if(contributionQuery.id !== ''){
                params["department_id"]=contributionQuery.id
            }
            if(contributionQuery.from !== undefined){
                params["from"]=moment(contributionQuery.from).format('YYYY-MM-DD')
            }
            if(contributionQuery.to !== undefined){
                params["to"]=moment(contributionQuery.to).format('YYYY-MM-DD')
            }

            var reportData = angular.toJson(params);
            //post to the server
            $http({
                method: 'POST',
                url: 'http://localhost/jkusda_api/expenditure_report',
                headers : {'Content-Type': 'application/json'},
                data:reportData
            }).then(function successCallback(response) {
                if(response.data.status){
                    $scope.expenditureReportData = response.data.message;
                    console.log($scope.expenditureReportData)
                    $scope.contributionQuery = {id:contributionQuery.id};
                }else{
                    toaster.pop("error","Report query",response.data.message);
                    $scope.expenditureReportData = 0;
                }

            }, function errorCallback(response) {
                toaster.pop("error","Report query",response.data.message);
            });
        }
        //report pagination Object.keys(myObject).length;

        if ($scope.expenditureReportData) {
            $scope.totalExpenditureReportData = Object.keys(expenditureReportData).length;
            $scope.expenditureReportCurrentPage = 1;
            $scope.expenditureReportNumPerPage = 15;
            $scope.expenditureReportMaxSize = 5;
            $scope.expenditureReportStartAt = 0;
        } else {
            $scope.totalExpenditureReportData = 0;
        }


        //logout button
        // $scope.logout = function () {
        //     // Get cookie
        //     var sessCookie = $cookieStore.get('sess');
        //     if (sessCookie!=" ") {
        //         // Removing a cookie
        //         $cookieStore.remove('sess');
        //         //clear the localstorage
        //         $localStorage.$reset();
        //         toaster.pop('success', "Sign out activity", "You've logged out succesffully");
        //         $location.path('login');
        //     }
        //
        // }





        // $scope.signUp = function (member) {
        //     var checkIn = $cookieStore.get('sess');
        //     if(checkIn !=null){
        //         $rootScope.apikey = checkIn.apikey;
        //     }
        //
        //     var posTdata = angular.toJson({
        //         "api-key": $rootScope.apikey,
        //         "email":member.email,
        //         "password":member.password,
        //         "name": member.name,
        //         "residence": member.address,
        //         "phone": member.phone
        //
        //
        //     });
        //     //post to the server
        //     $http({
        //         method: 'POST',
        //         url: 'http://localhost/jkusda_api/auth',
        //         //url: 'http://localhost/jkusda_api/auth',
        //         headers : {'Content-Type': 'application/json'},
        //         data:posTdata
        //     }).then(function successCallback(response) {
        //         if(response.data.status){
        //             toaster.pop('success','Login Attempt',"Welcome "+response.data.message.user_name);
        //             var sess = {
        //                 username :response.data.message.user_email ,
        //                 apikey :response.data.message.api_key,
        //                 jina: response.data.message.user_name
        //             };
        //             $cookieStore.put('sess',sess);
        //
        //             //pull the required data and store in local storage
        //             /*
        //              * 1 users
        //              * 2. departments
        //              * 3. contributions
        //              * 4. */
        //             getStartUpData();
        //             getUsers();
        //             $location.path('payment');
        //         }else{
        //             $location.path('login');
        //         }
        //     }, function errorCallback(response) {
        //         //toaster.pop('error', "Login Attempt", "Wrong Username or Password");
        //         toaster.pop('error', "Login Attempt", response.data.message);
        //     });
        //
        // };


        // function get_departments(){
        //     var auth = angular.toJson({
        //         "api-key":$rootScope.apikey,
        //         "command":"retrieve"
        //     });
        //     //get Departments
        //     $http({
        //         method: 'POST',
        //         url: 'http://localhost/jkusda_api/departments',
        //         headers : {'Content-Type': 'application/json'},
        //         data: auth,
        //     }).then(function successCallback(response) {
        //         if(response.data.status){
        //             $localStorage.departments = response.data.message;
        //         }else{
        //             // $localStorage.departments = 0;
        //             toaster.pop('error', "Data fetch Attempt", response.data.error);
        //         }
        //
        //     }, function errorCallback(response) {
        //         toaster.pop('error', "Data fetch Attempt", response.data.error);
        //     });
        //
        // }



    }]);
