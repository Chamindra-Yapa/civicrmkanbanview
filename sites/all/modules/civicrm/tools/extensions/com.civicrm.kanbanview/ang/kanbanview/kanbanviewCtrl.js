(function(angular, $, _) {

  angular.module('kanbanview').config(function($routeProvider) {
      $routeProvider.when('/kanbanview', {
        controller: 'KanbanviewCtrl',
        templateUrl: '~/kanbanview/kanbanviewCtrl.html',

        // If you need to look up data when opening the page, list it out
        // under "resolve".
        resolve: { //Retreive data for all case status defined in civicrm system with id,value
          caseStatusList: function(crmApi) {
            return CRM.api3('Case', 'getoptions', {
					'field': 'case_status_id'
            });
          }
        }
      });
    }
  );

  // The controller uses *injection*. This default injects a few things:
  //   $scope -- This is the set of variables shared between JS and HTML.
  //   crmApi, crmStatus, crmUiHelp -- These are services provided by civicrm-core.
  angular.module('kanbanview').controller('KanbanviewCtrl', function($scope, crmApi, crmStatus, crmUiHelp, caseStatusList) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('kanbanview');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/kanbanview/kanbanviewCtrl'}); // See: templates/CRM/kanbanview/kanbanviewCtrl.hlp
	var CaseIdList=Array();
	
	$scope.caseStatusList = caseStatusList;
	try  {
		CRM.api3('Case', 'getlist', {//Retrieve data for all cases defined in the system
			'sequential': 1, 
			}).done(function(result) {
				var getCaseList=result.values;
				angular.forEach(getCaseList,function(caseObj) {//Retrieve all case Ids list to an array
					CaseIdList.push(parseInt(caseObj.id));
				});
				
				CRM.api3('Case', 'get', { //Retrieve all cases details using CaseIdList array
				'sequential': 1,
				'id': CaseIdList
				}).done(function(result) {
					caseStatusList.allowedTypes= 'case';//can be dropped only to 'case' type objects
					caseStatusList.filterbyStatus='';//To be used for case status filtering
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
		}
		catch(e) {
			return e.message;
		}
	
				
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

  
angular.module('kanbanview').directive('crmCaseView', function() {
	return {
		template: //the html template for individual case view 
		 '<style>'+
			   '.main-block'+
				'{'+
				'   display:block;'+
				'   border:2px solid #000;'+
				'   background-color: #DCDCDC;'+
				'	float:left;'+
				'	 width:212px;'+
				'   padding :5px;'+
				'   fontSize :8px;'+
				'}'+
				'.text-block'+
				'{'+
				'	 width:142px;'+
				'	float:right;'+
				'   padding :5px;'+
				'}'+
				'.bottom-block'+
				'{'+
				'	 height:20px;'+
				'}'+
				'.clear'+
				'{'+
				' clear:both;'+
				'}'+
			'</style> '+
		    ' <div class="main-block">' +
			'	   <img  width="60px"  src="sites/all/modules/civicrm/tools/extensions/com.civicrm.kanbanview/ang/kanbanview/Noimage.png" />' +
		    '	<div class="text-block"> '+
		    '    	<a href="?q=civicrm/case&reset=1">Case ID : {{caseId}}</a><br />' +
		    '		<a href="?q=civicrm/contact/view&reset=1&cid={{contact_id}}">{{contact}} </a><br />' +
		    '		Owner: <a href="?q=civicrm/contact/view&reset=1&cid={{owner_id}}">{{owner}}</a> '+
		    '	</div>' +
		    '    <div class="clear"></div>' + 
		    '	<div class="bottom-block">'+
		    '		No of activities: '+
		    '        <a href="?q=civicrm/contact/view/case&reset=1&id={{caseId}}&cid={{owner_id}}&action=view&context=dashboard&selectedChild=case"> '+'       		{{noOfActivities}} '+
		    '		</a>' +	
		    '     </div>'+
		    '	<div class="bottom-block">'+
		    '		Case Open Date: {{caseOpenDate}}'+
		    '    </div>'+
			'</div>',
		controller : ['$scope', function CaseDetailCtrl($scope) {
						$scope.caseId=$scope.caseObj.id;
						$scope.owner=$scope.caseObj.owner;
						$scope.owner_id=$scope.caseObj.client_id["1"];
						$scope.contact_id=$scope.caseObj.contact_id["1"];
						$scope.contact=$scope.caseObj.contact;
						$scope.caseOpenDate=$scope.caseObj.start_date;
						$scope.noOfActivities=$scope.caseObj.activities.length;
					}],
		scope : {
			caseObj : '=crmCaseView'
				}
	}
});	 
})(angular, CRM.$, CRM._);
