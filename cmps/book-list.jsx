const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookPreview } from './book-preview.jsx'

export function BookList({ books, onRemoveBook }) {

    if(!books) return <div className="loader">Loading...</div>
    return <ul className="book-list">
        {books.map(book => <li key={book.id}>
            <BookPreview book={book} />
            <div className="btn-book-list-area">
                <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                <Link to={`/book/${book.id}`}><button>Book Details</button></Link>
            </div>
        </li>)}
    </ul>
}