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
                    name: 'build',
                    script: '/build.yml',
                    env: {
                        STAGE: 'qa'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'qaBuildZip'
                }
            ]
        },
        {
            name: 'PROD',
            actions: [
                {
                    type: 'BUILD',
                    name: 'build',
                    script: '/build.yml',
                    env: {
                        STAGE: 'prod'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'prodBuildZip'
                }
            ]
        }
        // {
        //     name: 'PROD',
        //     actions: [
        //         {
        //             type: 'BUILD',
        //             name: 'publish',
        //             script: '/publish.yml',
        //             env: {
        //                 NPM_TOKEN: '@secret.NPM_KEY'
        //             },
        //             inputArtifact: 'sourceZip',
        //             outputArtifact: 'publishedZip'
        //         }
        //     ]
        // }
    ]
}
