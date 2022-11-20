module.exports = {
    name: 'coffee-app-pipeline',
    stages: [
        {
            name: 'Source',
            actions: [
                {
                    type: 'SOURCE',
                    name: 'source',
                    repo: 'coffee-app',
                    owner: 'rise-cli',
                    outputArtifact: 'sourceZip'
                }
            ]
        },
        {
            name: 'QA',
            actions: [
                {
                    type: 'BUILD',
                    name: 'deployApp',
                    script: '/deployApp.yml',
                    env: {
                        STAGE: 'qa'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'qaBuildZip'
                },
                {
                    type: 'BUILD',
                    name: 'deployTests',
                    script: '/deployTest.yml',
                    env: {
                        STAGE: 'qa'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'qaTestBuildZip'
                },
                {
                    type: 'INVOKE',
                    name: 'runTests',
                    functionName: 'coffeeApiCanary-apitest-qa',
                    stage: 'us-east-1'
                }
            ]
        },
        {
            name: 'PROD',
            actions: [
                {
                    type: 'BUILD',
                    name: 'deployApp',
                    script: '/deployApp.yml',
                    env: {
                        STAGE: 'prod'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'prodBuildZip'
                },
                {
                    type: 'BUILD',
                    name: 'deployCanary',
                    script: '/deployCanary.yml',
                    env: {
                        STAGE: 'prod'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'prodCanaryBuildZip'
                }
            ]
        }
    ]
}
