import connect_db from '../../utils'
import Books from '../../models/books'
import Users from '../../models/users'
import jwt from 'jsonwebtoken'

export default async (req, res) => {
    const { method, body: { _id: idBook, title, author, count = 1, price, img } } = req
    connect_db()
    switch (method) {
        case 'GET':
            try {
                const books = await Books.find({})
                res.json(books)
            } catch (error) {
                res.status(400).json({ message: error })
            }
            break
        case 'POST':
            try {
                const token = req.cookies.auth
                if (!token) {
                    return res.status(204).end()
                }
                const decoded = jwt.verify(token, process.env.TOKEN)
                const id = decoded.userId
                const user = await Users.findById(id)
                const isInCart = user.cart.filter(({ id }) => id === idBook)
                if (isInCart.length !== 0) {
                    return res.json({ message: 'Книга уже есть в корзине.' })
                } else {
                    user.cart = await [...user.cart, { id: idBook, title, author, count, price, img }]
                    await user.save()
                    return res.json({ message: 'Книга добавлена в корзину.' })
                }
            } catch (error) {
                res.status(400).json({ message: 'Что-то пошло не так.' })
            }
            break
        default:
            res.status(400).json({ message: 'Что-то пошло не так.' })
    }
}
