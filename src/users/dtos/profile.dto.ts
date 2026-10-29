import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsOptional()
    nickname: string;

    @IsString()
    @IsOptional()
    avartar: string;
}