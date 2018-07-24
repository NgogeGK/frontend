app.factory("Data", ['$http', 'toaster','$cookieStore',
    function ($http, toaster,$cookieStore) { // This service connects to our REST API

        var serviceBase = 'jkusda_api/';

        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
        //get request
        obj.get = function (q) {
           // var key = $cookieStore.get('sess');
            var auth = {
                    "api-key":"123456ouaoidkjuidsxiudinjdsjnds"
                };
               return $http({
                    method  : 'POST',
                    url     : serviceBase + q,
                    data    : auth, //forms user object
                    headers : {'Content-Type': 'application/json'}
                }).then(function (results) {
                return results.data;
            });
        };

        obj.post = function (q, object) {
            console.log(object);
             return $http({
                    method  : 'POST',
                    url     : serviceBase + q,
                    data    : object,  //forms user object
                    headers : {'Content-Type': 'application/json'}
                }).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        return obj;
}]);
