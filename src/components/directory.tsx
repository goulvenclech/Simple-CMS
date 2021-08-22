import React, { useEffect, useState } from "react"
import secretKey from "../../secret-key.json"
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
              const response = await fetch(props.url, {method: "get", headers: {Authorization: secretKey.token}})
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
        <div className="my-4 rounded-xl bg-gray-200 border-gray-400 border-2 m-4">
        <button className=" bg-gray-400 w-full rounded-lg py-2 px-4 " 
          onClick={toggleAccordion}>
          <p className="text-lg text-left">{props.title}/</p>
        </button>
        <div
          style={{ maxHeight: `${Height}` }}
          className="overflow-hidden duration-300"
        >
            {childs.subDirectories.map(dir => {
                return <Directory key={dir.sha} title={dir.name} url={dir.url} type="directory" />
            })}
            {childs.files.map(file => {
                return (
                    <p key={file.sha} className="pl-6 text-lg">
                    - {file.name}
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