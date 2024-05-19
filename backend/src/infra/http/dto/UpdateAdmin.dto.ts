import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusType } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import {
    updateAdminBodySchema,
    updateAdminParamsSchema,
} from '../validations/AdminValidations';

export class UpdateAdminParamsDto extends createZodDto(
    updateAdminParamsSchema,
) {
    @ApiProperty()
    id!: number;
}

export class UpdateAdminBodyDto extends createZodDto(updateAdminBodySchema) {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty({
        example: ['pending', 'active', 'inative'],
    })
    status!: StatusType;

    @ApiProperty()
    level_id!: number;

    @ApiProperty()
    @ApiPropertyOptional()
    image_id!: number;

    @ApiProperty()
    admin_group_id!: number;
}
