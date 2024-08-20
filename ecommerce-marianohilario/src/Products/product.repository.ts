import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop Pro',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD.',
      price: 1200.99,
      stock: true,
      imgUrl: 'https://example.com/images/laptop-pro.jpg',
    },
    {
      id: 2,
      name: 'Smartphone X',
      description:
        'Latest model smartphone with a 6.5-inch display and 128GB storage.',
      price: 799.49,
      stock: true,
      imgUrl: 'https://example.com/images/smartphone-x.jpg',
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      description:
        'Noise-cancelling over-ear headphones with 30 hours of battery life.',
      price: 199.99,
      stock: false,
      imgUrl: 'https://example.com/images/wireless-headphones.jpg',
    },
    {
      id: 4,
      name: 'Gaming Monitor',
      description: '27-inch 144Hz monitor with 1ms response time.',
      price: 349.99,
      stock: true,
      imgUrl: 'https://example.com/images/gaming-monitor.jpg',
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with Cherry MX switches.',
      price: 129.99,
      stock: true,
      imgUrl: 'https://example.com/images/mechanical-keyboard.jpg',
    },
    {
      id: 6,
      name: 'Smartwatch Series 5',
      description: 'Water-resistant smartwatch with heart rate monitor.',
      price: 249.99,
      stock: false,
      imgUrl: 'https://example.com/images/smartwatch-series-5.jpg',
    },
    {
      id: 7,
      name: 'Bluetooth Speaker',
      description:
        'Portable Bluetooth speaker with deep bass and 20-hour battery life.',
      price: 99.99,
      stock: true,
      imgUrl: 'https://example.com/images/bluetooth-speaker.jpg',
    },
    {
      id: 8,
      name: '4K Action Camera',
      description: 'Waterproof 4K action camera with image stabilization.',
      price: 149.99,
      stock: true,
      imgUrl: 'https://example.com/images/4k-action-camera.jpg',
    },
    {
      id: 9,
      name: 'Tablet Pro',
      description: '10.5-inch tablet with 256GB storage and stylus support.',
      price: 549.99,
      stock: false,
      imgUrl: 'https://example.com/images/tablet-pro.jpg',
    },
    {
      id: 10,
      name: 'Drone X',
      description: 'Compact drone with 4K camera and 30-minute flight time.',
      price: 799.99,
      stock: true,
      imgUrl: 'https://example.com/images/drone-x.jpg',
    },
  ];

  async getProducts(page: number = 1, limit: number = 5): Promise<Product[]> {
    const startIndex = (page - 1) * limit;
    return await this.products.slice(startIndex, startIndex + limit);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.products.find(
      (product) => product.id === Number(id),
    );
    return product;
  }

  async createProduct(productData: Product): Promise<number> {
    let id = this.products.length + 1;
    const newProduct = { id, ...productData };
    this.products.push(newProduct);
    return newProduct.id;
  }

  async updateProduct(id: string, dataToUpdate: Product): Promise<number> {
    const indexToUpdate = this.products.findIndex(
      (product) => product.id === Number(id),
    );
    this.products[indexToUpdate] = {
      ...this.products[indexToUpdate],
      ...dataToUpdate,
    };

    return this.products[indexToUpdate].id;
  }

  async deleteProduct(id: string): Promise<number> {
    const indexToDelete = this.products.findIndex(
      (product) => product.id === Number(id),
    );
    this.products.splice(indexToDelete, 1);
    return Number(id);
  }
}
