import Fade from '@material-ui/core/Fade';

const LegendItem = ({label, color}) => {
    return (
        <div className="row legend-item">
            <div className="square" style={{backgroundColor: color}}></div>
            {label}
        </div>
    );
}

const Tutorial = ({showTutorial, setShowTutorial}) => {
    const legendItems = [
        {
            label: "Empty", 
            color: "white"
        },
        {
            label: "Wall",
            color: "black"
        },
        {
            label: "Start",
            color: "#00ff00"
        },
        {
            label: "Finish",
            color: "red"
        },
        {
            label: "Visited",
            color: "#0080ff"
        },
        {
            label: "Path",
            color: "yellow"
        }
    ]

    return (
        <Fade in={showTutorial}>
            
            <div className="modal-content">
                <div className="close-button-container">
                    <button className="close-button"
                            onClick={() => setShowTutorial(false)}> 
                        X 
                    </button>
                </div>

                <div className="tutorial">
                    <h1>Tutorial</h1>
                    <ol>
                        <li> 
                            <p>
                                Draw with your mouse some obstacles on the grid or 
                                choose a maze generation algorithm from the toolbar. 
                            </p>
                        </li>

                        <li> 
                            <p>
                                Choose the algorithm that you want to visualize. 
                            </p>
                        </li>

                        <li> 
                            <p>
                                You can also adjust the speed of the visualization from the toolbar. 
                            </p>
                        </li>

                        <li>
                            <p> 
                                Click the Visualize button and see the algorithm in action. 
                            </p>
                        </li>

                    </ol>
                
                    <h2> Legend </h2>

                    <div className="row">
                        { 
                            legendItems.map((item, index) => (
                                <LegendItem label={item.label} 
                                            color={item.color} 
                                            key={index}/>
                            ))
                        }                    
                    </div>
                </div>
            </div>
        </Fade>
    );
}

export default Tutorial;