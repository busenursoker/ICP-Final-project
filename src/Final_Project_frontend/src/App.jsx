import { useState , useEffect  } from 'react';
import { Final_Project_backend } from 'declarations/Final_Project_backend';
import './index.scss';

function App() {
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [newProduct, setNewProduct] = useState({
    product_id: '',
    name: '',
    category: '',
    image_url: '',
    purchase_url: '',
    is_vegan: false
  });

  useEffect(() => {
    // Check for products in local storage on initial load
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Fetch products from backend if not found in local storage
      Final_Project_backend.get_all_products()
        .then((products) => setProducts(products))
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever products state changes
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  function addProduct(event) {
    event.preventDefault();
  
    const productId = event.target.elements.product_id.value;
    const productName = event.target.elements.product_name.value;
    const productCategory = event.target.elements.product_category.value;
    const productImgUrl = event.target.elements.product_img_url.value;
    const purchaseUrl = event.target.elements.purchase_url.value;
    const isVegan = event.target.elements.is_vegan.value === "Y" ? true : false;
  
    Final_Project_backend.add_product(productId, productName, productCategory, productImgUrl, purchaseUrl, isVegan)
    .then((addedProduct) => {
        if (addedProduct) {
            alert("Product Added");
            // Update the products state to include the newly added product
            setProducts([...products, {
                product_id: productId,
                product_name: productName,
                product_category: productCategory,
                product_img: productImgUrl,
                purchase_url: purchaseUrl,
                is_vegan: isVegan
            }]);
        } else {
            alert("Product could not be added");
        }
    })
    .catch(error => {
        console.error('Error adding product:', error);
        alert("An error occurred while adding the product");
    });
  }

  function removeProduct(event){
    event.preventDefault();
    const productId = event.target.elements.product_id.value;
    Final_Project_backend.remove_product(productId)
    .then((removedProduct) => { 

        if (removedProduct) {
            alert("Product Removed");
            // Update the products state by filtering out the removed product
            setProducts(products.filter(product => product.product_id !== productId));
        } else {
            alert("Product could not be Removed");
        }
    })
    .catch(error => {
        console.error('Error removing product:', error);
        alert("An error occurred while removing the product");
    });
  }

  const getProductsByCategory = (category) => {
    Final_Project_backend.get_products_by_category(category)
      .then((products) => {
        setCategoryProducts(products);
      })
      .catch((error) => {
        console.error('Error fetching products by category:', error);
      });
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === '') {
      // If no category selected, show all products
      setCategoryProducts(products);
    } else {
      // Filter products based on selected category
      const filtered = products.filter((product) => product.product_category === category);
      setCategoryProducts(filtered);
    }
  };


  return (
    <main>
      <header>
      <h1>CrueltyFreeZone</h1>
      </header>
      <div className="container">
        <div className="manageProducts">
          <h2>Adding Products</h2>
          <form onSubmit={addProduct}>
            <label htmlFor="product_id"> Enter Id: </label>
            <input id="product_id" type="text" name="product_id" />
            <label htmlFor="product_name">Enter Name:  </label>
            <input id="product_name" type="text" name="product_name" />
            <label htmlFor="product_category">Enter Category:  </label>
            <input id="product_category" type="text" name="product_category" />
            <label htmlFor="product_img_url">Enter Img Url:  </label>
            <input id="product_img_url" type="text" name="product_img_url" />
            <label htmlFor="purchase_url">Enter Purchase URL:  </label>
            <input id="purchase_url" type="text" name="purchase_url" />
            <label htmlFor="is_vegan">Is This Vegan? (Y/n):  </label>
            <input id="is_vegan" type="text" name="is_vegan" />
            <button type="submit"> Add the Product</button>
          </form>
          <form onSubmit={removeProduct}>
            <h2>Removing Products</h2>
            <label htmlFor="product_id">Enter Product Id: </label>
            <input id="product_id" type="text" name="product_id" />
            <button type="submit">Remove Product</button>
          </form>
        </div>
        <div className="listProducts">
          {selectedCategory ? (
            categoryProducts.map((product) => (
              <div className="product-card" key={product.product_id}>
                <div className="product-details">
                  <p className="product-name"><b>Product Name:</b> {product.product_name}</p>
                  <p className="product-category"><b>Category:</b> {product.product_category}</p>
                  <p className="purchase-url"><b>Purchase:</b> <a href={product.purchase_url} target="_blank" rel="noopener noreferrer">{product.purchase_url}</a></p>
                  <p className="is-vegan"><b>Is Vegan :</b> {product.is_vegan ? "Yes" : "No"}</p>
                </div>
                <img src={product.product_img} alt={product.product_name} />
              </div>
            ))
          ) : (
            products.map((product) => (
              <div className="product-card" key={product.product_id}>
                <div className="product-details">
                  <p className="product-name"><b>Product Name:</b> {product.product_name}</p>
                  <p className="product-category"><b>Category:</b> {product.product_category}</p>
                  <p className="purchase-url"><b>Purchase:</b> <a href={product.purchase_url} target="_blank" rel="noopener noreferrer">{product.purchase_url}</a></p>
                  <p className="is-vegan"><b>Is Vegan :</b> {product.is_vegan ? "Yes" : "No"}</p>
                </div>
                <img src={product.product_img} alt={product.product_name} />
              </div>
            ))
          )}
        </div>

            <div classname = "all-category">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              <option value="Skincare">Skincare</option>
              <option value="Makeup">Makeup</option>
              <option value="Hygiene">Hygiene</option>
              <option value="Haircare">Haircare</option>
              <option value="Fragrance">Fragrance</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Health">Health</option>
            </select>
            </div>

      <div className="category-products">
        {categoryProducts.map((product) => (
         <div key={product.product_id}>
          <p><strong>Product Name:</strong> {product.name}</p>
          <p><strong>Category:</strong> {product.category}</p>
          
    </div>
  ))}
</div>

      </div>
    </main>
  );
}

export default App;
