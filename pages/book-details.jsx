const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { LongTxt } from "../cmps/long-txt.jsx"


import { bookService } from "../services/books.service.js"

export function BookDetails() {
    const [book, setBook] = useState(null)
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

    function getRightPrice() {
        let price
        if (!book.listPrice.amount) {
            price = book.price
        } else {
            price = book.listPrice.amount
        }
        return price
    }

    if (!book) return <h2> loading...</h2>
    return <article className="book-deatails">
        <div className="content">

            <h2>the book</h2>
            <h2>{book.title}</h2>
            <h5>Id: {book.id}</h5>
            <p className={PriceAmountColor(getRightPrice())}>
                Price: {getRightPrice()} {book.listPrice.currencyCode}
                For Sale? {book.listPrice.isOnSale ? 'True' : 'False'}
            </p>
            {PageCountToDisplay(book.pageCount)}
            {PublishedDateToDisplay(book.publishedDate)}
            <LongTxt txt={book.description} length={100} />
            {(!book.reviews.length) ? <h2>No Reviews</h2> : <h2>And The Reviews</h2>}
            {book.reviews.length > 0 && book.reviews.map(review => {
                return <div className="review-card">
                    <p>{review.fullname}</p>
                    <p>{review.rating}</p>
                    <p>{review.readAt}</p>

                </div>
            })}
            <img src={book.thumbnail} alt="" />
            <div className="btn-details-area">
                <button onClick={onGoBack}>Go Back</button>
                <Link to={`/book/edit/${book.id}`}><button>Update me</button></Link>
                <Link to={`/book/${book.id}/review`}><button>Reviews</button></Link>
            </div>
        </div>
    </article>

}