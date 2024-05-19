import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { findAdminParamsSchema } from '../validations/AdminValidations';

export class FindAdminParamsDto extends createZodDto(findAdminParamsSchema) {
    @ApiProperty()
    @ApiPropertyOptional()
    page!: number;
}
