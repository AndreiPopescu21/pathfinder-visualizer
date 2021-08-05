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
            </footer>
        </div>
    );
}

export default Layout;