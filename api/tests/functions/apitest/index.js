const AWS = require('aws-sdk')
const { handler } = require('./integrationTest.js')

module.exports.handler = function (event, context) {
    /**
     * Setup
     */
    const codepipeline = new AWS.CodePipeline()
    const jobId = event['CodePipeline.job'].id
    const putJobSuccess = (message) => {
        const params = {
            jobId: jobId
        }
        console.log('PASS 2')
        codepipeline.putJobSuccessResult(params, function (err, data) {
            if (err) {
                console.log('PASS 2 - Fail')
                context.fail(err)
            } else {
                console.log('PASS 2 - Pass')
                context.succeed(message)
            }
        })
    }

    const putJobFailure = (message) => {
        const params = {
            jobId: jobId,
            failureDetails: {
                message: JSON.stringify(message),
                type: 'JobFailed',
                externalExecutionId: context.awsRequestId
            }
        }
        console.log('FAIL 2')
        codepipeline.putJobFailureResult(params, function (err, data) {
            console.log('FAIL 3')
            context.fail(message)
        })
    }

    handler()
        .then(() => {
            console.log('PASS')
            putJobSuccess('Tests passed.')
        })
        .catch((e) => {
            console.log('FAIL')
            putJobFailure(e)
        })
}
