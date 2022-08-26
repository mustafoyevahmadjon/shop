export default function (props) {
    const { id, name, price, quantity, full_background, incrementQuantity, decrementQuantity } = props;
    return (
        <li className="collection-item">
            {full_background} {name} x{quantity} = {price * quantity}$
            <span className="secondary-content">
                <i className="material-icons basket-delete small" onClick={() => props.removeFromBasket(id)}>delete_sweep</i>
                <i className="material-icons small"  onClick={() => incrementQuantity(id)}>add</i>
                <i className="material-icons small"  onClick={() => decrementQuantity(id)}>remove</i>
            </span>
        </li>
    )
}