import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route }
 from "react-router-dom"
import "tailwindcss/tailwind.css"
import IndexPages from "./pages/index"

/**
 * Contain the router logic of our App !
 */
ReactDOM.render(
      <Router>
        <Switch>
          <Route exact path="/">
            <IndexPages />
          </Route>
        </Switch>
      </Router>,
  document.getElementById('root')
)