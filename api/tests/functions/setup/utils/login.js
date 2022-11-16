const assert = require('node:assert/strict')
const aws = require('aws-foundation')
const axios = require('axios')

const TEST_USER = 'sm-test@example.com'
const TEST_PASS = 'sm-Pass100'
const TEST_STORE = 'blue'
const POOL_ID = process.env.USERPOOL_ID
const CLIENT_ID = process.env.USERPOOL_CLIENT_ID
const URL = process.env.URL

async function login() {
    const userExists = await aws.default.cognito.getUser({
        email: TEST_USER,
        userPoolId: POOL_ID
    })

    if (!userExists) {
        const { password } = await aws.default.cognito.createUser({
            email: TEST_USER,
            userPoolId: POOL_ID
        })

        const { session } = await aws.default.cognito.loginUser({
            clientId: CLIENT_ID,
            userPoolId: POOL_ID,
            userName: TEST_USER,
            password: password
        })

        const { accessToken } =
            await aws.default.cognito.loginHandleNewPassword({
                session,
                clientId: CLIENT_ID,
                userPoolId: POOL_ID,
                userName: TEST_USER,
                newPassword: TEST_PASS
            })
        return accessToken
    } else {
        const { accessToken } = await aws.default.cognito.loginUser({
            clientId: CLIENT_ID,
            userPoolId: POOL_ID,
            userName: TEST_USER,
            password: TEST_PASS
        })
        return accessToken
    }
}

async function createProduct({ jwt, name, price }) {
    const createStoreUrl = URL + '/store/createproduct'
    await axios.default.post(
        createStoreUrl,
        {
            store: TEST_STORE,
            name: name,
            img: 'placeholder',
            price: price
        },
        {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        }
    )
}

async function getStoresProducts() {
    const createStoreUrl = PUBLIC_URL + '/store/getproducts'
    const result = await axios.default.post(createStoreUrl, {
        store: TEST_STORE
    })

    return result.data
}

async function removeProduct({ jwt, name }) {
    const createStoreUrl = URL + '/store/removeproduct'
    await axios.default.post(
        createStoreUrl,
        {
            store: TEST_STORE,
            name: name
        },
        {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        }
    )
}

module.exports.handler = async () => {
    const jwt = await login()
    await createProduct({
        jwt,
        price: 300,
        name: 'darkcoffee'
    })

    await createProduct({
        jwt,
        price: 200,
        name: 'mediumcoffee'
    })

    await createProduct({
        jwt,
        price: 300,
        name: 'lightcoffee'
    })

    const res = await getStoresProducts()

    assert.deepEqual(res, {
        products: [
            {
                storeId: 'blue',
                productId: 'darkcoffee',
                name: 'darkcoffee',
                price: 300,
                img: 'placeholder'
            },
            {
                storeId: 'blue',
                productId: 'lightcoffee',
                name: 'lightcoffee',
                price: 300,
                img: 'placeholder'
            },
            {
                storeId: 'blue',
                productId: 'mediumcoffee',
                name: 'mediumcoffee',
                price: 200,
                img: 'placeholder'
            }
        ]
    })

    await removeProduct({
        jwt,
        name: 'darkcoffee'
    })

    await removeProduct({
        jwt,
        name: 'mediumcoffee'
    })

    await removeProduct({
        jwt,
        name: 'lightcoffee'
    })

    const resNone = await getStoresProducts()
    assert.deepEqual(resNone, {
        products: []
    })
    //console.log('>> ', res)
}
