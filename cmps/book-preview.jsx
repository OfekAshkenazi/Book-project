

export function BookPreview({ book }) {


    return <article className="book-preview">

        <h2>{book.title.substring(0, 12)}</h2>
        <h5>Id: {book.id}</h5>
        <img src={book.thumbnail} alt="" />
        <p>Price: {book.price} {book.currencyCode} For Sale? {book.isOnSale ? 'True' : 'False'}</p>

    </article>
}