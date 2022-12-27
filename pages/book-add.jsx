const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React


import { googleBookService } from '../services/book-google.service.js'
import { bookService } from '../services/books.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js';


export function BookAdd() {
    const [booksFromGoogle, setBooksFromGoogle] = useState([])
    const navigate = useNavigate()
    function onAddGoogleBook(bookId) {
        googleBookService.getGoogleBook(bookId)
            .then((book) => {
                bookService.saveGoogleBook(book)
                showSuccessMsg('book saved')
                navigate('/book')

            })
    }

    function onSearchGoogleBook(ev) {
        ev.preventDefault()
        let name = ev.target['name'].value
        googleBookService.query(name).then(setBooksFromGoogle)
        showSuccessMsg('Search Success')
    }

    return <section className="book-add">
        <h2>hello from bookadd</h2>
        <div className="book-add-content">
            <form onSubmit={onSearchGoogleBook}>
                <input type="text"
                    name="name"
                />
                <button>Search</button>
            </form>

            {booksFromGoogle && <ul>
                {booksFromGoogle.map(book => {
                    return <li key={book.id}>
                        {book.title} <button onClick={() => onAddGoogleBook(book.id)}>+</button>
                    </li>
                })}
            </ul>}
            <Link to="/book"> <button>Go Back</button></Link>
        </div>
    </section>
}