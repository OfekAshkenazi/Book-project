const { Outlet, NavLink, Link } = ReactRouterDOM

export function About() {

    return <section className="about">
        <h3>We Love Books!</h3>
        <p>This app was made by Ofek Ashkenazi in react while study in coding academy</p>

        <nav>
            <Link to="/about">Index</Link> |
            <NavLink to="/about/team">Team</NavLink> |
            <NavLink to="/about/vision">Vision</NavLink>
        </nav>
        <div className="nested-route">
            <Outlet />
        </div>

    </section>
}