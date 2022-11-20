module.exports = {
    api: {
        listStores: [
            {
                type: 'add',
                pk: 'stores',
                sk: 'store_'
            },
            {
                type: 'db',
                action: 'list'
            }
        ],
        createStore: [
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

        createEmployee: [
            {
                type: 'input',
                storeName: 'string',
                email: 'string'
            },
            {
                type: 'guard',
                pk: 'store_{$storeId}',
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
                    pk: 'store_{$storeId}',
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
                pk: 'store_{$storeId}',
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
                    pk: 'store_{$storeId}',
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
                pk: 'store_{$storeId}',
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
                pk: 'store_{$storeId}',
                sk: 'manager_{!id}'
            },

            {
                type: 'db',
                action: 'set',
                input: {
                    pk: 'store_{$storeName}',
                    sk: 'product_{$productName}'
                }
            }
        ]
    },
    events: {
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
