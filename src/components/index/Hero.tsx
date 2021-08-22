import React, { useEffect, useState } from "react"
import config from "../../../simple-config.json"
/**
 * 
 */
export default function Hero():JSX.Element {
    const [userName, setUserName] = useState("inconnu...")
    useEffect(() => {
        (async () => {
            try {
              const response = await fetch("https://api.github.com/users/" + config.githubID, {method: "get", headers: {"Authorization": "token " + config.githubToken}})
              if (response.ok) {
                const data = await response.json()
                setUserName(data.name)
              }else {
                console.error(`Erreur ${response.status} : ${response.statusText}`)
              }
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])
    return (
        <h1 className="">
            Bonjour <span>{userName}</span>
        </h1>
    )
}