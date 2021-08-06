import Layout from "../components/Layout";
import Toolbar from "../components/Toolbar";
import Grid from "../components/Grid.jsx";
import { useState } from "react";

export default function Home() {
  const [selectedClear, setSelectedClear] = useState("");

  return (
    <div>
      <Toolbar setSelectedClear={setSelectedClear}/>
      <Layout title={"Pathfinder Visualizer"}>
        <Grid selectedClear={selectedClear}/>
      </Layout>
    </div>
  )
}
