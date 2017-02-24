(function(angular, $, _) {
  // Declare a list of dependencies.
  angular.module('kanbanview', [
    'crmUi', 'crmUtil', 'ngRoute','dndLists'//dndLists module added required for drag-drop directives functionality
  ]);
})(angular, CRM.$, CRM._);
