const AWS = require('aws-sdk')
const { handler } = require('./integrationTest.js')

module.exports.handler = function (event, context) {
    const codepipeline = new AWS.CodePipeline()
    const jobId = event['CodePipeline.job'].id
    const putJobSuccess = (message) => {
        const params = {
            jobId: jobId
        }
        console.log('PASS 2')
        codepipeline.putJobSuccessResult(params, function (err, data) {
            if (err) {
                context.fail(err)
            } else {
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

        codepipeline.putJobFailureResult(params, function (err, data) {
            context.fail(message)
        })
    }

    handler()
        .then(() => {
            putJobSuccess('Tests passed.')
        })
        .catch((e) => {
            putJobFailure(e)
        })
}
