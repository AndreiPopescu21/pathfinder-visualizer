import Head from 'next/head'

const Layout = ({title, children}) => {
    return (
        <div>
            <Head>
                <title>{title ?? "Pathfinder Visualizer"}</title>
                <meta name="description" content="Pathfinder Visualizer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                {children}
            </main>
            <hr/>
            
            <footer>
                Copyright © 2021 Andrei Cristian Popescu
            </footer>
        </div>
    );
}

export default Layout;