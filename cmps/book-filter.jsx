const { useState, useEffect } = React
import { bookService } from '../services/books.service.js'

export function BookFilter({ onSetFilterBy }) {
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        onSetFilterBy(filterBy)
    }, [filterBy])


    function handleChange({ target }) {
        console.log(target.value)
        let { value, name: field, type } = target
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })

    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterBy)
    }


    return <section className="book-filter">
        <h2>Filter my books</h2>
        <form onSubmit={onSubmitFilter}>
            <label>
                Name:
                <input type="text"
                    name="txt"
                    id="name"
                    onChange={handleChange}
                    placeholder="Enter name" />
            </label>
            <label>
                Price:
                <input type="number" name="minPrice" id="minPrice" onChange={handleChange} />
                <button>Filter books</button>
            </label>
        </form>
    </section>
}