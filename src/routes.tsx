import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Login } from './pages/Login/Login'
import { List } from './pages/List/List';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dragons" exact component={List} />
        </Switch>
    </BrowserRouter>
)

export default Routes;
