import { AuthenticateAdminUseCase } from '@app/application/base/useCases/Admin/AuthenticateAdminUseCase';
import {
    BadRequestException,
    Body,
    Controller,
    Post,
    UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { LoginAdminBodyDto } from './dto/LoginAdmin.dto';
import { ApiResponseMapper } from './mapper/ApiResponseMapper';
import { authenticateAdminBodySchema } from './validations/AuthenticateValidations';
@Controller('/sessions')
@ApiTags('Session')
export class AuthenticateController {
    constructor(private authenticateAdminUseCase: AuthenticateAdminUseCase) {}

    @Post('login')
    @UsePipes(new ZodValidationPipe(authenticateAdminBodySchema))
    @ApiOperation({ summary: 'Login' })
    async login(@Body() body: LoginAdminBodyDto) {
        const authenticate = body;
        const response =
            await this.authenticateAdminUseCase.execute(authenticate);
        if (response.isError()) {
            throw new BadRequestException(response.data.toString());
        }
        return new ApiResponseMapper(response.data).toJson();
    }

    @Post('logout')
    @ApiOperation({ summary: 'Logout' })
    async logout() {}
}
