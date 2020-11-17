import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Index({ data, addToCart }) {
    const [booksData, setBooksData] = useState(data)
    useEffect(async () => {
        if (!data) {
            const res = await fetch(`${process.env.SERVER}/api`)
            const data = await res.json()
            setBooksData(data)
        }
    }, [])

    if (!booksData) {
        return <p>loading...</p>
    }

    return (
        <>
            <ul>
                {booksData.map(item => {
                    return (
                        <li className="list__item" key={item._id}>
                            <Link href="/book/[id]" as={`/book/${item._id}`}>
                                <a>
                                    <img className="list__item-img" src={item.img} alt={item.title} />
                                </a>
                            </Link>
                            <div>
                                <Link href="/[book]/[id]" as={`/book/${item._id}`}>
                                    <a>
                                        <span className="list__item-title">{item.title}</span>
                                    </a>
                                </Link>
                                <div>{item.author}</div>
                                <div>{item.price} &#8381;</div>
                                <button onClick={() => addToCart(item)}>В корзину</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

Index.getInitialProps = async ({ req }) => {
    if (!req) {
        return { data: null }
    }
    const res = await fetch(`${process.env.SERVER}/api`)
    const data = await res.json()
    return { data }
}
