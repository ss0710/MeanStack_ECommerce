///<reference path="app.js" />

app.controller("home", [
  "$scope",
  "$location",
  "$http",
  function ($scope, $location, $http) {
    $scope.currentUserName = localStorage.getItem("currentUserName");
    $scope.currentUserEmail = localStorage.getItem("currentUserEmail");

    if ($scope.currentUserName == null) {
      $location.path("/");
    }

    $http.get("https://fakestoreapi.com/products").then(function (response) {
      $scope.productArr = response.data;
    });

    $scope.addToCart = function (title, image, category, price) {
      console.log("Add to cart called");
      var users = new Array();
      if (JSON.parse(localStorage.getItem("users"))) {
        users = JSON.parse(localStorage.getItem("users"));
      }
      var new_users = users.map(function (data) {
        if (data.email === $scope.currentUserEmail) {
          data.cartItems.push({
            title: title,
            img: image,
            category: category,
            price: price,
          });
        }
        return data;
      });
      alert("Item added to cart");
      localStorage.setItem("users", JSON.stringify(new_users));
    };

    $scope.logout = function () {
      localStorage.removeItem("currentUserEmail");
      localStorage.removeItem("currentUserName");
      $location.path("/");
    };

    $scope.orderBool = false;
    $scope.order1 = function () {
      $scope.orderBool = false;
    };
    $scope.order2 = function () {
      $scope.orderBool = true;
    };
  },
]);
