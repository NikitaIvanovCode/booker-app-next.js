import mongoose from 'mongoose'

const connection = {}

async function connect_db() {
    if (connection.isConnected) {
        return
    }

    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })

    connection.isConnected = true
}

export default connect_db
