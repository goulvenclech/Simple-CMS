import React from "react"
import Directory from "../components/directory"

export default function IndexPages():JSX.Element {
    return (
        <div className="mx-auto max-w-screen-md">
            <Directory 
            title="Wiki"
            url="https://api.github.com/repos/aureliendossantos/wiki/contents/content/"
            type="repository" />
        </div>
    )
}
