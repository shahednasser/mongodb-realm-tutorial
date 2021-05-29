import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Home from "./pages/Home"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from "react-bootstrap"
import MongoContext from './MongoContext'
import { useEffect, useState } from "react"
import * as Realm from 'realm-web'
import Navigation from "./components/Navigation"
import Authentication from "./pages/Authentication"
import LogOut from "./pages/LogOut"
import AddReview from "./pages/AddReview"

function App() {
  const [client, setClient] = useState(null)
  const [user, setUser] = useState(null)
  const [app, setApp] = useState(new Realm.App({id: process.env.REACT_APP_REALM_APP_ID}))

  useEffect(() => {
    async function init () {
      if (!user) {
        setUser(app.currentUser ? app.currentUser : await app.logIn(Realm.Credentials.anonymous()))
      }

      if (!client) {
        setClient(app.currentUser.mongoClient('mongodb-atlas'))
      }
    }

    init();
  }, [app, client, user])

  function renderComponent (Component, additionalProps = {}) {
    return <MongoContext.Consumer>{(mongoContext) => <Component mongoContext={mongoContext} {...additionalProps} />}</MongoContext.Consumer>
  }

  return (
    <Router>
      <Navigation user={user} />
      <MongoContext.Provider value={{app, client, user, setClient, setUser, setApp}}>
        <Container>
          <Switch>
            <Route path="/signup" render={() => renderComponent(Authentication, {type: 'create'})} />
            <Route path="/signin" render={() => renderComponent(Authentication)} />
            <Route path="/logout" render={() => renderComponent(LogOut)} />
            <Route path="/review/:id" render={() => renderComponent(AddReview)} />
            <Route path="/" render={() => renderComponent(Home)} />
          </Switch>
        </Container>
      </MongoContext.Provider>
    </Router>
  );
}

export default App;
