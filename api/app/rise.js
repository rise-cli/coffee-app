module.exports = {
    api: {
        listEmployees: [
            {
                type: 'input',
                storeName: 'string'
            },
            {
                type: 'guard',
                pk: 'store_{$storeName}',
                sk: 'manager_{!id}'
            },
            {
                type: 'add',
                pk: 'store_{$storeName}',
                sk: 'employee_'
            },
            {
                type: 'db',
                action: 'list'
            }
        ],

        createEmployee: [
            {
                type: 'input',
                storeName: 'string',
                email: 'string'
            },
            {
                type: 'guard',
                pk: 'store_{$storeName}',
                sk: 'manager_{!id}'
            },

            {
                type: 'user',
                action: 'add',
                email: '$email'
            },
            {
                type: 'db',
                action: 'set',
                input: {
                    pk: 'store_{$storeName}',
                    sk: 'employee_{$userId}',
                    tempPass: '$password'
                }
            }
        ],

        removeEmployee: [
            {
                type: 'input',
                storeName: 'string',
                email: 'string'
            },
            {
                type: 'guard',
                pk: 'store_{$storeName}',
                sk: 'manager_{!id}'
            },
            {
                type: 'user',
                action: 'remove',
                email: '$email'
            },
            {
                type: 'db',
                action: 'remove',
                input: {
                    pk: 'store_{$storeName}',
                    sk: 'employee_{$userId}',
                    tempPass: '$password'
                }
            }
        ],
        setProduct: [
            {
                type: 'input',
                storeName: 'string',
                productName: 'string',
                price: 'number',
                img: 'string'
            },
            {
                type: 'guard',
                pk: 'store_{$storeName}',
                sk: 'manager_{!id}'
            },
            {
                type: 'db',
                action: 'set',
                input: {
                    pk: 'store_{$storeName}',
                    sk: 'product_{$productName}',
                    storeName: '$storeName',
                    productName: '$productName',
                    price: '$price',
                    img: '$img'
                }
            }
        ],
        removeProduct: [
            {
                type: 'input',
                storeName: 'string',
                productName: 'string'
            },
            {
                type: 'guard',
                pk: 'store_{$storeName}',
                sk: 'manager_{!id}'
            },

            {
                type: 'db',
                action: 'remove',
                input: {
                    pk: 'store_{$storeName}',
                    sk: 'product_{$productName}'
                }
            }
        ],
        listProducts: [
            {
                type: 'input',
                storeName: 'string'
            },
            {
                type: 'add',
                pk: 'store_{$storeName}',
                sk: 'product_'
            },
            {
                type: 'db',
                action: 'list'
            }
        ]
    },
    events: {
        createStore: [
            {
                type: 'event-source',
                source: 'admin',
                event: 'createStoreRequested'
            },
            {
                type: 'input',
                name: 'string'
            },
            {
                type: 'add',
                pk: 'stores',
                sk: 'store_{$name}'
            },
            {
                type: 'db',
                action: 'set'
            }
        ],
        removeStore: [
            {
                type: 'event-source',
                source: 'admin',
                event: 'removeStoreRequested'
            },
            {
                type: 'input',
                name: 'string'
            },
            {
                type: 'add',
                pk: 'stores',
                sk: 'store_{$name}'
            },
            {
                type: 'db',
                action: 'remove'
            }
        ],

        createManager: [
            {
                type: 'event-source',
                source: 'admin',
                event: 'createManagerRequested'
            },
            {
                type: 'input',
                storeName: 'string',
                email: 'string'
            },
            {
                type: 'user',
                action: 'add',
                email: '$email'
            },
            {
                type: 'db',
                action: 'set',
                input: {
                    pk: 'store_{$storeId}',
                    sk: 'manager_{$userId}'
                }
            },
            {
                type: 'db',
                action: 'set',
                input: {
                    pk: 'store_{$storeId}',
                    sk: 'employee_{$userId}',
                    tempPass: '$password'
                }
            }
        ],
        removeManager: [
            {
                type: 'event-source',
                source: 'admin',
                event: 'removeManagerRequested'
            },
            {
                type: 'input',
                storeName: 'string',
                email: 'string'
            },
            {
                type: 'user',
                action: 'remove',
                email: '$email'
            },
            {
                type: 'db',
                action: 'remove',
                input: {
                    pk: 'store_{$storeId}',
                    sk: 'manager_{$userId}'
                }
            },
            {
                type: 'db',
                action: 'remove',
                input: {
                    pk: 'store_{$storeId}',
                    sk: 'employee_{$userId}',
                    tempPass: '$password'
                }
            }
        ]
    },

    config: {
        name: 'coffeeApi',
        eventBus: 'default'
    }
}
