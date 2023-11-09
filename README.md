# Cashier Restful API
Description: This project is built for the needs of the restaurant cashier restful API by implementing the use of models, controllers, and routes.

## Tech Stack
- node.js
- express.js
- mongodb
- mongoose
- Test: mocha, superjest

## Features
- Show a list of food menus
- Add a new menu
- Calculate the price for the customer order
  
## Endpoint
- Menu API
  - ```GET api/menus``` to show all lists of food menus
  - ```POST api/menu``` to add a new menu
- Order API
  - ```POST api/order``` to calculate the price of the customer order and save it to DB
    
## How To Run
- Project
  ```
  npm run start
  ```
- Unit Testing
  ```
  npx run test
  ```
