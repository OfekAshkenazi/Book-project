

export function BookEdit({ onAddBook }) {

    

    function onSubmitBook(ev) {
        ev.preventDefault()
        const name = ev.target['name'].value
        const price = ev.target['price'].value
        onAddBook(name, price)
        ev.target['name'].value = ''
        ev.target['price'].value = ''
    }


    return <section>
        <h2>Add Book</h2>
        <form onSubmit={onSubmitBook}>
            <label>
                Name:
                <input type="text" name="name" id="name" />
            </label>
            <label>
                Price:
                <input type="number" name="price" id="price" />
            </label>
            <button>Add</button>
        </form>
    </section>
}