import { Button } from "@material-ui/core";
import { useState } from "react";
import DropdownSelect from "./DropdownSelect";
import Tooltip from '@material-ui/core/Tooltip';
import RunIcon from '@material-ui/icons/PlayArrow';
import MenuIcon from '@material-ui/icons/Menu';

const Toolbar = () => {
    const algorithms = ["Djikstra", "A*", "BFS", "DFS"];
    const mazeGenerationTehniques = ["Recursive", "Veritcal"];
    const clearOptions = ["Board", "Walls", "Path"];
    const speedOptions = ["Slow", "Medium", "Fast", "Instant"];

    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
    const [selectedMazeGenerationTehniques, setMazeGenerationTehniques] = useState("");
    const [selectedClear, setSelectedClear] = useState("");
    const [selectedSpeed, setSelectedSpeed] = useState("");

    return(
        <div className="toolbar-container">
            <input type="checkbox" 
                   className="toolbar-toggler" 
                   id="toolbar-toggler" 
                   defaultChecked="true"/>
            <ul className="toolbar">
                <label className="toolbar-toggle-label" 
                       htmlFor="toolbar-toggler">
                    <MenuIcon/>
                </label>

                <li className="toolbar-title toolbar-item"> Pathfinding </li>
                <li className="toolbar-item">
                    <DropdownSelect className="toolbar-button"
                                    buttonText="Algorithms" 
                                    options={algorithms} 
                                    setOption={setSelectedAlgorithm}/>
                </li>
                <li className="toolbar-item">
                    <DropdownSelect className="toolbar-button"
                                    buttonText="Mazes" 
                                    options={mazeGenerationTehniques} 
                                    setOption={setMazeGenerationTehniques}/>
                </li>
                <li className="toolbar-item">
                    <DropdownSelect className="toolbar-button"
                                    buttonText="Clear" 
                                    options={clearOptions} 
                                    setOption={setSelectedClear}/>
                </li>
                <li className="toolbar-item">
                    <DropdownSelect className="toolbar-button"
                                    buttonText="Speed" 
                                    options={speedOptions} 
                                    setOption={setSelectedSpeed}/>
                </li>
                <li className="toolbar-item"><Button className="toolbar-button"> Tutorial </Button></li>
                <li className="toolbar-item">
                <Tooltip title= {selectedAlgorithm=="" ? "Please select an algorithm!" : ""}>
                    <span>
                        <Button className="toolbar-button"
                                variant="contained" 
                                color="secondary"
                                disabled={selectedAlgorithm==""}
                                endIcon={<RunIcon/>}> 
                                Visualize 
                        </Button>
                    </span>
                </Tooltip>
                </li>
            </ul>
        </div>
    );
}

export default Toolbar;