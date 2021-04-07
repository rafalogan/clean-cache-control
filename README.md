# clean-cache-control
Project based in course [Typescript, TDD e Clean Architecture](https://www.youtube.com/playlist?list=PL9aKtVrF05DxIrtD3CuXGnzq8Q0IZ-t8J)

## Require

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
2. System creates a date to be cache
3. [x] System clears data from current cache
4. System writes the new data to the cache
5. System does not return any error

>## Exception - error when deleting data from Cache
1. [x] System not insert latest data on cache
1. [x] System return error

>## Exception - error when write data from Cache
1. System return error

### Credits

* [Mongo Channel](https://www.youtube.com/channel/UCabelTt5YHot17aKb19VRNA);
