///<reference path="app.js" />

app.controller("login", [
  "$scope",
  "$location",
  function ($scope, $location) {
    $scope.emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    $scope.currentUserName = localStorage.getItem("currentUserName");
    if ($scope.currentUserName != null) {
      $location.path("/home");
    }

    $scope.loginSubmit = function () {
      console.log("all good");
      var user_data = new Array();
      user_data = JSON.parse(localStorage.getItem("users"))
        ? JSON.parse(localStorage.getItem("users"))
        : [];

      if (
        user_data.some(function (data) {
          return data.email == $scope.email && data.password == $scope.password;
        })
      ) {
        alert("login successful");
        var current_user = user_data.filter(function (data) {
          return data.email == $scope.email && data.password == $scope.password;
        })[0];
        localStorage.setItem("currentUserEmail", current_user.email);
        localStorage.setItem("currentUserName", current_user.name);
        $location.path("/home");
      } else {
        alert("Wrong email or password");
      }
    };
  },
]);
