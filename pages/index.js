import { useState } from "react";

import Toolbar from "../components/Toolbar";
import Grid from "../components/Grid.jsx";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

import Layout from "../components/Layout";
import Tutorial from "../components/Tutorial";

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [selectedClear, setSelectedClear] = useState("");
  const [visualize, setVisualize] = useState(false);
  const [speed, setSpeed] = useState("");
  const [mazeGenerationTehniques, setMazeGenerationTehniques] = useState("");
  const [isMazeGenerating, setIsMazeGenerating] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <div>
      <Toolbar selectedAlgorithm={selectedAlgorithm} 
               setSelectedAlgorithm={setSelectedAlgorithm} 
               setSelectedClear={setSelectedClear}
               setVisualize={setVisualize}
               setSelectedSpeed={setSpeed}
               setMazeGenerationTehniques={setMazeGenerationTehniques}
               setIsMazeGenerating={setIsMazeGenerating}
               setShowTutorial={setShowTutorial}/>
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

        <Modal className="modal"
               open={showTutorial}
               onClose={() => setShowTutorial(false)}
               >
                <Tutorial showTutorial={showTutorial} setShowTutorial={setShowTutorial}/>
        </Modal>
                
      </Layout>
    </div>
  )
}
