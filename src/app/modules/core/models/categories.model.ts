export interface Category {
  name: string;
  shortId: string;
}

export type PostCategory = Omit<Category, 'shortId'>;

export interface PostCategoryResponse {
  timestamp: string;
  message: string;
}
