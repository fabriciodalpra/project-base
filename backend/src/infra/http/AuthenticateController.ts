import { AuthenticateAdminUseCase } from '@app/application/base/useCases/Admin/AuthenticateAdminUseCase';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiResponseMapper } from './mapper/ApiResponseMapper';

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateAdminUseCase: AuthenticateAdminUseCase) {}

  @Post('login')
  async login(@Body() body: any) {
    const authenticate = body;
    const response = await this.authenticateAdminUseCase.execute(authenticate);
    if (response.isError()) {
      throw new BadRequestException(response.data.toString());
    }
    return new ApiResponseMapper(response.data).toJson();
  }

  @Post('logout')
  async logout() {}
}
