import { Result, error, success } from '@app/core/Result';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { AdminRepository } from '../../ports/AdminRepository';
import { InvalidInformationError } from '../errors/InvalidInformationError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

interface AuthenticateAdminUseCaseRequest {
    email: string;
    password: string;
}

interface Authenticate {
    token: string;
}

type AuthenticateAdminUseCaseResponse = Result<
    ResourceNotFoundError | InvalidInformationError,
    Authenticate
>;

@Injectable()
export class AuthenticateAdminUseCase {
    constructor(
        private adminRepository: AdminRepository,
        private jwtService: JwtService,
    ) {}

    async execute({
        email,
        password,
    }: AuthenticateAdminUseCaseRequest): Promise<AuthenticateAdminUseCaseResponse> {
        const userExists = await this.adminRepository.findByEmail(email);

        if (!userExists) {
            return error(new ResourceNotFoundError('user'));
        }

        const passwordMatch = await compare(password, userExists.password);

        if (!passwordMatch) {
            return error(new InvalidInformationError('password match'));
        }

        return success({
            token: this.jwtService.sign({
                sub: userExists.id.toNumber(),
            }),
        });
    }
}
