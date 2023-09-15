import { useContext, useEffect, useState } from "react";
import { dataContext } from "../Context/DataContext";
import axios from 'axios';
import "./Products.css"; // Importa el archivo CSS de estilos

const Products = () => {
  const { cart, setCart } = useContext(dataContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=a');
        const data = response.data;

        const filteredBooks = data.items
          .filter((item) => item.volumeInfo.title && item.saleInfo.listPrice)
          .slice(0, 6);

        setBooks(filteredBooks);
      } catch (error) {
        console.error('Error al obtener libros:', error);
      }
    };

    getBooks();
  }, []);

  const buyProducts = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="product-card-container">
      {/* Mapea los libros y aplica estilos a cada tarjeta */}
      {books.map((book) => (
        <div className="card" key={book.id}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt="img-product-card" />
          {/* Aplica estilos para truncar el título */}
          <h3 className="book-title">{book.volumeInfo.title}</h3>
          <h4>${book.saleInfo.listPrice.amount}</h4>
          <button onClick={() => buyProducts(book)}>buy</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
