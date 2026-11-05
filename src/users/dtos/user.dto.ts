import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Validate, ValidateNested } from "class-validator";
import { CreateProfileDto, UpdateProfileDto } from "./profile.dto";
import { Type } from "class-transformer";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {

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

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {

    @IsString()
    @IsOptional()
    nickname: string;

    @ValidateNested()
    @Type(() => UpdateProfileDto)
    @IsNotEmpty()
    profile: UpdateProfileDto;
}