import React, { useEffect, useState } from "react"
import Directory from "../components/directory"

export default function IndexPages():JSX.Element {
    const [listRepos, setListRepos] = useState([])
    useEffect(() => {
        (async () => {
            try {
              const response = await fetch("../simple-config.json")
              if (response.ok) {
                const data = await response.json()
                setListRepos(data.githubRepos)
              }else {
                console.error(`Erreur ${response.status} : ${response.statusText}`)
              }
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])
    return (
        <div className="mx-auto max-w-screen-md grid gap-2">
            {listRepos.length === 0 ? "" : listRepos.map((repo, index) => {return(    
                <Directory 
                key={index}
                title={repo}
                url={"https://api.github.com/repos/"+ repo + "/contents/"}
                type="repository" />
            )})}
        </div>
    )
}
