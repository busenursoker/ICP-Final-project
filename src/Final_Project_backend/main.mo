  // Import necessary modules
  import HashMap "mo:base/HashMap";
  import Text "mo:base/Text";
  import Bool "mo:base/Bool";
  import Array "mo:base/Array";
  import Iter "mo:base/Iter";

actor {

  // Define the Product type
  type Product = {
    product_id: Text;
    name: Text;
    category: Text;
    image_url: Text;
    purchase_url: Text;
    is_vegan: Bool;
  };

  // Initialize a HashMap to store products
  let productsMap = HashMap.HashMap<Text, Product>(0, Text.equal, Text.hash);

  // Function to add a product
  public func add_product(
    id: Text,
    name: Text,
    category: Text,
    image_url: Text,
    purchase_url: Text,
    is_vegan: Bool
  ) : async Bool {
    if (id != "" and name != "" and category != "") {
      productsMap.put(id, {
        product_id = id;
        name = name;
        category = category;
        image_url = image_url;
        purchase_url = purchase_url;
        is_vegan = is_vegan;
      });
      true;
    } else {
      false;
    };
  };

  // Function to remove a product
  public func remove_product(id: Text) : async Bool {
    if (id != "" and productsMap.get(id) != null) {
      productsMap.delete(id);
      true;
    } else {
      false;
    };
  };

  // Function to get products by category
  public func get_products_by_category(category: Text) : async [Product] {
    return filterProductsByCategory(category);
  };

  // Function to filter products by category
  func filterProductsByCategory(category: Text) : [Product] {
    var filteredProducts : [Product] = [];
    for (product in productsMap.vals()) {
      if (Text.equal(product.category, category)) {
         filteredProducts := Array.append(filteredProducts, [product]);// Append product to filteredProducts
      };
    };
  return filteredProducts; // Ensure to return filtered products
  };

  public func get_all_products() : async [Product] {
    return Iter.toArray(productsMap.vals());
  };
};




