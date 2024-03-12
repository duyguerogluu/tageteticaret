import { useEffect, useState } from 'react';

const ProductsList = () => {
 
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
     
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3000/products');
          const data = await response.json();
  
          setProducts(data);
        } catch (error) {
          console.error('Ürünleri getirirken bir hata oluştu:', error);
        }
      };
  
    
      fetchProducts();
    }, []);
  
    // return (
    //   <div>
    //     <h1>Ürün Listesi</h1>
    //     <ul>
    //       {products.map((product) => (
    //         <li key={product.id}>{product.name}</li>
    //       ))}
    //     </ul>
    //   </div>
    // );
  };
  
  export default ProductsList;