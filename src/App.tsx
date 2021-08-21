import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route }
 from "react-router-dom"
import "tailwindcss/tailwind.css"

/**
 * Contain the router logic of our App !
 */
ReactDOM.render(
      <Router>
        <Switch>
          <Route exact path="/">
            <p>
              Coucou Aurélien !
            </p>
          </Route>
        </Switch>
      </Router>,
  document.getElementById('root')
)