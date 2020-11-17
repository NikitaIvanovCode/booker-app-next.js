import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Login() {
    const [message, setMessage] = useState('')
    const router = useRouter()

    const loginHandler = async e => {
        e.preventDefault()
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        const res = await fetch(`/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (!res.ok) {
            e.target.password.value = ''
            setMessage(data.message)
        } else {
            router.push('/')
        }
    }

    return (
        <div className="form-log-reg">
            <h2>Войти</h2>
            <form onSubmit={loginHandler}>
                <div>
                    <input type="email" placeholder="email" name="email" />
                </div>
                <div>
                    <input type="password" placeholder="пароль" name="password" />
                </div>
                <div className="log-error">{message}</div>
                <div>
                    <Link href="/sign_up">
                        <a>регистрация</a>
                    </Link>
                    <button type="submit">войти</button>
                </div>
            </form>
        </div>
    )
}