import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cartcontext";

export function Cart() {
  const { cart, total, removeItemCart, addItemCart} = useContext(CartContext);
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">My Cart</h1>

      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="font-medium">Carrinho Vazio...</p>
          <Link to={"/"} className="bg-slate-600 my-3 p-1 px-3 text-white font-medium rounded">
          Acessar produtos
          </Link>
        </div>
      )}

      {cart.map((item) => (
        <section
          key={item.id}
          className="flex items-center justify-between border-b-2 border-gray-300"
        >
          <img className="w-28" src={item.cover} alt="Product Logo" />
          <strong>
            {item.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
          <div className="flex items-center justify-center gap-3">
            <button className="bg-slate-600 rounded px-2 text-white font-medium flex items-center justify-center cursor-pointer" onClick={() => removeItemCart(item)}>
              -
            </button>
            {item.amount}
            <button className="bg-slate-600 rounded px-2 text-white font-medium flex items-center justify-center cursor-pointer" onClick={() => addItemCart(item)}>
              +
            </button>
          </div>
          <strong className="float-right">{item.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}</strong>
        </section>
      ))}
      {cart.length !== 0 && <p className="font-bold mt-4">Total:{total}</p>}
    </div>
  );
}
