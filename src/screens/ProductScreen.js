import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {

    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails
    const dispatch = useDispatch();
    const [qty, setQty] = useState(0);
debugger
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {

        }
    }, [])

    const handleAddToCart = () => {
        debugger
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }
    return <div>
        <div className="back-to-result">
            <Link to="/">Back to Result</Link>
        </div>
        {loading ? <div>loading...</div> : error ? <div>{error}</div> : (
            <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="product"></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.rating} Stars ({product.numReviews})
                    </li>
                        <li>
                            <b>{product.price}</b>
                        </li>
                        <li>
                            Description:
                        <div>
                                {product.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Price: <b>${product.price}</b>
                        </li>
                        <li>
                            Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                        </li>
                        <li>
                            Qty: <select value={qty} onChange={(e) => setQty(e.target.value)} >
                                {[...Array(product.countInStock).keys()].map(x =>
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                )}
                            </select>
                        </li>
                        <li>
                            {product.countInStock > 0 && <button className="button primary"
                                onClick={handleAddToCart}
                            >Add to Cart</button>}

                        </li>
                    </ul>
                </div>
            </div>
        )}
    </div>
}
export default ProductScreen