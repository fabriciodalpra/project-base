import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/CreateAdmin.dto';
import { CreateAdminUseCase } from '@app/application/base/useCases/Admin/CreateAdminUseCase';
import { HttpCacheInterceptor } from '../persistence/cache/interceptor/http-cache.interceptor';
import { CacheKey } from '@nestjs/cache-manager';
import { FindAdminUseCase } from '@app/application/base/useCases/Admin/FindAdminUseCase';
import {
  FindAdminParamSchema,
  GetAdminParamSchema,
  createAdminBodySchema,
  findAdminParamSchema,
  getAdminParamSchema,
} from '../validations/AdminValidations';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';
import { Admin } from '@app/domain/base/Admin';
import { ApiResponseMapper } from './mapper/ApiResponseMapper';
import { GetAdminUseCase } from '@app/application/base/useCases/Admin/GetAdminUseCase';
import { AuthGuard } from '@nestjs/passport';
import { DeleteAdminUseCase } from '@app/application/base/useCases/Admin/DeleteAdminUseCase';

//@ApiSecurity('basic')
//@ApiBearerAuth()
@Controller('/admin')
@ApiTags('Admin')
export class AdminController {
  constructor(
    private createAdminUseCase: CreateAdminUseCase,
    private findAdminUseCase: FindAdminUseCase,
    private getAdminUseCase: GetAdminUseCase,
    private deleteAdminUseCase: DeleteAdminUseCase,
  ) {}

  @Get('')
  @CacheKey('admins')
  @UseInterceptors(HttpCacheInterceptor)
  @UsePipes(new ZodValidationPipe(findAdminParamSchema))
  @ApiOperation({ summary: 'Find admin' })
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query() query: FindAdminParamSchema) {
    const { page } = query;
    const response = this.findAdminUseCase.execute({ page });
    return new ApiResponseMapper(response).toJson();
  }

  @Get(':id')
  @CacheKey('admins')
  @UseInterceptors(HttpCacheInterceptor)
  @UsePipes(new ZodValidationPipe(getAdminParamSchema))
  @ApiOperation({ summary: 'Get admin' })
  @UseGuards(AuthGuard('jwt'))
  get(@Param() params: GetAdminParamSchema) {
    const { id } = params;
    const response = this.getAdminUseCase.execute({ id });
    return new ApiResponseMapper(response).toJson();
  }

  @Delete(':id')
  @CacheKey('admins')
  @UseInterceptors(HttpCacheInterceptor)
  @UsePipes(new ZodValidationPipe(getAdminParamSchema))
  @ApiOperation({ summary: 'Delete admin' })
  @UseGuards(AuthGuard('jwt'))
  delete(@Param() params: GetAdminParamSchema) {
    const { id } = params;
    const response = this.deleteAdminUseCase.execute({ id });
    return new ApiResponseMapper(response).toJson();
  }

  @Post('')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAdminBodySchema))
  @ApiOperation({ summary: 'Create admin' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: () => Admin,
  })
  @ApiResponse({ status: 400, description: 'Forbidden.' })
  async create(@Body() body: CreateAdminDto) {
    const admin = body;
    const response = await this.createAdminUseCase.execute(admin);
    if (response.isError()) {
      throw new BadRequestException(response.data.toString());
    }
    return new ApiResponseMapper(response.data).toJson();
  }
}
