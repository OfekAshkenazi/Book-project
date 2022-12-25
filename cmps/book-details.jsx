

export function BookDetails({ book, onGoBack }) {

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
        console.log(price)
        if (price < 20 ) return 'green'
        if (price > 150 ) return 'red'
    }

    return <section>
        <h2>the book</h2>
        <article className="book-deatails">
            <h2>Name: {book.title}</h2>
            <h5>Id: {book.id}</h5>
            <p className={PriceAmountColor(book.listPrice.amount)}>Price: {book.listPrice.amount} {book.listPrice.currencyCode} For Sale? {book.listPrice.isOnSale ? 'True' : 'False'}</p>
            {PageCountToDisplay(book.pageCount)}
            {PublishedDateToDisplay(book.publishedDate)}
            <button onClick={onGoBack}>Go Back</button>
        </article>
    </section>
}