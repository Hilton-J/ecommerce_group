export interface IProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  image: File | null;
  seller: string;
}
