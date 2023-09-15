import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import "./CartContent.css";

const CartElements = () => {
    const { cart, setCart } = useContext(dataContext);

    const removeProduct = (id) => {
        if (window.confirm("¿Quieres suspender el producto?")) {
            const updatedCart = [...cart];
            const indexToRemove = updatedCart.findIndex((product) => product.id === id);

            if (indexToRemove !== -1) {
                updatedCart.splice(indexToRemove, 1);
                setCart(updatedCart);
            }
        }
    };

    return cart.map((product) => {
        console.log(product);
        return (
            <div className="cartContent" key={product.id}>
                <img src={product.volumeInfo.imageLinks.thumbnail} alt="product-card" />
                <h3 className="name">{product.volumeInfo.title}</h3>
                <h4 className="price">{product.saleInfo.listPrice.amount}$</h4>
                <button onClick={() => removeProduct(product.id)}>Remove</button>
            </div>
        );
    });
};

export default CartElements;
