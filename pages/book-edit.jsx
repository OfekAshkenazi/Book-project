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
        bookService.save(bookToEdit).then(navigate('/book'))

    }

    if (!bookToEdit) return <h2>loading...</h2>
    return <section>
        <h2>{bookToEdit.id ? 'update this book' : 'Add a new book'}</h2>
        <form onSubmit={onSaveBook}>
            <label htmlFor="name" >Name : </label>
            <input type="text"
                name="title"
                id="name"
                placeholder="Enter Name..."
                onChange={handleChange}
            // value={bookToEdit.title}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter Price..."
                onChange={handleChange}
            // value={bookToEdit.listPrice.amount}
            />

            <div className="btn-edit-area">
                <button>Add</button>
                <Link to="/book"><button>Cancel</button></Link>
            </div>
        </form>
    </section>
}
