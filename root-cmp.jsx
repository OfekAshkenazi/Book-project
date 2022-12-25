const { useState } = React

import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { BooksIndex } from './pages/books-index.jsx'

export function App() {
    const [page, setPage] = useState('books')

    return <section className="app">
        <header className="app-header">
            <h1>My App</h1>
            <nav className="app-nav">
                <a href="#" onClick={() => setPage('home')}>Home</a>
                <a href="#" onClick={() => setPage('books')}>Books</a>
                <a href="#" onClick={() => setPage('about')}>About</a>
            </nav>
        </header>
        <main>
            {page === 'home' && <Home />}
            {page === 'books' && <BooksIndex />}
            {page === 'about' && <About />}
        </main>
    </section>
}