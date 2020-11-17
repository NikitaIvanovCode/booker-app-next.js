import jwt from 'jsonwebtoken'
import Users from '../../models/users'
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
    if (user) {
        if (user.status === 'admin') {
            return res.status(200).json({ isAdmin: user.status })
        }
        return res.status(200).json({ isAdmin: user.status })
    }
}
