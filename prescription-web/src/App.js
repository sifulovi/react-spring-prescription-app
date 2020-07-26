import React from 'react';
import {Redirect} from "react-router";
import {Router, Switch, Route} from 'react-router-dom';
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import AuthActions from "./components/service/UserActions";
import Dashboard from "./components/Dashboard/DashBoard";
import PrescriptionList from "./components/Prescription/PrescriptionList";
import {createBrowserHistory} from "history";


function App() {
    const history = createBrowserHistory();
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" component={Login} exact/>
                <Route path="/registration" component={Registration} exact/>

                {AuthActions.isAuthenticated() ?
                    <Route path="/dashboard" component={Dashboard} exact/> :
                    <Redirect to={{
                        pathname: '/',
                        targetUrl: '/dashboard'
                    }}/>
                }

                {AuthActions.isAuthenticated() ?
                    <Route path="/list" component={PrescriptionList} exact/> :
                    <Redirect to={{
                        pathname: '/',
                        targetUrl: '/dashboard'
                    }}/>
                }

                <Route path="/error" component={Error} exact/>
            </Switch>
        </Router>
    );
}

export default App;
