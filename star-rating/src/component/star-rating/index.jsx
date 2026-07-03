import { use, useState } from 'react';
import { FaStar } from 'react-icons/fa'
import './style.css'
function StarRating({ noOfStar = 5 }) {

    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    const handleClick =(getCurrIndex)=>{
        setRating(getCurrIndex)
    }
    const handleMouseLeave = () => {
        setHover(rating)
    }
    const handleMouseEnter = (getCurrIndex) => {
       setHover(getCurrIndex)
    }
    return (
        <div className='star-rating'>
            {[...Array(noOfStar)].map((_, index) => {
                const currIndex = index + 1;
                return (
                    <FaStar
                        key={currIndex}
                        className= {currIndex <= (hover || rating)? 'active' : 'inactive'}
                        onClick={() => { handleClick(currIndex) }}
                        onMouseMove={() => {handleMouseEnter(currIndex) } }
                        onMouseLeave={() => { handleMouseLeave() }}
                        size= {40}
                    />

                )
            })}
        </div>
    );
}

export default StarRating;