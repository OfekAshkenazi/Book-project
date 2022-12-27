const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'


import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { bookService } from '../services/books.service.js'

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '', minPrice: '' })
    const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadBooks()
    }, [books, filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(setBooks)
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                const updatedBooks = books.filter(book => book.id !== bookId)
                setBooks(updatedBooks)
                showSuccessMsg('Book Removed')

            })
            .catch((err) => { console.log('erorororor', err) })
    }


    if(!books || !books.length) return <div className="loader">Loading...</div>
    return <section className="books-index">

        <BookFilter onSetFilterBy={onSetFilterBy} />
        <div className="btn-index-area">
            <Link to="/book/edit"> <button>Add Book</button></Link>
            <Link to="/book/bookFromGoogle"> <button>Add Book From Google</button></Link>
        </div>
        <BookList books={books} onRemoveBook={onRemoveBook} />

    </section>

}
