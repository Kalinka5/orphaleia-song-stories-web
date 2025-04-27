
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  price: number;
  category: string;
  publicationDate: string;
  publisher: string;
  isbn: string;
  pages: number;
  format: string;
  featured?: boolean;
}
