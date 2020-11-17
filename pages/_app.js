import Layout from '../components/Layout'
import 'normalize.css'
import '../style/style.css'

export default function App({ Component, pageProps }) {
    const addToCart = async book => {
        const res = await fetch(`/api`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        })

        if (res.status === 204) {
            book.count = 1
            const { _id: id, authot, title, count, price, img } = book
            if (localStorage.getItem('cart') !== null) {
                let cart = JSON.parse(localStorage.getItem('cart'))
                const cartHas = cart.filter(item => item.id === id)
                if (cartHas.length === 0) {
                    cart = [...cart, { id, authot, title, count, price, img }]
                    localStorage.setItem('cart', JSON.stringify(cart))
                }
            } else {
                localStorage.setItem('cart', JSON.stringify([{ id, authot, title, count, price, img }]))
            }
        }
    }

    return (
        <Layout>
            <Component {...pageProps} addToCart={addToCart} />
        </Layout>
    )
}

