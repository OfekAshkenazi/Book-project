

export function BookPreview({ book }) {

    if(!book) return <div class="loader">Loading...</div>

    return <article key={book.id} className="animate__animated animate__backInLeft book-preview">

        <h2>{book.title.substring(0, 12)}</h2>
        <h5>Id: {book.id}</h5>
        <img src={book.thumbnail} alt="" />
        <p>Price: {book.price} {book.currencyCode} For Sale? {book.isOnSale ? 'True' : 'False'}</p>

    </article>
}

