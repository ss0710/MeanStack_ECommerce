///<reference path="app.js" />

app.controller("signup", [
  "$scope",
  "$location",
  function ($scope, $location) {
    $scope.emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    $scope.isPasswordMatch = true;

    $scope.currentUserName = localStorage.getItem("currentUserName");
    if ($scope.currentUserName != null) {
      $location.path("/home");
    }

    $scope.compare = function (repass) {
      $scope.isconfirm = $scope.password == repass ? true : false;
      $scope.isPasswordMatch = $scope.password == repass ? false : true;
    };

    $scope.signupSubmit = function () {
      console.log("all good");
      var users_data = new Array();
      if (JSON.parse(localStorage.getItem("users"))) {
        users_data = JSON.parse(localStorage.getItem("users"));
      }

      if (
        users_data.some(function (data) {
          return data.email == $scope.email;
        })
      ) {
        alert("Email already exit, Register with different email");
      } else {
        users_data.push({
          email: $scope.email,
          name: $scope.name,
          phoneNumber: $scope.phoneNumber,
          password: $scope.password,
          cartItems: [],
        });
        localStorage.setItem("users", JSON.stringify(users_data));
        alert("Successfully registered");
        // window.location.href="./index.html#!/login";
        $location.path("/login");
      }
    };
  },
]);
