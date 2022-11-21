# Coffee App

## Functionality

SuperAdmin

-   ✅ EB -> createStore
-   ✅ EB -> removeStore
-   ✅ EB -> createStoreManager
-   ✅ EB -> removeStoreManager

Employee

-   ✅ API manager -> createEmployee
-   ✅ API manager -> removeEmployee
-   ✅ API manager -> listEmployees

Product

-   ✅ API manager -> setProduct
-   ✅ API manager -> removeProduct
-   ✅ API anyone -> listProducts

Order

-   🔲 API anyone -> placeOrder
-   🔲 API anyone owner -> cancelOrder
-   🔲 API anyone owner -> getOrderDetails
-   🔲 API anyone owner -> getOrderHistory
-   🔲 API anyone owner -> eraseOrderHistory

## Tests

-   E2E Setup Lambda

    -   ✅ createUser if not exist
    -   ✅ createStore if not exist
    -   ✅ login as manager and get jwt

-   E2E Store Management Test Lambda

    -   Employees
    -   ✅ manager creates an employee
    -   ✅ manager lists employees
    -   ✅ manager removes an employee

    -   Products
    -   ✅ manager creates a product
    -   ✅ anyone lists products
    -   ✅ manager removes a product

    -   Order
    -   🔲 anyone places an order
    -   🔲 anyone gets order details as requested
    -   🔲 anyone cancels an order
    -   🔲 anyone gets order details as cancelled
    -   🔲 anyone gets order history with 1 order
    -   🔲 anyone erases order history
    -   🔲 anyone erases order history with no orders

## Dashboard

-   ✅ Traffic
-   ✅ Availabilty
-   ✅ Errors
-   ✅ Canaries
-   🔲 Pipeline

## Alarms

-   🔲 alarm on all function service errors

## CICD

-   ✅ Repo is setup
-   ✅ Pipeline is setup
-   ✅ Delpoys to QA
-   ✅ Tests run as approval step in QA
-   ✅ Delpoys to PROD
-   ✅ Tests as a canary every 5 min in PROD
