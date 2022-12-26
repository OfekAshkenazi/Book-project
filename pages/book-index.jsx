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
    }, [filterBy])

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

    // setUserMsg('home')
    return <section className="books-index">

        <BookFilter onSetFilterBy={onSetFilterBy} />
        <Link to="/book/edit"> <button>Add Book</button></Link>

        <BookList books={books} onRemoveBook={onRemoveBook} />

    </section>

}