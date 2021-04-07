Requirements BDD Specs

Feature: Online Client

	As an online client
	I want the system to show me my purchases
	So that I can control my expenses

	Scenario: Get data of API
		Given that the client has a internet connection
		When the client asks to load their purchases
		Then the system should display your purchases co	ming from an API
		And replace the cache data with the current data

Feature: Offline Client

	As an offline client
	I want the system to show me my latest purchases
	So I can see my expenses even without internet

	Scenario:
		Given that the client has no internet connection
		And there is some data written in the cache
		And the cache data is newer than 3 days
		When the client asks to load their purchases
		Then the system should display your purchases from the cache

		Given that the client has no internet connection
		And there is some in the cache
		And the cache data is older than or equal to 3 days
		When the client asks to load their purchases
		Then the system should display an error message

		Given that the client has no internet connection
		And the cache is empty
		When the client asks to load their purchases
		Then the system should display an error message
