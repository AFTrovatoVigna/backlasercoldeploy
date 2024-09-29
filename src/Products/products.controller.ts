import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    return this.productsService.getProducts(1, 15);
  }

  @Get('name/:nombre')
  getProductByName(@Param('nombre') nombre: string) {
    return this.productsService.getProductByName(nombre);
  }

  @Get(':category/:category')
  getProductByCategory(@Param('category') category: string) {
    return this.productsService.getProductByCategory(category);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @ApiBearerAuth()
  //@Roles(Role.Admin)
  //@UseGuards(AuthGuard, RolesGuard)
  addProduct(@Body() product: Partial<Products>) {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  editProduct(@Param('id') id: string, @Body() product: Partial<Products>) {
    return this.productsService.editProduct(id, product);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
