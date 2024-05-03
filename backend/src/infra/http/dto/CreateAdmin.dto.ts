/* eslint-disable indent */
import { StatusType } from '@app/core/entities/StatusTypes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({
    example: ['pending', 'active', 'inative'],
  })
  status!: StatusType;

  @ApiProperty()
  password!: string;

  @ApiProperty()
  level_id!: bigint;

  @ApiProperty()
  @ApiPropertyOptional()
  image_id!: bigint;

  @ApiProperty()
  admin_group_id!: bigint;
}
