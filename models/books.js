import mongoose from 'mongoose'

const books = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true }
})

export default mongoose.models.Books || mongoose.model('Books', books)