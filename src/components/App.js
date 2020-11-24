import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import SignalRConnection from "./SIgnalRConnection/SignalRConnection";
import ViewPanel from "./ViewPanel/ViewPanel";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/edit">edit</Route>
          <Route path="/" component={ViewPanel} />
        </Switch>
        <SignalRConnection />
      </div>
    </BrowserRouter>
  );
}

export default App;
