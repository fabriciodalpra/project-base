import { StatusType } from '@prisma/client';
import { z } from 'zod';

const StatusTypeEnum = z.nativeEnum(StatusType, {
    errorMap: (issue) => {
        switch (issue.code) {
            case 'invalid_enum_value':
                return {
                    message: 'The type must be active, inactive or pending',
                };
            default:
                return { message: 'This field is required' };
        }
    },
});

const getAdminParamsSchema = z.object({
    id: z.number({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be number',
    }),
});

const findAdminParamsSchema = z.object({
    page: z.coerce
        .number({
            invalid_type_error: 'The field format must be number',
        })
        .optional()
        .default(1),
});

const createAdminBodySchema = z
    .object({
        name: z
            .string({
                required_error: 'This field is required',
                invalid_type_error: 'The field format must be string',
            })
            .min(4, { message: 'must have at least 4 characters' }),
        email: z
            .string({
                required_error: 'This field is required',
                invalid_type_error: 'The field format must be string',
            })
            .email('This is not a valid email.'),
        password: z
            .string({
                required_error: 'This field is required',
                invalid_type_error: 'The field format must be string',
            })
            .min(4, { message: 'must have at least 4 characters' }),
        confirmPassword: z
            .string({
                required_error: 'This field is required',
                invalid_type_error: 'The field format must be string',
            })
            .min(4, { message: 'must have at least 4 characters' }),
        status: StatusTypeEnum,
        level_id: z
            .number({
                required_error: 'This field is required',
                invalid_type_error: 'The field format must be number',
            })
            .min(1, { message: 'This field is required' }),
        image_id: z
            .number({
                required_error: 'This field is required',
                invalid_type_error: 'The field format must be number',
            })
            .optional(),
        admin_group_id: z
            .number({
                required_error: 'This field is required',
                invalid_type_error: 'The field format must be number',
            })
            .min(1, { message: 'This field is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

const updateAdminParamsSchema = z.object({
    id: z.coerce.number({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be number',
    }),
});

const updateAdminBodySchema = z.object({
    name: z.string({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be string',
    }),
    email: z
        .string({
            required_error: 'This field is required',
            invalid_type_error: 'The field format must be string',
        })
        .email('This is not a valid email.'),
    status: StatusTypeEnum,
    level_id: z
        .number({
            required_error: 'This field is required',
            invalid_type_error: 'The field format must be number',
        })
        .min(1, { message: 'This field is required' }),
    image_id: z
        .number({
            required_error: 'This field is required',
            invalid_type_error: 'The field format must be number',
        })
        .optional(),
    admin_group_id: z
        .number({
            required_error: 'This field is required',
            invalid_type_error: 'The field format must be number',
        })
        .min(1, { message: 'This field is required' }),
});

const updateAdminPasswordParamsSchema = z.object({
    id: z.number({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be number',
    }),
});

const updateAdminPasswordBodySchema = z
    .object({
        password: z
            .string({
                required_error: 'This field is required',
                invalid_type_error: 'The field format must be string',
            })
            .min(4, { message: 'must have at least 4 characters' }),
        confirmPassword: z
            .string({
                required_error: 'This field is required',
                invalid_type_error: 'The field format must be string',
            })
            .min(4, { message: 'must have at least 4 characters' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

const deleteAdminParamsSchema = z.object({
    params: z.object({
        id: z.number({
            required_error: 'This field is required',
            invalid_type_error: 'The field format must be number',
        }),
    }),
});

export {
    createAdminBodySchema,
    deleteAdminParamsSchema,
    findAdminParamsSchema,
    getAdminParamsSchema,
    updateAdminBodySchema,
    updateAdminParamsSchema,
    updateAdminPasswordBodySchema,
    updateAdminPasswordParamsSchema,
};
