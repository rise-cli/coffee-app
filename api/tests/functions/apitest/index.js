const AWS = require('aws-sdk')
const { handler } = require('./integrationTest.js')

module.exports.handler = function (event, context) {
    /**
     * Setup
     */
    const codepipeline = new AWS.CodePipeline()
    const jobId = event['CodePipeline.job'].id
    const putJobSuccess = async (message) => {
        const params = {
            jobId: jobId
        }
        await codepipeline.putJobSuccessResult(params).promise()
        return message
    }

    const putJobFailure = async (message) => {
        const params = {
            jobId: jobId,
            failureDetails: {
                message: JSON.stringify(message),
                type: 'JobFailed',
                externalExecutionId: context.awsRequestId
            }
        }
        await codepipeline.putJobFailureResult(params)
        return message
    }

    handler()
        .then(() => {
            putJobSuccess('Tests passed.')
        })
        .catch((e) => {
            putJobFailure(e)
        })
}
