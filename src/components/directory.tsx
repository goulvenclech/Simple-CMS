import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import config from "../../simple-config.json"
/**
 * 
 */
export default function Directory(props:Props):JSX.Element {
    const emptyData:Array<Child> = []
    const [childs, setChilds] = useState({subDirectories: emptyData, files: emptyData })
    //
    const [isOpen, setIsOpen] = useState(false)
    const [Height, setHeight] = useState("0px")
    /**
     * Open & close the Accordion, called by onClick() on the button
     */
    function toggleAccordion() {
        setIsOpen(isOpen === false ? true : false)
        setHeight(isOpen === true ? "0px" : "100%")
    }
    /**
     * 
     */
    useEffect(() => {
        (async () => {
            try {
              const response = await fetch(props.url, {method: "get", headers: {"Authorization": "token " + config.githubToken}})
              if (response.ok) {
                const data:Array<Child> = await response.json()
                setChilds({
                    subDirectories: data.filter(element => element.type === "dir"), 
                    files: data.filter(element => element.type === "file")
                })
              }else {
                console.error(`Erreur ${response.status} : ${response.statusText}`)
              }
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])

    return(
        <div className="font-mono">
            <button className=" bg-gray-600 border-gray-500 border-b w-full py-2 px-4 
                flex gap-2" 
            onClick={toggleAccordion}>
            {props.type === "repository" ?
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>}
            <p className="text-lg">{props.title}/</p>
            <svg xmlns="http://www.w3.org/2000/svg" className={isOpen?"h-6 w-6 ml-auto  rotate-90" : "h-6 w-6 ml-auto"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            </button>
            <div
            style={{ maxHeight: `${Height}` }}
            className="ml-4 overflow-hidden"
            >
                {childs.subDirectories.map(dir => {
                    return <Directory key={dir.sha} title={dir.name} url={dir.url} type="directory" />
                })}
                {childs.files.map(file => {
                    /**
                     * Create a new component for that
                     */
                    return (
                        <article key={file.sha} className="pl-6 text-lg bg-gray-700 border-gray-600 border-b
                        w-full py-2 px-4">
                        {file.name.slice(-3) === ".md" ? 
                            <div className="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p>{file.name}</p>
                                <Link to={"/edit-"+file.name.slice(0, -3)} className="ml-auto">
                                    <button className="text-xs bg-gray-600 rounded-md px-2">
                                        Editer 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        :   <div className="flex gap-2 opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <p>{file.name}</p>
                            </div>
                        }
                        </article>
                    )
                })}
            </div>
        </div>
    )
}
/**
 * 
 */
interface Props {
    title: string,
    url: string,
    type: "directory" | "repository"
}
/**
 * 
 */
interface Child {
    name: string,
    path: string,
    sha: string,
    size: number,
    url: string,
    html_url: string,
    git_url: string,
    download_url: string,
    type: string,
    _links: { 
        self: string, 
        git: string, 
        html: string 
    }
}