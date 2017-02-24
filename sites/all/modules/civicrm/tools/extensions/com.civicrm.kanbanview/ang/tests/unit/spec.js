//////////////////////////////////////
 describe('KanbanviewCtrl', function($scope, crmApi, crmStatus, crmUiHelp, caseStatusList) {
    
	var controller = null;
	$scope = null;
	
	beforeEach(function () {
    module('kanbanview', 'mockedDashboardJSON');
	});

	beforeEach(inject(function ($controller, $rootScope, CRM, defaultJSON) {
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    CRM.api3.when('Case', 'getlist', {//Retrieve data for all cases defined in the system
		'sequential': 1, 
		'return': ['id']
		}).respond(defaultJSON.caseIds)
    controller = $controller('KanbanviewCtrl', {
        $scope: $scope
    });
  }));

  afterEach(function () {
    CRM.api3.verifyNoOutstandingExpectation();
    CRM.api3.verifyNoOutstandingRequest();
  });
	
	var ts = $scope.ts = CRM.ts('kanbanview');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/kanbanview/kanbanviewCtrl'}); // See: templates/CRM/kanbanview/kanbanviewCtrl.hlp
	var CaseIdList=Array();
	
	CRM.api3('Case', 'getlist', {//Retrieve data for all cases defined in the system
		'sequential': 1, 
		'return': ['id']
		}).done(function(result) {
			var getCaseList=result.values;
			angular.forEach(getCaseList,function(caseId) {//Retrieve all case Ids list to an array
				CaseIdList.push(parseInt(caseId.id));
			});
		
	CRM.api3('Case', 'get', { //Retrieve all cases details using CaseIdList array
		'sequential': 1,
		'id': CaseIdList
		}).done(function(result) {
			caseStatusList.allowedTypes= 'case';//can be dropped only to 'case' type objects
			caseStatusList.filterbyStatus='';//To be used for case status filtering
			$scope.caseStatusList = caseStatusList;
			var casesListHolder=result.values;//Temporary holder of case Lists
			var tempCasesList=result.values;//Temporary holder of case Lists
					
			angular.forEach(casesListHolder,function(caseObj) {//get the display name of owner and contact for each case
				caseObj.owner=getContactName(caseObj.client_id["1"],caseObj.contacts);
				caseObj.contact=getContactName(caseObj.contact_id["1"],caseObj.contacts);
			});
			$scope.casesList=casesListHolder;//Array of objects with contact display names
			var caseStatusCount=[];
			var keys=Object.keys(caseStatusList.values);//Get the key values of the caseStausList array 
			
			angular.forEach(keys,function(csl)	{//Filter all cases for case status id
				var casesForStatus=tempCasesList.filter(function(c){
					return (c.status_id==csl)
				});
				caseStatusCount.push({key:csl, count :casesForStatus.length});//populate case count for each case status
			});
			$scope.caseStatusCount=caseStatusCount;
			$scope.$apply();
		  });
	});
				
	function getContactName(contact_id,contacts)  {
		var displayName='';
		var contactObj=contacts.filter(function (ct) {//Filter for contact to get display_name
			return (ct.contact_id === contact_id);
		});
		if (contactObj.length>0) {
			displayName=contactObj[0].display_name;
		}
		return displayName;
	}
	
});





