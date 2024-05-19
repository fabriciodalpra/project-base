import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { getAdminParamsSchema } from '../validations/AdminValidations';

export class GetAdminParamsDto extends createZodDto(getAdminParamsSchema) {
    @ApiProperty()
    id!: number;
}
