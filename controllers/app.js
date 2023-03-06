var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl : "./views/signup.html" 
		})
		.when("/login", {
			templateUrl: "./views/login.html"
		})
        .when("/home", {
			templateUrl: "./views/home.html"
		})
        .when("/cart", {
            templateUrl: "./views/cart.html"
        })
        .when("/profile", {
            templateUrl: "./views/profile.html"
        })
});

app.controller('index', [
    "$scope", 
    function($scope){
        $scope.isAnyUser = false;
        console.log($scope.isAnyUser)
        if(localStorage.getItem("currentUserName")){
            $scope.isAnyUser = true;
        }
    }
])

