import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/typeorm/entities/Category';
import { CreateCategoriesParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  storeCategory(createCategoriesDetail: CreateCategoriesParams) {
    const newCategory = this.categoriesRepository.create({
      ...createCategoriesDetail,
    });

    return this.categoriesRepository.save(newCategory);
  }

  fetchCategory() {
    return this.categoriesRepository.find();
  }
}
