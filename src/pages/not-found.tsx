import React from "react"
import { Link } from "react-router-dom"

export default function NotFound():JSX.Element {
    return (
        <main className="mx-auto max-w-screen-md grid gap-2 text-center my-24">
            <h1 className="text-5xl text-primary font-extrabold">
                Erreur 404
            </h1>
            <p className="text-2xl">
                La page que vous recherchez n'existe pas !
            </p>
            <Link to="/" className="mx-auto underline hover:text-red-400 my-10">
                Retour à l'accueil
            </Link>
        </main>
    )
}