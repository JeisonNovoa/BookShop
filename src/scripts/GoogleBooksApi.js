const axios = require('axios');

// URL base de la API de Google Books
const baseURL = 'https://www.googleapis.com/books/v1/volumes';

// Función para obtener libros
async function getBooks() {
  try {
    // Parámetros de búsqueda (por ejemplo, título de libro)
    const queryParams = {
      q: 'a', // Reemplaza esto con el título del libro que buscas
    };

    // Realiza la solicitud a la API de Google Books
    const response = await axios.get(baseURL, { params: queryParams });

    // Procesa la respuesta JSON
    const data = response.data;

    // Filtra los libros que tienen título y precio
    const filteredBooks = data.items
      .filter((item) => item.volumeInfo.title && item.saleInfo.listPrice)
      .slice(0, 10); // Toma solo los primeros 10 resultados

    // Retorna solo los títulos y precios de los resultados filtrados
    return filteredBooks.map((item) => ({
      title: item.volumeInfo.title,
      price: item.saleInfo.listPrice.amount,
    }));
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    throw error;
  }
}

// Llama a la función para obtener libros
getBooks()
  .then((books) => {
    // Imprime los libros obtenidos
    console.log('Libros obtenidos:');
    books.forEach((book) => {
      console.log(`Título: ${book.title}`);
      console.log(`Precio: ${book.price}`);
      console.log('---');
    });
  })
  .catch((error) => {
    console.error('Error al obtener libros:', error);
  });
