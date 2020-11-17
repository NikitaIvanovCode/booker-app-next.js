import Link from 'next/link'

export default function Error() {
    return (
        <div className="error">
            <h1>Ошибка 404.</h1>
            <Link href="/">
                <a>Вернуться на главную страницу.</a>
            </Link>
        </div>
    )
}
