module.exports.config = {
    env: {
        URL: '{@output.coffeeApiqa.ApiUrl}',
        USERPOOL_ID: '{@output.coffeeApiqa.UserPoolId}',
        USERPOOL_CLIENT_ID: '{@output.coffeeApiqa.UserPoolClientId}'
    },
    // this * permission is for testing, will lock down
    permissions: [
        {
            Effect: 'Allow',
            Action: '*',
            Resource: '*'
        }
    ]
}
