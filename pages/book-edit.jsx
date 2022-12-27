const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM



import { bookService } from "../services/books.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const { bookid } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if (!bookid) return
        loadBook()
    }, [])


    function loadBook() {
        bookService.get(bookid)
            .then(setBookToEdit)
            .catch((err) => { console.log(err), navigate('/book') })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then((setBookToEdit) => {
                navigate('/book')
            })

    }

    if (!bookToEdit) return <h2>loading...</h2>
    return <section className="book-edit-area">
        <h2>{bookToEdit.id ? 'update this book' : 'Add a new book'}</h2>
        <form className="edit-form" onSubmit={onSaveBook}>

            <label htmlFor="name" >Name: </label>
            <input type="text"
                name="title"
                id="name"
                placeholder="Enter Name..."
                onChange={handleChange}
                value={bookToEdit.title}
            />
            
            <label htmlFor="language" >Language: </label>
            <input type="text"
                name="language"
                id="language"
                placeholder="Enter Language..."
                onChange={handleChange}
                value={bookToEdit.language}
            />
            <label htmlFor="authors" >Author: </label>
            <input type="text"
                name="authors"
                id="authors"
                placeholder="Enter Author..."
                onChange={handleChange}
                value={bookToEdit.authors}
            />
            <label htmlFor="currencyCode" >Currency Code: </label>
            <input type="text"
                name="currencyCode"
                id="currencyCode"
                placeholder="Enter Currency Code..."
                onChange={handleChange}
                value={bookToEdit.currencyCode}
            />
            <label htmlFor="price">Price: </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter Price..."
                onChange={handleChange}
                value={bookToEdit.price}
            />
            <label htmlFor="pageCount">pageCount: </label>
            <input type="number"
                name="pageCount"
                id="pageCount"
                placeholder="Enter page Count..."
                onChange={handleChange}
                value={bookToEdit.pageCount}
            />
            <label htmlFor="publishedDate">Published Date: </label>
            <input type="number"
                name="publishedDate"
                id="publishedDate"
                placeholder="Enter Published Date..."
                onChange={handleChange}
                value={bookToEdit.publishedDate}
            />

            <div className="btn-edit-area">
                {!bookid ? <button>Add</button> : <button>Save</button>}
                <Link to="/book"><button>Cancel</button></Link>
            </div>
        </form>

    </section>
}
