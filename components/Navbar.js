import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Navbar({ isAuth, isAdmin }) {
    const [auth, setAuth] = useState(isAuth)
    const [admin, setAdmin] = useState(isAdmin)
    const router = useRouter()

    useEffect(async () => {
        if (!isAuth) {
            const res = await fetch(`${process.env.SERVER}/api/auth`)
            if (res.status === 200) {
                const data = await res.json()
                if (data.isAdmin === 'admin') {
                    setAuth(true)
                    return setAdmin(true)
                }
                setAuth(true)
                return setAdmin(false)
            }
        }
    })

    const logout = async () => {
        const res = await fetch(`${process.env.SERVER}/api/logout`)
        if (res.status === 200) {
            setAuth(null)
            setAdmin(null)
            router.push('/sign_in')
        }
    }

    return (
        <nav className="nav">
            <div className="nav__title">BOOKER</div>
            <ul className="nav__list">
                <li className="nav__list-item">
                    <Link href="/">
                        <a>Каталог</a>
                    </Link>
                </li>
                {admin ? <li className="nav__list-item">
                    <Link href="/add">
                        <a>Добавить</a>
                    </Link>
                </li> : null}
                <li className="nav__list-item">
                    <Link href="/cart">
                        <a>Корзина</a>
                    </Link>
                </li>
                {!auth ? <li className="nav__list-item">
                    <Link href="/sign_in">
                        <a>Войти</a>
                    </Link>
                </li> :
                    <li className="nav__list-item" onClick={() => logout()}>
                        Выйти
                </li>}
            </ul>
        </nav>
    )
}

Navbar.getInitialProps = async ({ req }) => {
    if (!req) {
        return { auth: null, isAdmin: null }
    }

    const res = await fetch(`${process.env.SERVER}/api/auth`)
    if (res.status === 200) {
        const data = await res.json()
        if (data.isAdmin === 'admin') {
            return { auth: true, isAdmin: true }
        }
        return { auth: true, isAdmin: false }
    }
}

