

export function BookPreview({ book }) {

    function getRightPrice() {
        let price
        if (!book.listPrice.amount) {
            price = book.price
        } else {
            price = book.listPrice.amount
        }
        return price
    }

    return <article className="book-preview">

        <h2>{book.title}</h2>
        <h5>Id: {book.id}</h5>
        <p>Price: {getRightPrice()} {book.listPrice.currencyCode} For Sale? {book.listPrice.isOnSale ? 'True' : 'False'}</p>
        <img src={book.thumbnail} alt="" />

    </article>
}