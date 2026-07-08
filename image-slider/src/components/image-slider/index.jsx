import { useEffect, useState } from 'react'
import './style.css'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

export default function ImageSlider({ url, page = 1, limit = 5 }) {

    const [images, setimages] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const handlePrevious = () => {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
    }
    const handleNext = () => { setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1) }

    async function fetchImage(getUrl) {
        try {
            setLoading(true)
            const response = await fetch(`${url}?page=${page}&limit=${limit}`)
            const data = await response.json()

            if (data) {
                setimages(data)
                setLoading(false)
            }
        } catch (e) {
            setErrorMsg(e.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (url !== "")
            fetchImage(url)
    }, [url])
    

    if (loading) {
        return <div>Loading data! Please wait</div>
    }
    if (errorMsg !== null) {
        return <div>Error Occured! {errorMsg}</div>
    }

    return (
        <div className='container'>
            <BsArrowLeftCircleFill onClick={handlePrevious} className='arrow left-arrow' />
            {images && images.length ?
                images.map((imageItem,index) => (
                    <img key={imageItem.id}
                        alt={imageItem.download_url}
                        src={imageItem.download_url}
                        className={currentSlide === index ? 'current-image'
                            : 'current-image hide-current-image'} />

                )) : null}
            <BsArrowRightCircleFill onClick={handleNext} className='arrow right-arrow' />
            <span className='circle-indicator'>{
                images && images.length ?
                    images.map((_, index) => (
                        <button key={index}
                            className={currentSlide === index ? "current-indicator" :
                                "current-indicator inactive-current-indicator"}
                            onClick={() => setCurrentSlide(index)}
                        ></button>
                    )) : null}</span>
        </div>
    )
}