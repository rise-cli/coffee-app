const aws = require('aws-foundation')
const axios = require('axios')

const TEST_USER = 'sm-test@example.com'
const TEST_PASS = 'sm-Pass100'
const TEST_STORE = 'blue'
const POOL_ID = process.env.USERPOOL_ID
const CLIENT_ID = process.env.USERPOOL_CLIENT_ID
const URL = 'https://8d1zof5ua7.execute-api.us-east-1.amazonaws.com/'

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

module.exports.handler = async () => {
    const jwt = await login()
    try {
        await risePost(jwt, {
            action: 'createStore',
            input: {
                name: 'blue'
            }
        })
        const result = await risePost(jwt, {
            action: 'listStores',
            input: {}
        })
        console.log('>>> ', result.data)
        await risePost(jwt, {
            action: 'removeStore',
            input: {
                name: 'blue'
            }
        })
    } catch (e) {
        console.log('THE ERR: ', e)
    }
}
