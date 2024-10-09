import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
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
  @ApiProperty({
    description: "User's email",
    example: 'test-example@mail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description:
      "User's name. It must be greater than 3 characters and less than 80",
    example: 'Mariano',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @IsStrongPassword()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'Password too weak, must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @ApiProperty({
    description:
      'User password. Must be greater than 8 characters and less than 15. Must contain at least one uppercase letter, one lowercase letter, one number and one special character ("!@#$%^&*")',
    example: 'S3cretP4ssw0rd!',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Confirm password',
    example: 'S3cretP4ssw0rd!',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description:
      "User's address. It must be greater than 3 characters and less than 80",
    example: 'Calle falsa 123',
  })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "User's phone number",
    example: 123456789,
  })
  phone: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  @ApiPropertyOptional({
    description:
      "User's country. It must be greater than 3 characters and less than 20. It is optional.",
    example: 'Argentina',
  })
  country?: string | undefined;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  @ApiPropertyOptional({
    description:
      "User's city. It must be greater than 3 characters and less than 20. It is optional.",
    example: 'Buenos Aires',
  })
  city?: string | undefined;

  @IsEmpty()
  @ApiHideProperty()
  // @ApiProperty({
  //   description: "User's rol. Default is false",
  //   example: false,
  // })
  isAdmin?: boolean;
}
