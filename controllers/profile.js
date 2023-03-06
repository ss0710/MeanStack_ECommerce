///<reference path="app.js" />

app.controller("profile", [
  "$scope",
  "$location",
  "$http",
  function ($scope, $location, $http) {
    $scope.emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    $scope.formHide = true;
    $scope.currentUserName = localStorage.getItem("currentUserName");
    $scope.currentUserEmail = localStorage.getItem("currentUserEmail");

    if ($scope.currentUserName == null) {
      $location.path("/");
    }

    $scope.hideFunction = function () {
      if ($scope.formHide) $scope.formHide = false;
      else $scope.formHide = true;
      $location.path("/profile");
    };

    $scope.updateDetail = function () {
      var user_data = new Array();
      user_data = JSON.parse(localStorage.getItem("users"))
        ? JSON.parse(localStorage.getItem("users"))
        : [];

      var new_user_data = user_data.map(function (data) {
        if (data.email === $scope.currentUserEmail) {
          data.email = $scope.email;
          data.name = $scope.name;
        }
        return data;
      });

      localStorage.setItem("users", JSON.stringify(new_user_data));

      localStorage.setItem("currentUserName", $scope.name);
      localStorage.setItem("currentUserEmail", $scope.email);
      $scope.currentUserName = localStorage.getItem("currentUserName");
      $scope.currentUserEmail = localStorage.getItem("currentUserEmail");
      alert("Profile updated");
      $location.path("/profile");
      $scope.formHide = true;

      $scope.logout = function () {
        localStorage.removeItem("currentUserEmail");
        localStorage.removeItem("currentUserName");
        $location.path("/");
      };
    };
  },
]);
