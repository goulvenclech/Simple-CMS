import React, { useState, useRef } from "react"

/**
 * An accordion element, with a title box, and a content
 * who is showed only on click
 */
export default function Accordion(props:Props):JSX.Element {
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
  
  return (
    <div className="my-4 rounded-lg">
      <button className="text-left w-full rounded-lg py-2 px-4 text-lg" 
        onClick={toggleAccordion}>
        <p className="">{props.title}</p>
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${Height}` }}
        className="overflow-hidden duration-300"
      >
        <p className="p-4 text-lg">
            {props.content}
        </p>
      </div>
    </div>
  )
}

/**
 * Just checking if the props are valids
 */
interface Props {
    title: string,
    content: string
}