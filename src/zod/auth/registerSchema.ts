import { z } from "zod";

const registerSchema = z.object({
    fullname: z.string().min(1, { message: "Full name is required." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});
export default registerSchema;