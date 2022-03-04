import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";


function Router() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}    
     >
      <Switch>
        <Route path='/:currentPage/:coinId'>
          <Coin />
        </Route>
        <Route path="/:currentPage">
          <Coins/>
        </Route>
        <Route path="/">
          <Coins/>
        </Route>
      </Switch>
    </HashRouter>
  );
}
export default Router;