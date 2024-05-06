import { UniqueEntityID } from '../src/core/entities/UniqueEntityID';
import { PrismaClient } from '@prisma/client';
import { StatusType } from '@prisma/client';
import { hash } from 'bcryptjs';

const prismaClient = new PrismaClient({
  log: process.env.NODE_ENV === 'dev' ? ['query'] : [],
});

async function main() {
  const passwordHash = await hash('admin', 8);
  const admin = await prismaClient.admin.upsert({
    where: {
      email: 'admin@admin.com',
    },
    update: {},
    create: {
      id: new UniqueEntityID().toValue(),
      name: 'Admin',
      email: 'admin@admin.com',
      status: StatusType.active,
      password: passwordHash,
      level: {
        create: {
          id: new UniqueEntityID().toValue(),
          name: 'Administrator',
        },
      },
      group: {
        create: {
          id: new UniqueEntityID().toValue(),
          name: 'Admin',
        },
      },
    },
  });
  console.log({ admin });
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
