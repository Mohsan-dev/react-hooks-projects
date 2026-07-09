import { useEffect, useState,useRef } from "react"
import './style.css'

export default function LoadMoreData() {
    const [loading, setLoading] = useState(false)
    const [product, setproduct] = useState([])
    const [count, setCount] = useState(0)
    const [disableButton, setDisableButton] = useState(false)
    const [total, setTotal] = useState(0)
    const isMounted = useRef(false) //to prevent duplication of data


    async function fetchProducts() {
        try {
            setLoading(true)
            const skipValue = count === 0 ? 0 : count * 20
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${skipValue}`)

            const result = await response.json()
            console.log('Product IDs:', result.products.map(p => p.id))
            if (result && result.products && result.products.length) {
                setproduct((prevData) => [...prevData, ...result.products])
                setTotal(result.total)
                setLoading(false)
            }
            

        } catch (e) {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            fetchProducts()
        } else if (count > 0) {
            fetchProducts()
        }
    }, [count])

    useEffect(() => {
        if (product.length > 0 && product.length >= total) setDisableButton(true)
    }, [product, total])

    if (loading) {
        return <div>Loading data ! please wait</div>
    }
    return (
        <div className='container'>
            <div className="product-container">
                {product && product.length ?
                    product.map((items) => (
                        <div className="product" key={items.id}>
                            <img src={items.thumbnail
                            } alt={items.title} />
                            <p>{items.title}</p>
                        </div>
                    )) : null}
            </div>
            <div className="button-container">
                <button disabled={disableButton} onClick={() => setCount(count + 1)}>Load More</button>
                {disableButton ? <p>You reached the {total} products</p> : null}
            </div>

        </div>
    )
}