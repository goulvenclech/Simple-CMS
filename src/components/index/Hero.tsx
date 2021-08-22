import React, { useEffect, useState } from "react"
import config from "../../../simple-config.json"
/**
 * 
 */
export default function Hero():JSX.Element {
    const [userName, setUserName] = useState("")
    const [avatar, setAvatar] = useState("https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y")
    useEffect(() => {
        (async () => {
            try {
              const response = await fetch("https://api.github.com/users/" + config.githubID, {method: "get", headers: {"Authorization": "token " + config.githubToken}})
              if (response.ok) {
                const data = await response.json()
                setUserName(data.name)
                setAvatar(data.avatar_url)
              }else {
                console.error(`Erreur ${response.status} : ${response.statusText}`)
              }
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])
    return (
        <header className="flex gap-2 px-2 py-4">
          <img className="inline-block h-16 w-16 rounded-full self-center"
              src={avatar} />            
                {userName === "" ? 
                  <p>Chargement en cours...</p>
                : 
                  <p className="text-lg">
                    Bonjour <br/>
                    <span className="text-3xl leading-none text-primary">
                      {userName}
                    </span>
                  </p>
                }
        </header>
    )
}
