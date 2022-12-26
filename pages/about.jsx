const { Outlet, Link } = ReactRouterDOM

export function About() {

    return <section className="about">
        <h3>We Love Books!</h3>
        <p>This app was made by ofek ashkenazi in react while study in coding academy</p>

        <nav>
            <Link to="/about">Index</Link> |
            <Link to="/about/team">Team</Link> |
            <Link to="/about/vision">Vision</Link>
        </nav>
        <div className="nested-route">
            <Outlet />
        </div>

    </section>
}