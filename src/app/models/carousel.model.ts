import {
  Carousel_item_publicity,
  Carousel_item_product,
} from './carousel_item.model';

export interface Carousel {
  info: {
    name: string;
    id: number;
    description: string;
  };

  list: Carousel_item_publicity[] | Carousel_item_product[];
}
