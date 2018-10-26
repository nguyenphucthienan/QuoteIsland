import { Author } from './author.interface';
import { Category } from './category.interface';

export interface Quote {
  _id: string;
  text: string;
  photoUrl?: string;
  loves?: any[];
  loveCount?: number;
  author?: Author;
  categories?: Category[];
}
