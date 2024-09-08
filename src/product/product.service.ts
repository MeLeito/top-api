import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/review.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly Product: Model<ProductDocument>) { }

    async create(dto: CreateProductDto) {
        return this.Product.create(dto)
    }

    async findById(id: string) {
        return this.Product.findById(id).exec();
    }

    async deleteById(id: string) {
        return this.Product.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.Product.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async findWithReviews(dto: FindProductDto) {
        return this.Product.aggregate([
            {
                $match: {
                    categories: dto.category
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $limit: dto.limit
            },
            {
                $lookup: {
                    from: 'Review',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'review'
                }
            },
            {
                $addFields: {
                    reviewCount: { $size: '$review' },
                    reviewAvg: { $avg: '$review.rating' },
                    reviews: {
                        $function: {
                            body: `function (reviews) {
                            reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            return reviews;
                            }`,
                            args: ['$reviews'],
                            lang: 'js'
                        }
                    }
                }
            }
        ]).exec() as unknown as (Product & { review: ReviewModel[], reviewCount: number, reviewAvg: number })[];
    }
}
