import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Add({ data }) {
    const [admin, setAdmin] = useState(data)
    const router = useRouter()

    useEffect(async () => {
        if (data === null) {
            const res = await fetch(`${process.env.SERVER}/api/auth`)
            const data = await res.json()
            if (data.isAdmin === 'admin') {
                return setAdmin(true)
            }
        }
        else if (data === false) {
            router.push('/404')
        }
    }, [])

    const formHandler = e => {
        e.preventDefault()
        const book = {
            title: e.target.title.value,
            author: e.target.author.value,
            price: e.target.price.value,
            img: e.target.img.value,
            description: e.target.description.value
        }
        fetch(`${process.env.SERVER}/api/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        })
        e.target.title.value = ''
        e.target.author.value = ''
        e.target.price.value = ''
        e.target.img.value = ''
        e.target.description.value = ''
    }

    if (admin) {
        return (
            <>
                <form className="add-form" onSubmit={formHandler}>
                    <div>
                        <input type="text" name="title" placeholder="Название" />
                    </div>
                    <div>
                        <input type="text" name="author" placeholder="Автор" />
                    </div>
                    <div>
                        <input type="text" name="price" placeholder="Цена" />
                    </div>
                    <div>
                        <input type="text" name="img" placeholder="url обложки" />
                    </div>
                    <div>
                        <textarea name="description" placeholder="Описание"></textarea>
                    </div>
                    <div>
                        <button type="submit">добавить</button>
                    </div>
                </form>
            </>
        )
    }
    return null
}

Add.getInitialProps = async ({ req }) => {
    if (!req) {
        return { data: null }
    }

    const cookie = req.headers.cookie
    const res = await fetch(`${process.env.SERVER}/api/auth`, {
        headers: { cookie }
    })

    if (res.status !== 204) {
        const data = await res.json()
        if (data.isAdmin === 'user') {
            return { data: false }
        }

        return { data: true }
    }

    return { data: false }
}