import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { deleteAdminParamsSchema } from '../validations/AdminValidations';

export class DeleteAdminParamsDto extends createZodDto(
    deleteAdminParamsSchema,
) {
    @ApiProperty()
    id!: number;
}
