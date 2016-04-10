var MoriApp = angular.module('MoriApp', []);

MoriApp.controller('suggestionController', function($scope) {
  $scope.todos = [
      {text:"todo1"},
      {text:"todo2"},
      {text:"todo3"}
    ]
  });