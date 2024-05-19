import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import {
    updateAdminPasswordBodySchema,
    updateAdminPasswordParamsSchema,
} from '../validations/AdminValidations';

export class UpdatePasswordAdminParamsDto extends createZodDto(
    updateAdminPasswordParamsSchema,
) {
    @ApiProperty()
    id!: number;
}

export class UpdatePasswordAdminBodyDto extends createZodDto(
    updateAdminPasswordBodySchema,
) {
    @ApiProperty()
    password!: string;

    @ApiProperty()
    confirmPassword!: string;

    @ApiProperty()
    currentPassword!: string;
}
