import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import registerSchema from '@/zod/auth/registerSchema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUserRegisterMutation } from '@/features/authentication/apiSlice/register';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/authentication/authSlice';
import toast from 'react-hot-toast';

function Register({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const [register, { isLoading, isSuccess }] = useUserRegisterMutation();
    const dispatch = useDispatch();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        console.log("Form submitted:", data);
        try {
            const response = await register(data);
            dispatch(setCredentials(response.data));
            toast.success("Registered Successfully");
        } catch (error) {
            toast.error("something went wrong");
        }
    };
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Register</CardTitle>
                    <CardDescription>
                        Register with your Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* <form> */}
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-4">
                            <Button variant="outline" className="w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Login with Google
                            </Button>
                        </div>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Full name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    Register
                                </Button>
                            </form>
                        </Form>
                        <div className="text-center text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="underline underline-offset-4"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                    {/* </form> */}
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                By clicking continue, you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}

export default Register;
