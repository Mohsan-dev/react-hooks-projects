import { useState } from 'react'
import data from './data'
import './style.css'
export default function Accordion() {

    const [selected, setSelected] = useState(null)
    const [enableMultipleSelection , setEnableMultipleSelection] =  useState(false)
    const [multiple, setmultiple] = useState([])
    
    const handleSingleSelection = (getCurrentId) => {
        setSelected(selected === getCurrentId ? null : getCurrentId)
    }

    const handleMultipleSelection = (getCurrentId) => {
        const cpymultiple = [...multiple]
        const findIndexOfCurrentId = cpymultiple.indexOf(getCurrentId)
        if (findIndexOfCurrentId === -1) cpymultiple.push(getCurrentId)
        else cpymultiple.splice(findIndexOfCurrentId, 1)
        setmultiple(cpymultiple)
    }



    return (
        <div className='wrapper'>
            <button onClick={()=> setEnableMultipleSelection(!enableMultipleSelection)} >Enable Multi Seclection</button>
            <div className='accordion'>
                {data && data.length > 0 ?
                 (data.map((dataitem) => (
                    <div key={dataitem.id}
                         onClick={() => enableMultipleSelection ? handleMultipleSelection(dataitem.id): handleSingleSelection(dataitem.id)} className='items'>
                          <div className='title'>  
                            <h3>{dataitem.question}</h3>
                            <span>+</span>
                        </div>
                        {
                            enableMultipleSelection ? multiple.indexOf(dataitem.id) !== -1 &&
                            (<div className='content'>{dataitem.answer}</div>) :
                            selected === dataitem.id &&
                            (<div className='content'>{dataitem.answer}</div>)

                        }
                    
                        {/* {

                            selected === dataitem.id ?
                            <div className='content'>{dataitem.answer}</div>
                            : null 

                        } */}
                    </div>
                )))
                : (<div>No Data Found !</div>)
             }

            </div>
        </div >
    )

}