const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { LongTxt } from "../cmps/long-txt.jsx"


import { bookService } from "../services/books.service.js"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const [PreviousBookId, setPreviousBookId] = useState(null)
    const { bookid } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookid])

    function loadBook() {
        bookService.get(bookid)
            .then(setBook)
            .catch((err) => {
                console.log('cant find book deatails', err)
                onGoBack()
            })
        bookService.getNextBookId(bookid).then(setNextBookId);
        bookService.getPreviousBookId(bookid).then(setPreviousBookId)

    }

    function onGoBack() {
        navigate('/book')
    }

    function PageCountToDisplay(pageCount) {
        if (pageCount > 200) return <p> Descent Reading</p>
        if (pageCount > 500) return <p>Serious Reading</p>
        if (pageCount < 100) return <p>Light Reading </p>
    }

    function PublishedDateToDisplay(publishedDate) {
        if (publishedDate <= 2012) return <p>Vintage</p>
        if (publishedDate >= 2021) return <p>New</p>
    }

    function PriceAmountColor(price) {
        if (price < 20) return 'green'
        if (price > 150) return 'red'
    }


    if (!book) return <h2> loading...</h2>
    return <article className="book-deatails">
        <div className="content">
            <h2>{book.title}</h2>
            <h5>Id: {book.id}</h5>
            <img src={book.thumbnail} alt="" />
            <p className={PriceAmountColor(book.price)}>
                Price: {book.price} {book.currencyCode}
                For Sale? {book.isOnSale ? 'True' : 'False'}
            </p>
            {PageCountToDisplay(book.pageCount)}
            {PublishedDateToDisplay(book.publishedDate)}
            <LongTxt txt={book.description} length={100} />
            {(!book.reviews.length) ? <h2>No Reviews</h2> : <h2>And The Reviews</h2>}
            {book.reviews.length > 0 && book.reviews.map(review => {
                return <div className="review-card">
                    <p>{review.fullname}</p>
                    <p>{'⭐'.repeat(review.rating).substring(0, 5)}</p>
                    <p>{review.readAt}</p>

                </div>
            })}
            <div className="btn-details-area">
                <button onClick={onGoBack}>Go Back</button>
                <Link to={`/book/${PreviousBookId}`}><button>Previous book</button></Link>
                <Link to={`/book/${nextBookId}`}><button>Next book</button></Link>
                <Link to={`/book/edit/${book.id}`}><button>Update me</button></Link>
                <Link to={`/book/${book.id}/review`}><button>Add Reviews</button></Link>
            </div>
        </div>
    </article>

}