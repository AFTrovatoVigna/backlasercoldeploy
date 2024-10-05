import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/cart/cart.entity';
import { Orders } from 'src/orders/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'USERS',
})
export class Users {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del usuario, debe ser un string de máximo 50 caracteres.',
    example: 'Juan',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario. Debe ser único y tener un formato válido.',
    example: 'juan.perez@example.com',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario, almacenada en formato hash.',
    example: '$2b$10$N5...hashedpassword',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @ApiProperty({
    description: 'Documento Nacional de Identidad (DNI) del usuario. Debe ser único.',
    example: '12345678',
  })
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  Dni: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del usuario en formato ISO.',
    example: '1990-05-15',
  })
  @Column({
    type: 'date',
    nullable: false,
  })
  birthDate: Date;

  @ApiProperty({
    description: 'Número de teléfono del usuario, representado como string para manejar formatos de varios países.',
    example: '1123456789',
  })
  @Column({
    type: 'varchar',
  })
  phone: number;

  @ApiProperty({
    description: 'País de residencia del usuario.',
    example: 'Argentina',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @ApiProperty({
    description: 'Ciudad de residencia del usuario.',
    example: 'Buenos Aires',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @ApiProperty({
    description: 'Dirección de residencia del usuario.',
    example: 'Calle Falsa 123',
  })
  @Column({
    type: 'text',
  })
  address: string;

  @ApiProperty({
    description: 'Indica si el usuario tiene privilegios de administrador.',
    example: false,
  })
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @ApiHideProperty()
  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];

  @ApiHideProperty()
  @OneToMany(() => Cart, (cart) => cart.users)
  cart: Cart[];
}
