import connect_db from '../../../utils'
import Books from '../../../models/books'

export default async (req, res) => {
    const { method, query: { id } } = req
    connect_db()

    switch (method) {
        case 'GET':
            try {
                const book = await Books.findById(id)
                res.json(book)
            } catch (error) {
                res.status(400).json({ message: error })
            }
            break
        default:
            res.status(400).json({ message: error })
    }
}