import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import ConnectionErrorWindow from "./ConnectionErrorWindow/ConnectionErrorWindow";
import EditPage from "./EditPage/EditPage";
import SignalRConnection from "./SIgnalRConnection/SignalRConnection";
import ViewPanel from "./ViewPanel/ViewPanel";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/edit" component={EditPage}/>
          <Route path="/" component={ViewPanel} />
        </Switch>
        <ConnectionErrorWindow/>
        <SignalRConnection />
      </div>
    </BrowserRouter>
  );
}

export default App;
