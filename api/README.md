# Coffee Api

## Functionality

-   ✅ EB -> createStore
-   ✅ EB -> removeStore
-   ✅ EB -> createStoreManager
-   ✅ EB -> removeStoreManager

-   ✅ API -> createEmployee
-   ✅ API -> removeEmployee
-   ✅ API -> listEmployees

-   🔲 API -> setProduct
-   🔲 API -> removeProduct
-   🔲 API -> listProducts

## Tests

-   E2E Setup Lambda

    -   ✅ createUser if not exist
    -   ✅ login as manager and get jwt

-   E2E Store Management Test Lambda

    -   🔲 as manager, create 3 products
    -   🔲 as public, get stores products
    -   🔲 as manager, update 1 product
    -   🔲 as public, get updated store products
    -   🔲 as manager, remove 3 products
    -   🔲 as public, get 0 store products

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
