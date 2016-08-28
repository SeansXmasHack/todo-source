Feature: Test the DB

	Scenario: Write
		Given I set Content-Type header to application/json
		And I set body to { "A1" : 201 }
		When I POST to /test/example1
		Then response code should be 201
		And response body path $.ok should be 1

	Scenario: Read
		When I GET /test/example1
		Then response code should be 200
		And response body path $[0].A1 should be 201
