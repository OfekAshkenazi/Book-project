const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM




import { showSuccessMsg } from '../services/event-bus.service.js';
import { bookService } from "../services/books.service.js"


export function BookReview() {
    const [bookToReview, setBookToReview] = useState({})
    const [review, setReview] = useState({ fullname: '', rating: '', readAt: new Date() })

    const { bookid } = useParams()
    const navigate = useNavigate()
    // { fullname: '', rating: '', readAt: '' }

    useEffect(() => {
        if (!bookid) return
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookid)
            .then(setBookToReview)
            .catch((err) => { console.log(err), navigate(`/book/${bookid}`) })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setReview((review) => ({ ...review, [field]: value }))
    }

    function onSaveReview(ev) {
        console.log('work>')
        ev.preventDefault()
        const reviews = bookToReview.reviews
        reviews.push(review)
        bookService.save(bookToReview)
            .then((bookToReview) => {
                onGoBack()
                showSuccessMsg('Reivew Add')

            })
            .catch((err) => console.log(err))
    }


    function onGoBack() {
        navigate(`/book/${bookToReview.id}`)
    }


    return <section className="book-review">
        <h2>Hello Thank you very much for your support</h2>

        <img src={bookToReview.thumbnail} alt="" />

        <form onSubmit={onSaveReview}>
            <label htmlFor="fullname" >FullName : </label>
            <input type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter Name..."
                onChange={handleChange}
            />
            <label htmlFor="rating">Rating: </label>
            <input type="number"
                name="rating"
                id="rating"
                placeholder="Enter Rating..."
                onChange={handleChange}
            />

            <div className="btn-edit-area">
                <button>Add</button>
                <Link to={`/book/${bookToReview.id}`}><button>Go Back</button></Link>
            </div>
        </form>


    </section>
}