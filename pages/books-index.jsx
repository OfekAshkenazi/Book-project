const { useState, useEffect } = React

import { BookList } from '../cmps/book-list.jsx'
import { BookDetails } from '../cmps/book-details.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookEdit } from '../cmps/book-edit.jsx'

import { bookService } from '../services/books.service.js'

export function BooksIndex() {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState({ txt: '', minPrice: '' })



    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    function loadBooks() {
        bookService.query(filterBy)
            .then(booksToUpDate => {
                setBooks(booksToUpDate)
            })
    }

    function onSelectBook(bookId) {
        bookService.get(bookId).then((book) => {
            setSelectedBook(book)
        })
    }

    function onAddBook(name, price) {
        const book = bookService.createBook(name, price)
        bookService.save(book).then(loadBooks)
    }


    return <section className="books-index">
        {!selectedBook && <div className="">
            <BookFilter onSetFilterBy={onSetFilterBy} />
            <BookEdit onAddBook={onAddBook} />
            <BookList books={books} onSelectBook={onSelectBook} />
        </div>}

        {selectedBook && <BookDetails
            book={selectedBook} onGoBack={() => setSelectedBook(null)} />
        }
    </section>

}
