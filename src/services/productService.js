const API_URL = 'http://localhost:3000';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Ürünleri getirirken bir hata oluştu:', error);
    throw error;
  }
};

export const createProduct = async (newProduct) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ürün oluştururken bir hata oluştu:', error);
    throw error;
  }
};

export default getProducts;