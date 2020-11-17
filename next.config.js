module.exports = {
    env: {
        MONGODB_URI: 'mongodb uri',
        TOKEN: 'secret word',
        SERVER: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://your_deployment.server.com'
    }
}

