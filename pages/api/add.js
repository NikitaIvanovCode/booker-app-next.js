import connect_db from '../../utils'
import Books from '../../models/books'

export default async (req, res) => {
    const { method, body } = req
    connect_db()
    switch (method) {
        case 'POST':
            try {
                await Books.create(body)
                res.status(200).json({ message: 'book is added' })
            } catch (error) {
                res.status(400).json({ message: error })
            }
            break
        default:
            res.status(400).json({ message: 'Что-то пошло не так.' })
    }
}