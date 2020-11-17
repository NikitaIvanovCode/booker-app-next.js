import Users from '../../models/users'
import jwt from 'jsonwebtoken'
import connect_db from '../../utils'

export default async (req, res) => {
    connect_db()
    const token = req.cookies.auth
    if (!token) {
        return res.status(204).end()
    }
    const decoded = jwt.verify(token, process.env.TOKEN)
    const id = decoded.userId
    const user = await Users.findById(id)
    switch (req.method) {
        case 'GET':
            try {
                return res.status(200).json(user.cart)
            } catch {
                return res.status(400).json({ message: 'Что-то пошло не так.' })
            }
        case 'PUT':
            try {
                const { id: bookId, value } = req.body
                const idx = user.cart.findIndex(({ id }) => id === bookId)
                user.cart[idx].count = value
                await user.save()
                return res.status(200).json(user.cart)
            } catch {
                return res.status(400).json({ message: 'Что-то пошло не так.' })
            }
        case 'DELETE':
            try {
                const bookId = req.body
                const cart = await user.cart.filter(({ id }) => id !== bookId)
                user.cart = cart
                await user.save()
                return res.status(200).json(cart)
            } catch {
                return res.status(400).json({ message: 'Что-то пошло не так.' })
            }
        default:
            return res.status(400).json({ message: 'Что-то пошло не так.' })
    }
}