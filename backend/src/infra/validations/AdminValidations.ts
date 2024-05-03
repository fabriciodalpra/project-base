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

const getAdminParamSchema = z.object({
  id: z.coerce.bigint({
    required_error: 'This field is required',
    invalid_type_error: 'The field format must be number',
  }),
});

const findAdminParamSchema = z.object({
  page: z.coerce
    .number({
      invalid_type_error: 'The field format must be number',
    })
    .optional()
    .default(1),
});

const authenticateAdminBodySchema = z.object({
  email: z
    .string({
      required_error: 'This field is required',
      invalid_type_error: 'The field format must be string',
    })
    .email('This is not a valid email.'),
  password: z.string({
    required_error: 'This field is required',
    invalid_type_error: 'The field format must be string',
  }),
});

const createAdminBodySchema = z
  .object({
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
    level_id: z.coerce
      .bigint({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be number',
      })
      .min(1n, { message: 'This field is required' }),
    image_id: z.coerce
      .bigint({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be number',
      })
      .optional(),
    admin_group_id: z.coerce
      .bigint({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be number',
      })
      .min(1n, { message: 'This field is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const updateAdminBodySchema = z.object({
  params: z.object({
    id: z.coerce.bigint({
      required_error: 'This field is required',
      invalid_type_error: 'The field format must be number',
    }),
  }),
  body: z.object({
    name: z
      .string({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be string',
      })
      .nonempty('The field cannot be empty'),
    email: z
      .string({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be string',
      })
      .nonempty('The field cannot be empty')
      .email('This is not a valid email.'),
    status: StatusTypeEnum,
    level_id: z.coerce
      .bigint({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be number',
      })
      .min(1n, { message: 'This field is required' }),
    image_id: z.coerce
      .bigint({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be number',
      })
      .optional(),
    admin_group_id: z.coerce
      .bigint({
        required_error: 'This field is required',
        invalid_type_error: 'The field format must be number',
      })
      .min(1n, { message: 'This field is required' }),
  }),
});

const updatePasswordAdminBodySchema = z.object({
  params: z.object({
    id: z.coerce.bigint({
      required_error: 'This field is required',
      invalid_type_error: 'The field format must be number',
    }),
  }),
  body: z
    .object({
      password: z
        .string({
          required_error: 'This field is required',
          invalid_type_error: 'The field format must be string',
        })
        .nonempty('The field cannot be empty')
        .min(4, { message: 'must have at least 4 characters' }),
      confirmPassword: z
        .string({
          required_error: 'This field is required',
          invalid_type_error: 'The field format must be string',
        })
        .nonempty('The field cannot be empty')
        .min(4, { message: 'must have at least 4 characters' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),
});

const deleteAdminBodySchema = z.object({
  params: z.object({
    id: z.coerce.bigint({
      required_error: 'This field is required',
      invalid_type_error: 'The field format must be number',
    }),
  }),
});

type GetAdminParamSchema = z.infer<typeof getAdminParamSchema>;
type CreateAdminBodySchema = z.infer<typeof createAdminBodySchema>;
type UpdateAdminBodySchema = z.infer<typeof updateAdminBodySchema>;
type AuthenticateAdminBodySchema = z.infer<typeof authenticateAdminBodySchema>;
type FindAdminParamSchema = z.infer<typeof findAdminParamSchema>;
type UpdatePasswordAdminBodySchema = z.infer<
  typeof updatePasswordAdminBodySchema
>;
type DeleteAdminBodySchema = z.infer<typeof deleteAdminBodySchema>;

export {
  getAdminParamSchema,
  GetAdminParamSchema,
  createAdminBodySchema,
  CreateAdminBodySchema,
  updateAdminBodySchema,
  UpdateAdminBodySchema,
  authenticateAdminBodySchema,
  AuthenticateAdminBodySchema,
  findAdminParamSchema,
  FindAdminParamSchema,
  updatePasswordAdminBodySchema,
  UpdatePasswordAdminBodySchema,
  deleteAdminBodySchema,
  DeleteAdminBodySchema,
};
