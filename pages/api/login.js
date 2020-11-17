import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import connect_db from '../../utils'
import Users from '../../models/users'

export default async (req, res) => {
    const { body: { email, password } } = req
    connect_db()

    const user = await Users.findOne({ email })
    if (user) {
        const comparedPassword = await bcrypt.compare(password, user.password)
        if (comparedPassword) {
            const token = jwt.sign({ userId: user._id }, process.env.TOKEN, { expiresIn: '24h' })
            res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 86400,
                path: '/'
            }))
            return res.status(200).json(user.cart)
        } else {
            return res.status(400).json({ message: 'Неверные данные.' })
        }
    }

    return res.status(400).json({ message: 'Неверные данные.' })
}