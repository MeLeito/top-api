import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.schema';

class Leak {

}

const leaks = [];

@Injectable()
export class ReviewService {
  constructor(@InjectModel('Review') private readonly reviewModel: Model<ReviewModel>) { }

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    const createdReview = new this.reviewModel(dto);
    return createdReview.save();
  }

  async delete(id: string): Promise<ReviewModel | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewModel[]> {
    return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
  }

  async deleteByProductId(productId: string) {
    leaks.push(new Leak());
    return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
  }
}
