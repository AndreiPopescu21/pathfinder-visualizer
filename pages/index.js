import Layout from "../components/Layout";
import Toolbar from "../components/Toolbar";
import Grid from "../components/Grid.jsx";

export default function Home() {
  return (
    <div>
      <Toolbar/>
      <Layout title={"Pathfinder Visualizer"}>
        <Grid/>
      </Layout>
    </div>
  )
}
