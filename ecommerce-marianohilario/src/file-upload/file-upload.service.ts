import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../Products/product.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadProductImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException('Product not found');

    const uploadedImage = await this.fileUploadRepository.uploadFile(file);

    await this.productsRepository.update(product.id, {
      imgUrl: uploadedImage.secure_url,
    });

    const updatedProduct = await this.productsRepository.findOneBy({
      id: productId,
    });

    return updatedProduct;
  }
}
