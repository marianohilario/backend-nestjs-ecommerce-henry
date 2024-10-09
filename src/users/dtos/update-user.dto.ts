import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({
    description: 'Email del usuario (Opcional)',
    example: 'example@mail.com',
  })
  email?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Nombre del usuario (Opcional)',
    example: 'Mariano',
  })
  name?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Contraseña del usuario (Opcional)',
    example: 'S3cretP4ssw0rd!',
  })
  password?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Dirección del usuario (Opcional)',
    example: 'Calle falsa 123',
  })
  address?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Pais del usuario (Opcional)',
    example: 'Argentina',
  })
  country?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Ciudad del usuario (Opcional)',
    example: 'Buenos Aires',
  })
  city?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Teléfono del usuario (Opcional)',
    example: 123456789,
  })
  phone?: number;

  // @IsOptional()
  // @ApiProperty({
  //   description:
  //     'Rol del usuario (Opcional). True o False indican si es admin o no',
  //   example: 'true',
  // })
  // isAdmin?: boolean;
}
