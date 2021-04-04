# clean-cache-control
Project based in course [Typescript, TDD e Clean Architecture](https://www.youtube.com/playlist?list=PL9aKtVrF05DxIrtD3CuXGnzq8Q0IZ-t8J)

## Require

## Requirements BDD Specs
### Narrative 1

```text
As an online client 
I want the system to show me my purchases
So that I can control my expenses
```

### Scenery

```text
Given that the client has a internet connection
When the client asks to load their purchases
Then the system should display your purchases coming from an API 
and replace the cache data with the current data 
```

### Narrative 2

```text
As an offline client
I want the system to show me my latest purchases
So I can see my expenses even without internet
```

### Scenery

```text
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
when the client asks to load their purchases
then the system should display an error message
```

## Use Cases
> ### Success Case
1. System executes the command "Load Purchases"
2. System load the cache data
3. System validates if the cache is less than 3 days old
4. System creates a shopping list from the cache data
5. System returns the shopping list

>### Exception - Expired Cache
1. System clears the cache
2. System returns error 

>### Exception - Empty Cache
1. System returns error

## Write purchases to the cache
> ### Success Case
1. System executes the command "Save Purchases"
2. System encodes data to be recorded
3. System creates a date to be cache
4. System clears data from current cache
5. System writes the new data to the cache
6. System does not return any error

### Credits

* [Mongo Channel](https://www.youtube.com/channel/UCabelTt5YHot17aKb19VRNA);
