import { ObjectId } from "mongodb";
export interface IProduct {
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  image: File | null;
  seller: ObjectId;
}
