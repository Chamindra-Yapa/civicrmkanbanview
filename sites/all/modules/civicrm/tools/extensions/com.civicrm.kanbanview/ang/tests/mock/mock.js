angular.module('mockedDashboardJSON',[])
.value('defaultJSON',{
    caseStatusData: [{
    "is_error": 0,
    "version": 3,
    "count": 4,
    "values": [
        {
            "key": 3,
            "value": "Urgent"
        },
        {
            "key": 1,
            "value": "Ongoing"
        },
        {
            "key": 2,
            "value": "Resolved"
        },
        {
            "key": 4,
            "value": "Top Priority"
        }
    ]
}],
caseIds	: [{
    
    "is_error": 0,
    "version": 3,
    "count": 1,
    "id": 1,
    "values": [
        {
            "id": "1"
        }
    ]
}],
caseDetails: [{
	"is_error": 0,
    "version": 3,
    "count": 1,
    "id": 1,
    "values": [
        {
            "id": "1",
            "case_type_id": "1",
            "subject": "community sevice",
            "start_date": "2017-02-15",
            "status_id": "1",
            "is_deleted": "0",
            "contact_id": {
                "1": "202"
            },
            "client_id": {
                "1": "202"
            },
            "contacts": [
                {
                    "contact_id": "202",
                    "sort_name": "Yapa, Chamindra",
                    "display_name": "Chamindra Yapa",
                    "email": "chamkum77@yahoo.com",
                    "phone": "",
                    "birth_date": "",
                    "role": "Client"
                },
                {
                    "contact_id": "202",
                    "display_name": "Chamindra Yapa",
                    "sort_name": "Yapa, Chamindra",
                    "role": "Homeless Services Coordinator",
                    "email": "chamkum77@yahoo.com"
                }
            ],
            "activities": [
                "625",
                "626",
                "627",
                "628",
                "629",
                "630",
                "631",
                "632"
            ]
        }
    ]
}]    
});