import { AuthenticateAdminUseCase } from '@app/application/base/useCases/Admin/AuthenticateAdminUseCase';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { AdminGroup } from '@app/domain/base/AdminGroup';
import { Level } from '@app/domain/base/Level';
import { InMemoryAdminGroupRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryAdminGroupRepository';
import { InMemoryAdminRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryAdminRepository';
import { InMemoryLevelRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryLevelRepository';
import { JwtService } from '@nestjs/jwt';

export async function AuthenticateAdminFactory() {
  const inMemoryAdminRepository = new InMemoryAdminRepository();
  const inMemoryLevelRepository = new InMemoryLevelRepository();
  const inMemoryAdminGroupRepository = new InMemoryAdminGroupRepository();

  const privateKey: string = process.env.JWT_PRIVATE_KEY || '';
  const publicKey: string = process.env.JWT_PUBLIC_KEY || '';

  const jwtService = new JwtService({
    signOptions: { expiresIn: '60s', algorithm: 'RS256' },
    privateKey: Buffer.from(privateKey, 'base64'),
    publicKey: Buffer.from(publicKey, 'base64'),
  });

  const authenticateAdminUseCase = new AuthenticateAdminUseCase(
    inMemoryAdminRepository,
    jwtService,
  );

  const level = await inMemoryLevelRepository.create(
    new Level({
      id: new UniqueEntityID(),
      name: 'Admin',
    }),
  );

  const adminGroup = await inMemoryAdminGroupRepository.create(
    new AdminGroup({
      id: new UniqueEntityID(),
      name: 'Admin',
    }),
  );

  return {
    authenticateAdminUseCase,
    inMemoryAdminRepository,
    level,
    adminGroup,
  };
}
