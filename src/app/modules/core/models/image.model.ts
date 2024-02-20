export interface PostImageResponse {
  uuid: string;
  createdAt: string;
}

export interface Image {
  url: string;
}

export interface DeleteImageResponse {
  timestamp: string;
  message: string;
}
