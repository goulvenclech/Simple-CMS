import React, { useEffect, useState } from "react"
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
            <button className=" bg-gray-600 border-gray-500 border-b w-full py-2 px-4 " 
            onClick={toggleAccordion}>
            <p className="text-lg text-left">{props.title}/</p>
            </button>
            <div
            style={{ maxHeight: `${Height}` }}
            className="ml-4 overflow-hidden"
            >
                {childs.subDirectories.map(dir => {
                    return <Directory key={dir.sha} title={dir.name} url={dir.url} type="directory" />
                })}
                {childs.files.map(file => {
                    return (
                        <p key={file.sha} className="pl-6 text-lg bg-gray-700 border-gray-600 border-b w-full py-2 px-4 ">
                        {file.name}
                        </p>
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