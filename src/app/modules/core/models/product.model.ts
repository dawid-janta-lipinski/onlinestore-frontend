export interface SimpleProduct {
  name: string;
  mainDesc: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
}

// export class SimpleProduct implements SimpleProduct {
//   constructor(
//     name: string,
//     mainDesc: string,
//     price: number,
//     imageUrl: string,
//     createdAt: Date,
//   ) {}
// }
export interface Product {
  uuid: string;
  active: boolean;
  name: string;
  mainDesc: string;
  descHtml: string;
  price: number;
  imageUrls: string[];
  parameters: string;
  createAt: Date;
  category: string;
}
export interface ProductForm {
  name: string;
  mainDesc: string;
  descHtml: string;
  price: number;
  imageUuids: string[];
  parameters: string;
  category: string;
}

export interface GetProductsResponse {
  products: SimpleProduct[];
  totalCount: number;
}