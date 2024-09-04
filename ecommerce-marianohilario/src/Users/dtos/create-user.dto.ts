import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @IsStrongPassword()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'Password too weak, must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;

  @IsNotEmpty()
  confirmPassword: string

  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  country?: string | undefined;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  city?: string | undefined;
}
