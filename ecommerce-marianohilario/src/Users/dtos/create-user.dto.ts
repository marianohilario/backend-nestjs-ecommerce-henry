import { ApiProperty } from '@nestjs/swagger';
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
    description: 'Email del usuario',
    example: 'example@mail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description:
      'Nombre del usuario. Debe ser mayor a 3 caracteres y menor a 80',
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
      'Contraseña del usuario. Debe ser mayor a 8 caracteres y menor a 15. Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial ("!@#$%^&*")',
    example: 'S3cretP4ssw0rd!',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Confirma la contraseña',
    example: 'S3cretP4ssw0rd!',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description:
      'Dirección del usuario. Debe ser mayor a 3 caracteres y menor a 80',
    example: 'Calle falsa 123',
  })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Teléfono del usuario',
    example: 123456789,
  })
  phone: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  @ApiProperty({
    description:
      'Pais del usuario. Debe ser mayor a 3 caracteres y menor a 20. El mismo es opcional.',
    example: 'Argentina',
  })
  country?: string | undefined;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  @ApiProperty({
    description:
      'Ciudad del usuario. Debe ser mayor a 3 caracteres y menor a 20. El mismo es opcional.',
    example: 'Buenos Aires',
  })
  city?: string | undefined;

  @IsEmpty()
  @ApiProperty({
    description: 'Rol del usuario. Por defecto es false',
    example: false,
  })
  isAdmin?: boolean;
}
