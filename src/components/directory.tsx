import React, { useEffect, useRef, useState } from "react"
/**
 * 
 */
export default function Directory(props:Props):JSX.Element {
    const emptyData:Array<Child> = []
    const [childs, setChilds] = useState({subDirectories: emptyData, files: emptyData })
    //
    const [isOpen, setIsOpen] = useState(false)
    const [Height, setHeight] = useState("0px")
    // useRef will be usefull to know the height of the DOM element
    const content = useRef<HTMLDivElement>(null)
    /**
     * Open & close the Accordion, called by onClick() on the button
     */
    function toggleAccordion() {
      // Needed by TypeScript, to be sure it's not null anymore after JSX rendering
      if(content && content.current) {
          setIsOpen(isOpen === false ? true : false)
          setHeight(isOpen === true ? "0px" : content.current.scrollHeight + "px")
      }
    }
    /**
     * 
     */
    useEffect(() => {
        if(props.type === "repository"){
            setIsOpen(true)
            setHeight("100%")
        }
        (async () => {
            try {
              const response = await fetch(props.url)
              if (response.ok) {
                const data:Array<Child> = await response.json()
                const directs:Array<Child> = []
                const contenu:Array<Child> = []
                data.map(element => { element.type === "dir" ? directs.push(element) : contenu.push(element) })
                setChilds({subDirectories: directs, files: contenu})
              } 
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])

    return(
        <div className="my-4 rounded-xl bg-gray-200 border-gray-400 border-2 m-4 overflow-y-auto">
        <button className=" bg-gray-400 w-full rounded-lg py-2 px-4 " 
          onClick={toggleAccordion}>
          <p className="text-lg text-left">{props.title}/</p>
        </button>
        <div
          ref={content}
          style={{ maxHeight: `${Height}` }}
          className="overflow-hidden duration-300 overflow-y-auto"
        >
            {childs.subDirectories.map(dir => {
                return <Directory key={dir.sha} title={dir.name} url={dir.url} type="directory" />
            })}
            {childs.files.map(file => {
                return (
                    <p className="pl-6 text-lg">
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