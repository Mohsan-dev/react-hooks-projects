import { useState } from "react";
import MenuList from "./menu-list";
import {FaMinus, FaPlus} from 'react-icons/fa'

function MenuItem({ item }) {
    const [displayCurrentChildren, setDisplayCurrentChildren] = useState({})

    const handleToggleChildren = (getcurrentlabel) => {
        setDisplayCurrentChildren({
            ...displayCurrentChildren,
            [getcurrentlabel]: !displayCurrentChildren[getcurrentlabel],
        })
    }
    return (
        <li>
            <div className="menu-item">
                <p>{item.label}</p>
                {item && item.children && item.children.length ? <span onClick={() => handleToggleChildren(item.label)}>
                    {displayCurrentChildren[item.label]? <FaMinus color="#ffffff" size={25}/> : <FaPlus color="#ffffff" size={25}/>}
                </span> : null}
            </div>
            {item && item.children && item.children.length && displayCurrentChildren[item.label]?
                <MenuList list={item.children} />
                : null}
        </li>
    );
}

export default MenuItem;