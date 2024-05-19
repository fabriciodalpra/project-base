import { StatusType } from '@app/core/entities/StatusTypes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { createAdminBodySchema } from '../validations/AdminValidations';

export class CreateAdminBodyDto extends createZodDto(createAdminBodySchema) {
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
    level_id!: number;

    @ApiProperty()
    @ApiPropertyOptional()
    image_id!: number;

    @ApiProperty()
    admin_group_id!: number;
}
