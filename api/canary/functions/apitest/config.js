module.exports.config = {
    schedule: 5,
    env: {
        URL: '{@output.coffeeApiprod.ApiUrl}',
        USERPOOL_ID: '{@output.coffeeApiprod.UserPoolId}',
        USERPOOL_CLIENT_ID: '{@output.coffeeApiprod.UserPoolClientId}'
    }
}
