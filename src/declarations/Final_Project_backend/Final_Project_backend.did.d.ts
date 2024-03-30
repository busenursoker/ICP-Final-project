import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Product {
  'product_id' : string,
  'image_url' : string,
  'purchase_url' : string,
  'name' : string,
  'is_vegan' : boolean,
  'category' : string,
}
export interface _SERVICE {
  'add_product' : ActorMethod<
    [string, string, string, string, string, boolean],
    boolean
  >,
  'get_all_products' : ActorMethod<[], Array<Product>>,
  'get_products_by_category' : ActorMethod<[string], Array<Product>>,
  'remove_product' : ActorMethod<[string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
