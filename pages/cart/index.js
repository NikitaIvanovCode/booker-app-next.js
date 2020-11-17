import { useEffect, useState } from "react"

export default function Cart({ data }) {
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState(null)
    const [sum, setSum] = useState(0)

    const getCartLS = () => {
        const ls_cart = JSON.parse(localStorage.getItem('cart'))
        return ls_cart
    }

    const isCartLS = () => {
        if (localStorage.getItem('cart') !== null) {
            return setCart(getCartLS())
        }
    }

    useEffect(async () => {
        if (data === 'no_req') {
            const res = await fetch(`/api/cart`)
            if (res.status === 204) {
                setLoading(false)
                return isCartLS()
            }
            const user_cart = await res.json()
            setLoading(false)
            return setCart(user_cart)
        }
        else if (data) {
            setLoading(false)
            return setCart(data)
        }
        setLoading(false)
        return isCartLS()
    }, [])

    useEffect(() => {
        if (cart !== null) {
            let sum = 0
            cart.map(item => {
                sum += item.count * item.price
            })
            setSum(sum)
        }
    })

    const countHandler = async e => {
        const value = e.target.value
        const bookId = e.target.dataset.id

        const res = await fetch(`/api/cart`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: bookId, value })
        })

        if (res.status === 204) {
            if (value < 1) {
                return removeBtnHandler(bookId)
            }
            const idx = cart.findIndex(({ id }) => id === bookId)
            const cartLS = getCartLS()
            cartLS[idx].count = value
            localStorage.setItem('cart', JSON.stringify(cartLS))
            return setCart(cartLS)
        }

        if (value < 1) {
            return removeBtnHandler(bookId)
        }
        const newCart = await res.json()
        setCart(newCart)
    }

    const removeBtnHandler = async bookId => {
        const res = await fetch(`/api/cart`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookId)
        })

        if (res.status === 204) {
            const idx = cart.findIndex(({ id }) => id === bookId)
            const cartLS = getCartLS()
            const new_cart = [...cartLS.slice(0, idx), ...cartLS.slice(idx + 1)]
            if (new_cart.length === 0) {
                localStorage.removeItem('cart')
                return setCart(null)
            } else {
                setCart([...cartLS.slice(0, idx), ...cartLS.slice(idx + 1)])
                return localStorage.setItem('cart', JSON.stringify(new_cart))
            }
        }

        const data = await res.json()
        setCart(data)
    }

    if (loading) {
        return <p>loading...</p>
    }

    if (!cart || cart.length === 0) {
        return <p>В корзине нет книг.</p>
    }

    return (
        <>
            <ul className="cart">
                {cart.map(({ id, title, price, count, img }) => {
                    return (
                        <li className="cart__item" key={id}>
                            <img className="cart__item-img" src={img} alt={title} />
                            <div className="cart__item-info">
                                <div>{title}</div>
                            </div>
                            <div>{price} &#8381;</div>
                            <input className="cart__item-count" type="number" defaultValue={count} data-id={id} onChange={countHandler} />
                            <button onClick={() => removeBtnHandler(id)}>удалить</button>
                        </li>
                    )
                })}
                <div className="cart__sum">Сумма к оплате: {sum} &#8381;</div>
            </ul>
        </>
    )
}

Cart.getInitialProps = async ({ req }) => {
    if (!req) {
        return { data: 'no_req' }
    }

    const cookie = req.headers.cookie
    if (cookie) {
        const res = await fetch(`${process.env.SERVER}/api/cart`, {
            headers: { cookie }
        })

        const data = await res.json()
        return { data }
    } else {
        return { data: null }
    }
}