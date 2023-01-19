import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from 'src/categories/services/categories/categories.service';
import { CreateCategoriesDto } from 'src/users/dtos/CreateCategories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  createCategories(@Body() createCategoriesDto: CreateCategoriesDto) {
    return this.categoriesService.storeCategory(createCategoriesDto);
  }

  @Get()
  getCategories() {
    return this.categoriesService.fetchCategory();
  }
}
