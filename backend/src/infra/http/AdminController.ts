import { CreateAdminUseCase } from '@app/application/base/useCases/Admin/CreateAdminUseCase';
import { DeleteAdminUseCase } from '@app/application/base/useCases/Admin/DeleteAdminUseCase';
import { FindAdminUseCase } from '@app/application/base/useCases/Admin/FindAdminUseCase';
import { GetAdminUseCase } from '@app/application/base/useCases/Admin/GetAdminUseCase';
import { UpdateAdminUseCase } from '@app/application/base/useCases/Admin/UpdateAdminUseCase';
import { UpdatePasswordAdminUseCase } from '@app/application/base/useCases/Admin/UpdatePasswordAdminUseCase';
import { Admin } from '@app/domain/base/Admin';
import { CacheKey } from '@nestjs/cache-manager';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpCacheInterceptor } from '../persistence/cache/interceptor/http-cache.interceptor';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';

import { CreateAdminBodyDto } from './dto/CreateAdmin.dto';
import { DeleteAdminParamsDto } from './dto/DeleteAdmin.dto';
import { FindAdminParamsDto } from './dto/FindAdmin.dto';
import { GetAdminParamsDto } from './dto/GetAdmin.dto';
import {
    UpdateAdminBodyDto,
    UpdateAdminParamsDto,
} from './dto/UpdateAdmin.dto';
import {
    UpdatePasswordAdminBodyDto,
    UpdatePasswordAdminParamsDto,
} from './dto/UpdatePasswordAdmin.dto';
import { ApiResponseMapper } from './mapper/ApiResponseMapper';
import {
    createAdminBodySchema,
    findAdminParamsSchema,
    getAdminParamsSchema,
    updateAdminBodySchema,
    updateAdminParamsSchema,
    updateAdminPasswordBodySchema,
    updateAdminPasswordParamsSchema,
} from './validations/AdminValidations';

@Controller('/admin')
@ApiTags('Admin')
export class AdminController {
    constructor(
        private createAdminUseCase: CreateAdminUseCase,
        private findAdminUseCase: FindAdminUseCase,
        private getAdminUseCase: GetAdminUseCase,
        private deleteAdminUseCase: DeleteAdminUseCase,
        private updateAdminUseCase: UpdateAdminUseCase,
        private updatePasswordAdminUseCase: UpdatePasswordAdminUseCase,
    ) {}

    @Get('')
    @CacheKey('admins')
    @UseInterceptors(HttpCacheInterceptor)
    @ApiOperation({ summary: 'Find admin' })
    @UseGuards(AuthGuard('jwt'))
    findAll(
        @Query(new ZodValidationPipe(findAdminParamsSchema))
        query: FindAdminParamsDto,
    ) {
        const { page } = query;
        const response = this.findAdminUseCase.execute({ page });
        return new ApiResponseMapper(response).toJson();
    }

    @Get(':id')
    @CacheKey('admins')
    @UseInterceptors(HttpCacheInterceptor)
    @ApiOperation({ summary: 'Get admin' })
    @UseGuards(AuthGuard('jwt'))
    get(
        @Param(new ZodValidationPipe(getAdminParamsSchema))
        params: GetAdminParamsDto,
    ) {
        const { id } = params;
        const response = this.getAdminUseCase.execute({ id });
        return new ApiResponseMapper(response).toJson();
    }

    @Delete(':id')
    @CacheKey('admins')
    @UseInterceptors(HttpCacheInterceptor)
    @ApiOperation({ summary: 'Delete admin' })
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param(new ZodValidationPipe(getAdminParamsSchema))
        params: DeleteAdminParamsDto,
    ) {
        const { id } = params;
        const response = this.deleteAdminUseCase.execute({ id });
        return new ApiResponseMapper(response).toJson();
    }

    @Put(':id')
    @HttpCode(201)
    @ApiOperation({ summary: 'Update admin' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully updated.',
        type: () => Admin,
    })
    @ApiResponse({ status: 400, description: 'Forbidden.' })
    async update(
        @Param(new ZodValidationPipe(updateAdminParamsSchema))
        params: UpdateAdminParamsDto,
        @Body(new ZodValidationPipe(updateAdminBodySchema))
        body: UpdateAdminBodyDto,
    ) {
        const { id } = params;
        const admin = body;
        const response = await this.updateAdminUseCase.execute({
            id,
            ...admin,
        });
        if (response.isError()) {
            throw new BadRequestException(response.data.toString());
        }
        return new ApiResponseMapper(response.data).toJson();
    }

    @Patch(':id/change-password')
    @HttpCode(201)
    @ApiOperation({ summary: 'Update password admin' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully updated.',
        type: () => Admin,
    })
    @ApiResponse({ status: 400, description: 'Forbidden.' })
    async updatePassword(
        @Param(new ZodValidationPipe(updateAdminPasswordParamsSchema))
        params: UpdatePasswordAdminParamsDto,
        @Body(new ZodValidationPipe(updateAdminPasswordBodySchema))
        body: UpdatePasswordAdminBodyDto,
    ) {
        const { id } = params;
        const admin = body;
        const response = await this.updatePasswordAdminUseCase.execute({
            id,
            ...admin,
        });
        if (response.isError()) {
            throw new BadRequestException(response.data.toString());
        }
        return new ApiResponseMapper(response.data).toJson();
    }

    @Post('')
    @HttpCode(201)
    @ApiOperation({ summary: 'Create admin' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: () => Admin,
    })
    @ApiResponse({ status: 400, description: 'Forbidden.' })
    async create(
        @Body(new ZodValidationPipe(createAdminBodySchema))
        body: CreateAdminBodyDto,
    ) {
        const admin = body;
        const response = await this.createAdminUseCase.execute(admin);
        if (response.isError()) {
            throw new BadRequestException(response.data.toString());
        }
        return new ApiResponseMapper(response.data).toJson();
    }
}
