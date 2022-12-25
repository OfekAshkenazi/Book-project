

export function BookPreview({ book }) {



    return <article className="book-preview">

        <h2>Name: {book.title}</h2>
        <h5>Id: {book.id}</h5>
        <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode} For Sale? {book.listPrice.isOnSale ? 'True' : 'False'}</p>
      
    </article>
}