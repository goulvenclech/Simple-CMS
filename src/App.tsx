import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route }
 from "react-router-dom"
import "tailwindcss/tailwind.css"
import Hero from "./components/index/Hero"
import IndexPages from "./pages/index"

/**
 * Contain the router logic of our App !
 */
ReactDOM.render(
      <Router>
        <main className="mx-auto p-4 max-w-screen-md">
          <Switch>
            
              <Route exact path="/">
                <Hero />
                <IndexPages />
              </Route>
          </Switch>
        </main>
      </Router>,
  document.getElementById('root')
)