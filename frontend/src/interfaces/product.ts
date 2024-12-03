export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string[];
  seller: string;
}

export interface Products {
  products: IProduct[];
  page: number;
  pages: number;
  totalProducts: number;
}
