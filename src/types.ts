export type TUsers = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TProducts = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
};

export type TPurchases = {
  id: string;
  buyer: string;
  total_price: number;
  created_at: string;
};

export type TPurchaseProduct = {
  purchase_id: string;
  product_id: string;
  quantity: number;
};
