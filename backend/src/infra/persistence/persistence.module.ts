import { DynamicModule, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { InMemoryModule } from './inMemory/inMemory.module';

export const types = ['prisma', 'memory'] as const;

interface DatabaseOptions {
    type: (typeof types)[number];
    global?: boolean;
}

@Module({})
export class PersistenceModule {
    private static geModuleByType(type: (typeof types)[number]) {
        switch (type) {
            case 'prisma':
                return PrismaModule;
            case 'memory':
                return InMemoryModule;
        }
    }

    static async register({
        global = false,
        type,
    }: DatabaseOptions): Promise<DynamicModule> {
        return {
            global,
            module: PersistenceModule,
            imports: [this.geModuleByType(type)],
            exports: [this.geModuleByType(type)],
        };
    }
}
