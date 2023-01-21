import { ArrayNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Exclude, Type } from "class-transformer";
import { BaseUserDto } from "./BaseUser.dto";

export class CreateUsersDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateUserDto)
    items!: CreateUserDto[];
}

export class CreateUserDto extends BaseUserDto {
    @Exclude()
    purchasedIntroductions?: number
}
