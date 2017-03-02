'use strict';

angular.module('app').controller('LoginCtrl', function($rootScope, $scope, $uibModal, mafenSession, alertify, PATHS) {
  'ngInject';

  $scope.mafenSession = mafenSession;

  $scope.user = {};

  var onclose = function() {
    alertify.alert("Lost connection to the server. Maybe you login to the game client.",
      $rootScope.logout);
  };

  $scope.login = function() {
    $scope.mafenSession.reset();
    $scope.mafenSession.connect('ws://mafen.club:8000', onclose);
    $scope.loginPromise = $scope.mafenSession.login($scope.user.username, $scope.user.password);
    $scope.loginPromise.then(function() {
      $uibModal.open({
        ariaLabelledBy: 'charlist-modal-title',
        ariaDescribedBy: 'charlist-modal-body',
        templateUrl: PATHS.views + 'charlist.html',
        controller: 'CharListCtrl'
      });
    }, function() {
      alertify.error('Authentication failed');
    });
  };
});
