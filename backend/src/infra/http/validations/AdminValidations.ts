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

const getParamSchema = z.object({
  id: z.coerce.bigint({
    required_error: 'This field is required',
    invalid_type_error: 'The field format must be number',
  }),
});

const listParamSchema = z.object({
  page: z.coerce
    .number({
      invalid_type_error: 'The field format must be number',
    })
    .optional()
    .default(1),
});

const authenticateBodySchema = z.object({
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

const createBodySchema = z
  .object({
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

const updateBodySchema = z.object({
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

const updatePasswordBodySchema = z.object({
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

const deleteBodySchema = z.object({
  params: z.object({
    id: z.coerce.bigint({
      required_error: 'This field is required',
      invalid_type_error: 'The field format must be number',
    }),
  }),
});

export {
  getParamSchema,
  createBodySchema,
  updateBodySchema,
  authenticateBodySchema,
  listParamSchema,
  updatePasswordBodySchema,
  deleteBodySchema,
};
