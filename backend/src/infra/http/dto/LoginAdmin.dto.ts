import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { authenticateAdminBodySchema } from '../validations/AuthenticateValidations';

export class LoginAdminBodyDto extends createZodDto(
    authenticateAdminBodySchema,
) {
    @ApiProperty()
    email!: string;

    @ApiProperty()
    password!: string;
}
