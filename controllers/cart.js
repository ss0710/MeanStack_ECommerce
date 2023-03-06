///<reference path="app.js" />

app.controller("cart", [
  "$scope",
  "$location",
  function ($scope, $location) {
    console.log("Executing");
    $scope.itemsCount = 0;
    $scope.totalAmount = 0.0;

    $scope.currentUserName = localStorage.getItem("currentUserName");
    $scope.currentUserEmail = localStorage.getItem("currentUserEmail");

    if ($scope.currentUserName == null) {
      $location.path("/");
    }

    $scope.users = JSON.parse(localStorage.getItem("users"));
    $scope.users.map(function (data) {
      if (data.email === $scope.currentUserEmail) {
        $scope.cartItems = data.cartItems;
        if (data.cartItems) {
          $scope.itemsCount = data.cartItems.length;
          data.cartItems.forEach((element) => {
            $scope.totalAmount = $scope.totalAmount + element.price;
          });
        }
      }
    });

    $scope.removeFromCart = function (title) {
      $scope.users = JSON.parse(localStorage.getItem("users"));
      $scope.new_users = $scope.users.map(function (data) {
        if (data.email === $scope.currentUserEmail) {
          $scope.cartItems = data.cartItems;
          console.log($scope.cartItems);
          $scope.new_cartItems = $scope.cartItems.filter(function (data1) {
            return data1.title != title;
          });
          console.log($scope.new_cartItems);
          data.cartItems = $scope.new_cartItems;
          $scope.cartItems = $scope.new_cartItems;
        }
        return data;
      });

      $scope.itemsCount = 0;
      $scope.totalAmount = 0.0;
      $scope.itemsCount = $scope.new_cartItems.length;
      $scope.new_cartItems.forEach((element) => {
        $scope.totalAmount = $scope.totalAmount + element.price;
      });

      localStorage.setItem("users", JSON.stringify($scope.new_users));
      $location.path("/cart");
    };

    $scope.logout = function () {
      localStorage.removeItem("currentUserEmail");
      localStorage.removeItem("currentUserName");
      $location.path("/");
    };
  },
]);
