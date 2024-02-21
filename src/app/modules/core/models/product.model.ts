export interface SimpleProduct {
  uuid: string;
  name: string;
  mainDesc: string;
  price: number;
  imageUrl: string;
  createdAt: string;
}

export interface Product {
  uuid: string;
  active: boolean;
  name: string;
  mainDesc: string;
  descHtml: string;
  price: number;
  imageUrls: string[];
  parameters: string;
  createAt: string;
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

export interface ProductResponse {
  timestamp: string;
  message: string;
}
