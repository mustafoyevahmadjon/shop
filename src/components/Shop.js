import { useState, useLayoutEffect } from "react";
import { API_KEY, API_URL } from '../config'
import Loader from "./Loader";
import GoodList from "./GoodList";
import Cart from "./Cart";
import BasketList from "./BasketList";
// import { Toast } from "react-toastify/dist/components";
import {toast} from "react-toastify"


function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const handleBasketShow = () => {
        setBasketShow(!isBasketShow)
    }
    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(item => item.id !== itemId)
        setOrder(newOrder)
        toast.error('goods deleted from basket')
    }
    const incrementQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.id === itemId) {
                const newQuantity = el.quantity + 1
                return {
                    ...el,
                    quantity: newQuantity
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
        toast.info("the product increases",{
            theme: 'colored'
        })
    }
    const decrementQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.id === itemId) {
                const newQuantity = el.quantity - 1
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
        toast.warn("the product decreased")
    }
    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            }
            setOrder([...order, newItem])
        }
        else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return item
                }
            });
            setOrder(newOrder)
        }
        toast.success('Goods added to basket succesfully')
        // toast.info('Goods added to basket succesfully')
        // toast.error('Goods added to basket succesfully')
        // toast.warn('Goods added to basket succesfully')
        // toast.warn('Goods added to basket succesfully',{
        //     theme: "dark"
        // })
        // toast.warn('Goods added to basket succesfully',{
        //     theme: "colored"
        // })
        // toast.warn('Goods added to basket succesfully',{
        //     theme: "light"
        // })
    }
    useLayoutEffect(() => {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.featured && setGoods(data.featured);
                setLoading(false);
            });
    }, []);


    return (
        <div className="container content">
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
            {loading ? <Loader /> : <GoodList goods={goods} addToBasket={addToBasket} />}
            {isBasketShow && <BasketList order={order} handleBasketShow={handleBasketShow} removeFromBasket={removeFromBasket} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />}
        </div>
    );
}
export default Shop;