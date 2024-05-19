import { z } from 'zod';

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

export { authenticateAdminBodySchema };
