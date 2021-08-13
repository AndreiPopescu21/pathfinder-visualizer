import Layout from "../components/Layout";
import Toolbar from "../components/Toolbar";
import Grid from "../components/Grid.jsx";
import { useState } from "react";

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [selectedClear, setSelectedClear] = useState("");
  const [visualize, setVisualize] = useState(false);
  const [speed, setSpeed] = useState("");
  const [mazeGenerationTehniques, setMazeGenerationTehniques] = useState("");
  const [isMazeGenerating, setIsMazeGenerating] = useState(false);

  return (
    <div>
      <Toolbar selectedAlgorithm={selectedAlgorithm} 
               setSelectedAlgorithm={setSelectedAlgorithm} 
               setSelectedClear={setSelectedClear}
               setVisualize={setVisualize}
               setSelectedSpeed={setSpeed}
               setMazeGenerationTehniques={setMazeGenerationTehniques}
               setIsMazeGenerating={setIsMazeGenerating}/>
      <Layout title={"Pathfinder Visualizer"}>
        <Grid selectedAlgorithm={selectedAlgorithm} 
              selectedClear={selectedClear}
              setSelectedClear={setSelectedClear}
              visualize={visualize}
              setVisualize={setVisualize}
              speed={speed}
              mazeGenerationTehniques={mazeGenerationTehniques}
              isMazeGenerating={isMazeGenerating}
              setMazeGeneratingTehniques={setMazeGenerationTehniques}
              setIsMazeGenerating={setIsMazeGenerating}/>
      </Layout>
    </div>
  )
}
