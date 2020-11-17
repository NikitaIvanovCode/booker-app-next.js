const bcrypt = require('bcryptjs')
import connect_db from '../../utils'
import Users from '../../models/users'

export default async (req, res) => {
    const { method, body: { email, password, confirm_password } } = req
    connect_db()

    switch (method) {
        case 'POST':
            const pritindent = await Users.findOne({ email })
            if (!pritindent) {
                try {
                    if (password === confirm_password) {
                        const hashed_password = await bcrypt.hash(password, 12)
                        await Users.create({ email, password: hashed_password, status: 'user' })
                        return res.status(200).json({ message: 'Пользователь зарегестрирован.' })
                    }
                    return res.status(400).json({ message: 'Пароли не совпадают.' })
                } catch (e) {
                    return res.status(400).json({ message: 'Ошибка регистрации.' })
                }
            } else {
                return res.status(400).json({ message: 'Пользователь уже существует.' })
            }
            break
        default:
            return res.status(400).json({ message: 'Ошибка регистрации.' })
    }
}