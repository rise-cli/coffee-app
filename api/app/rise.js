module.exports = {
    api: {
        hello: [
            () => {
                return {
                    message: 'hi'
                }
            }
        ]
    },

    config: {
        name: 'coffeeApi',
        eventBus: 'default'
    }
}
