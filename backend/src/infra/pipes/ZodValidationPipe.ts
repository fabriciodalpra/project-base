/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodEffects, ZodError, ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodObject<any> | ZodEffects<ZodObject<any>>) {}

    transform(value: any) {
        console.log('value', value);
        try {
            this.schema.parse(value);
        } catch (error) {
            console.log('error', error);
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    errors: error.format(),
                    message: 'Validation failed',
                    statusCode: 400,
                });
            }

            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}
