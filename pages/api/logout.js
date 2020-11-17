import cookie from 'cookie'

export default async (req, res) => {
    res.setHeader('Set-Cookie', cookie.serialize('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: -1,
        path: '/'
    }))
    return res.status(200).end()
}