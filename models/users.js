import mongoose from 'mongoose'

const users = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    cart: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            author: { type: String, required: true },
            img: { type: String, required: true },
            price: { type: String, required: true },
            count: { type: Number, required: true },
        }
    ]
})

export default mongoose.models.Users || mongoose.model('Users', users)