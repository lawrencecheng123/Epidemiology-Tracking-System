var app = angular.module('app', ['ngRoute']);

app.controller('suggestionController', function($scope) {
  $scope.todos = [
      {text:"todo1"},
      {text:"todo2"},
      {text:"todo3"}
    ];

    
  });