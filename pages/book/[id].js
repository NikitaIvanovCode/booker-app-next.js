import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Book({ data, addToCart }) {
    const router = useRouter()
    const [book, setBook] = useState(data)
    useEffect(async () => {
        if (!data) {
            const res = await fetch(`/api/book/${router.query.id}`)
            const data = await res.json()
            setBook(data)
        }
    }, [])

    if (!book) {
        return <p>loading...</p>
    }

    return (
        <div className="book">
            <div className="book-pres">
                <div className="book-title">{book.title}</div>
                <div>{book.author}</div>
                <img className="book-img" src={book.img} alt={book.title} />
            </div>
            <div>Описание: {book.description}</div>
            <div className="book-price">Цена: {book.price} &#8381;</div>
            <button onClick={() => addToCart(book)}>В корзину</button>
        </div>
    )

}

Book.getInitialProps = async ({ req, query }) => {
    if (!req) {
        return { props: { data: null } }
    }

    const res = await fetch(`${process.env.SERVER}/api/book/${query.id}`)
    console.log(req)
    const data = await res.json()
    return { data }
}
