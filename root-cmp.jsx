const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM


import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { BookIndex } from './pages/book-index.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { BookEdit } from './pages/book-edit.jsx'
import { BookDetails } from './pages/book-details.jsx'
import { UserMsg } from './cmps/user-msg.jsx'
import { AboutIndex } from './cmps/about-index.jsx'
import { Team } from './cmps/team.jsx'
import { Vision } from './cmps/vision.jsx'
import { BookReview } from './cmps/book-review.jsx'

export function App() {


    return <Router>
        <section className="app">

            <AppHeader />

            <main className="full main-layout">
                <Routes>
                    <Route element={<Home />} path="/" />

                    <Route element={<About />} path="/about">
                        <Route element={<AboutIndex />} path="/about" />
                        <Route element={<Team />} path="/about/team" />
                        <Route element={<Vision />} path="/about/vision" />
                    </Route>
                    <Route element={<BookIndex />} path="/book" />
                    <Route element={<BookReview />} path="/book/:bookid/review" />
                    <Route element={<BookEdit />} path="/book/edit" />
                    <Route element={<BookEdit />} path="/book/edit/:bookid" />
                    <Route element={<BookDetails />} path="/book/:bookid" />


                </Routes>

            </main>

            <UserMsg />
        </section>
    </Router>
}