import { useEffect, useState, useContext } from "react";
import { BsCartPlus } from "react-icons/bs";
import { Link, useParams } from "react-router-dom"; // Importando useParams
import { api } from "../../services/api";
import { CartContext } from "../../contexts/cartcontext";
import toast from "react-hot-toast";

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export function ProductPage() {
  const { addItemCart } = useContext(CartContext);
  const [product, setProduct] = useState<ProductProps | null>(null); // Alterado para um único produto
  const { id } = useParams(); // Obtendo o ID da URL

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get(`/products/${id}`); // Busca apenas um produto pelo ID
        setProduct(response.data);
      } catch (error) {
        toast.error("Produto não encontrado!"); // Tratamento de erro
      }
    }

    if (id) {
      getProduct();
    }
  }, [id]);

  function handleAddCartItem() {
    if (product) {
      addItemCart(product);
    }
  }

  if (!product) {
    return <p className="text-center mt-10">Carregando produto...</p>;
  }

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto">
        <section className="w-full flex items-center gap-5 mt-5">
          <img
            className="flex-1 w-full rounded-lg max-h-72 mb-2"
            src={product.cover}
            alt={product.title}
          />
          
          <div className="flex flex-col">
          <h1 className="font-bold text-2xl mb-4 mt-10">
            {product.title}
          </h1>
          <p className="font-medium mt-1 mb-2">{product.description}</p>
          <div className="flex gap-3 items-center">
            <strong className="text-zinc-700/90">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
            <Link to={"/cart"}>
            <button
              className="bg-zinc-900 p-1 rounded cursor-pointer"
              onClick={handleAddCartItem}
            >
              <BsCartPlus size={20} color="#FFF" />
            </button>
            </Link>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
}
