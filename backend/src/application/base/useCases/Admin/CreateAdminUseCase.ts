import { Result, error, success } from '@app/core/Result';
import { StatusType } from '@app/core/entities/StatusTypes';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Admin } from '@app/domain/base/Admin';
import { File } from '@app/domain/base/File';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { AdminGroupRepository } from '../../ports/AdminGroupRepository';
import { AdminRepository } from '../../ports/AdminRepository';
import { FileRepository } from '../../ports/FileRepository';
import { LevelRepository } from '../../ports/LevelRepository';
import { ResourceAlreadyExistsError } from '../errors/ResourceAlreadyExistsError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

interface CreateAdminUseCaseRequest {
    name: string;
    email: string;
    status: StatusType;
    password: string;
    level_id: number;
    image_id?: number;
    admin_group_id: number;
}

type CreateAdminUseCaseResponse = Result<
    ResourceAlreadyExistsError | ResourceNotFoundError,
    Admin
>;

@Injectable()
export class CreateAdminUseCase {
    constructor(
        private adminRepository: AdminRepository,
        private levelRepository: LevelRepository,
        private adminGroupRepository: AdminGroupRepository,
        private fileRepository: FileRepository,
    ) {}

    async execute({
        name,
        email,
        status,
        password,
        level_id,
        image_id,
        admin_group_id,
    }: CreateAdminUseCaseRequest): Promise<CreateAdminUseCaseResponse> {
        const checkAdmin = await this.adminRepository.findByEmail(email);

        if (checkAdmin) {
            return error(new ResourceAlreadyExistsError('email'));
        }

        const levelExists = await this.levelRepository.findById(
            new UniqueEntityID(Number(level_id)),
        );

        if (!levelExists) {
            return error(new ResourceNotFoundError('level'));
        }

        const adminGroupExists = await this.adminGroupRepository.findById(
            new UniqueEntityID(Number(admin_group_id)),
        );

        if (!adminGroupExists) {
            return error(new ResourceNotFoundError('admin group'));
        }

        let fileExists: File | null = null;
        if (image_id) {
            fileExists = await this.fileRepository.findById(
                new UniqueEntityID(Number(image_id)),
            );
        }

        const passwordHash = await hash(password, 8);

        const user = new Admin({
            name,
            email,
            password: passwordHash,
            status,
            level: levelExists,
            adminGroup: adminGroupExists,
            image: fileExists,
        });

        const response = await this.adminRepository.create(user);

        return success(response);
    }
}
