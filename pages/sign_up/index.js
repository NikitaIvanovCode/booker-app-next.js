import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Login() {
    const [message, setMessage] = useState('')
    const router = useRouter()

    const regHandler = async e => {
        e.preventDefault()
        const user = {
            email: e.target.email.value,
            password: e.target.password.value,
            confirm_password: e.target.confirmPassword.value
        }
        const res = await fetch(`/api/registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        if (!res.ok) {
            const data = await res.json()
            setMessage(data.message)
        } else {
            router.push('/sign_in')
        }
    }

    return (
        <div className="form-log-reg">
            <h2>Регистрация</h2>
            <form onSubmit={regHandler}>
                <div>
                    <input type="email" placeholder="email" name="email" />
                </div>
                <div>
                    <input type="password" placeholder="пароль" name="password" />
                </div>
                <div>
                    <input type="password" placeholder="повторите пароль" name="confirmPassword" />
                </div>
                <div className="log-error">{message}</div>
                <div>
                    <Link href="/sign_in">
                        <a>войти</a>
                    </Link>
                    <button type="submit">отправить</button>
                </div>
            </form>
        </div>
    )
}