import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
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
  createAdminBodySchema,
  findAdminParamSchema,
} from '../validations/AdminValidations';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';
import { Admin } from '@app/domain/base/Admin';

//@ApiSecurity('basic')
//@ApiBearerAuth()
@Controller('/admin')
@ApiTags('Admin')
export class AdminController {
  constructor(
    private createAdminUseCase: CreateAdminUseCase,
    private findAdminUseCase: FindAdminUseCase,
  ) {}

  @Get('')
  @CacheKey('admins')
  @UseInterceptors(HttpCacheInterceptor)
  @UsePipes(new ZodValidationPipe(findAdminParamSchema))
  @ApiOperation({ summary: 'Get admin' })
  getAll(@Query() query: FindAdminParamSchema) {
    const { page } = query;
    const response = this.findAdminUseCase.execute({ page });
    return response;
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
    return response.data;
  }
}
