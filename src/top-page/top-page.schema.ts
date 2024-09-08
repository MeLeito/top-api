import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TopLevelCategory {
    Courses = 'Courses',
    Services = 'Services',
    Products = 'Products',
}

class HhData {
    @Prop({ required: true })
    count: number;

    @Prop({ required: true })
    juniorSalary: number;

    @Prop({ required: true })
    middleSalary: number;

    @Prop({ required: true })
    seniorSalary: number;
}

class TopPageAdvantage {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;
}

@Schema({ timestamps: true })

export class TopPage extends Document {
    @Prop({ enum: TopLevelCategory, required: true })
    firstCategory: TopLevelCategory;

    @Prop({ required: true })
    secondCategory: string;

    @Prop({ unique: true, required: true })
    alias: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    category: string;

    @Prop({ type: HhData })
    hh?: HhData;

    @Prop({ type: [TopPageAdvantage], default: [] })
    advantages: TopPageAdvantage[];

    @Prop()
    seoText: string;

    @Prop({ required: true })
    tagsTitle: string;

    @Prop({ type: [String], required: true })
    tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);

//TopPageSchema.index({ title: 'text', seoText: 'text' });
TopPageSchema.index({ '$**': 'text' }) // любое поле текст