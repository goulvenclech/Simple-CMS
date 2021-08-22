import React, { useEffect, useState } from "react"
import marked from 'marked'
import { Link } from "react-router-dom"

export default function Edit():JSX.Element {
    const [location, setLocation] = useState("https://raw.githubusercontent.com/" + window.location.pathname.slice(6) + ".md")
    const [file, setFile] = useState("Chargement du fichier...")
    useEffect(() => {
        console.log(location)
        fetch(location).then(response => response.text()).then(result=> setFile(marked(result)))
    }, [])
    return(
        <main>
            <Link to="/">
                <header className="py-6 text-base">
                    <div className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 self-center inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                        <span>Revenir à l'accueil</span>
                    </div>
                    <h1 className="text-4xl font-bold ">
                        Vous éditez <span className="text-primary font-extrabold">
                            {window.location.pathname.split("/").pop() + ".md"}
                        </span>
                    </h1>
                </header>
            </Link>
            <section className="bg-gray-600 p-4 break-words w-full" dangerouslySetInnerHTML={{__html: file}}>

            </section>
        </main>
    )
}

