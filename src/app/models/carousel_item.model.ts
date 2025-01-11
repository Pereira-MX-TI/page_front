export interface Carousel_item_publicity {
  id: string;
  link: string;
  url: string;
}

export interface Carousel_item_product {
  id: string;
  product: Product;
}

export interface Product {
  brand: { id: 60; nombre: 'ALFA' };
  category: { id: 13; nombre: 'Accesorio' };
  clave: 'XPH-10-076';
  description: { detalle: string };
  files: { direccion: string }[];
  id: number;
  material: { nombre: string };
  messuare: { nombre: string };
  nombre: string;
}
