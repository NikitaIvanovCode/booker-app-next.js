import Head from 'next/head'
import Navbar from './Navbar'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                <title>Booker</title>
            </Head>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}