const aws = require('aws-foundation')
const awssdk = require('aws-sdk')
const axios = require('axios')

const TEST_USER = 'sm-test@example.com'
const TEST_PASS = 'sm-Pass100'
const TEST_STORE = 'blue'
const TABLE = 'coffeeApiqatable'
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

async function risePost(jwt, data) {
    return await axios.default.post(URL, data, {
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    })
}

async function setupStoreData(storeName, managerId) {
    const dynamoDb = new awssdk.DynamoDB.DocumentClient({
        region: process.env.REGION || 'us-east-1'
    })

    await dynamoDb
        .put({
            TableName: TABLE,
            Item: {
                pk: `store_${storeName}`,
                sk: `manager_${managerId}`
            }
        })
        .promise()
    await dynamoDb
        .put({
            TableName: TABLE,
            Item: {
                pk: `stores`,
                sk: `store_${storeName}`
            }
        })
        .promise()
}

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

module.exports.handler = async () => {
    const jwt = await login()

    const managerId = parseJwt(jwt).sub
    await setupStoreData(TEST_STORE, managerId)

    /**
     * Create, List, Remove Employee test
     */
    await risePost(jwt, {
        action: 'createEmployee',
        input: {
            storeName: TEST_STORE,
            email: 'employee@example.com'
        }
    })
    const result = await risePost(jwt, {
        action: 'listEmployees',
        input: {
            storeName: TEST_STORE
        }
    })

    if (result.data.length !== 1) {
        throw new Error('employee was not created')
    }

    await risePost(jwt, {
        action: 'removeEmployee',
        input: {
            storeName: TEST_STORE,
            email: 'employee@example.com'
        }
    })
    const result2 = await risePost(jwt, {
        action: 'listEmployees',
        input: {
            storeName: TEST_STORE
        }
    })

    if (result2.data.length !== 0) {
        throw new Error('employee was not deleted')
    }

    /**
     * Create, List, Remove products test
     */
    await risePost(jwt, {
        action: 'setProduct',
        input: {
            storeName: TEST_STORE,
            productName: 'coffee',
            price: 300,
            img: 'placeholder'
        }
    })
    const productResult = await risePost(jwt, {
        action: 'listProducts',
        input: {
            storeName: TEST_STORE
        }
    })

    if (productResult.data.length !== 1) {
        throw new Error('product was not created')
    }

    await risePost(jwt, {
        action: 'removeProduct',
        input: {
            storeName: TEST_STORE,
            productName: 'coffee'
        }
    })
    const productResult2 = await risePost(jwt, {
        action: 'listProducts',
        input: {
            storeName: TEST_STORE
        }
    })

    if (productResult2.data.length !== 0) {
        throw new Error('product was not deleted')
    }

    return {
        status: 'success'
    }
}
