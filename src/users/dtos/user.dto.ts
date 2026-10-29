import { IsEmail, IsNotEmpty, IsString, Length, Validate, ValidateNested } from "class-validator";
import { CreateProfileDto } from "./profile.dto";
import { Type } from "class-transformer";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;

    @ValidateNested()
    @Type(() => CreateProfileDto)
    @IsNotEmpty()
    profile: CreateProfileDto;
}

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 8)
    nickname?: string;
}