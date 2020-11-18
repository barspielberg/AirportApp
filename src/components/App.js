import "./App.css";
import SignalRConnection from "./SIgnalRConnection/SignalRConnection";
import ViewPanel from "./ViewPanel/ViewPanel";

function App() {
  return (
    <div className="App">
      <ViewPanel />
     <SignalRConnection/>
    </div>
  );
}

export default App;
