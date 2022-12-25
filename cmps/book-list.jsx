
import { BookPreview } from './book-preview.jsx'

export function BookList({ books, onSelectBook }) {
    console.log(books)
    
    return <ul className="book-list">
        {books.map(book => <li key={book.id}>
            <BookPreview book={book} />
            <div className="">
                <button onClick={() => onSelectBook(book.id)}>Book Details</button>
            </div>
        </li>)}
    </ul>
}