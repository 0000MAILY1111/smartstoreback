import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../categories/entities/category.entity";
import { DataSource, Repository } from "typeorm";
import { Product } from "../products/entities/product.entity";
import { categories } from "./data/categories";
import { products } from "./data/products";

@Injectable()
export class SeederService {
    constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private dataSource: DataSource  
    ) {}
    async onModuleInit() {
        const conection = this.dataSource
        await conection.dropDatabase();
        await conection.synchronize();

    }

    async seed() {
     await this.categoryRepository.save(categories) ;
     for await (const seedProduct of products) {
        const category = await this.categoryRepository.findOneBy({ id: seedProduct.categoryId });
        const product = new Product();
        product.name = seedProduct.name;
        product.price = seedProduct.price;
        product.image = seedProduct.image;
        
        product.inventory = seedProduct.inventory;
        product.categoryId = seedProduct.categoryId;  ///puede ser que no exista la categoria
        

        await this.productRepository.save(product);




     }
    }

}
