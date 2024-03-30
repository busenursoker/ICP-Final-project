export const idlFactory = ({ IDL }) => {
  const Product = IDL.Record({
    'product_id' : IDL.Text,
    'image_url' : IDL.Text,
    'purchase_url' : IDL.Text,
    'name' : IDL.Text,
    'is_vegan' : IDL.Bool,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'add_product' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Bool],
        [IDL.Bool],
        [],
      ),
    'get_all_products' : IDL.Func([], [IDL.Vec(Product)], []),
    'get_products_by_category' : IDL.Func([IDL.Text], [IDL.Vec(Product)], []),
    'remove_product' : IDL.Func([IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
