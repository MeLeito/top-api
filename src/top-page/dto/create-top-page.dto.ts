import { IsString, IsEnum, IsArray, IsOptional, ValidateNested, IsNumber } from 'class-validator';
import { TopLevelCategory } from '../top-page.schema';
import { Type } from 'class-transformer';

export class HhDataDto {
    @IsNumber()
    count: number;
    @IsNumber()
    juniorSalary: number;
    @IsNumber()
    middleSalary: number;
    @IsNumber()
    seniorSalary: number;
}

export class TopPageAdvantageDto {
    title: string;
    description: string;
}

export class CreateTopPageDto {
    @IsEnum(TopLevelCategory)
    firstCategory: TopLevelCategory;

    @IsString()
    secondCategory: string;

    @IsString()
    alias: string;

    @IsString()
    title: string;

    @IsString()
    category: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => HhDataDto)
    hh?: HhDataDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TopPageAdvantageDto)
    advantages: TopPageAdvantageDto[];

    @IsString()
    @IsOptional()
    seoText?: string;

    @IsString()
    tagsTitle: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];
}

// export class UpdateTopPageDto extends CreateTopPageDto { }

// export class FindTopPageDto {
//     @IsEnum(TopLevelCategory)
//     firstCategory: TopLevelCategory;
// }