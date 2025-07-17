import { loginSchema } from "@/lib/schema";
import type { LoginFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const LoginFormSection = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userRole: "customer",
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    if (data?.userRole === "customer") {
      localStorage.setItem("ROLE", "C");
      navigate(ROUTES?.C_OVERVIEW);
    } else {
      localStorage.setItem("ROLE", "E");
      navigate(ROUTES?.E_PENDING);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-7 p-6">
        <div className="flex flex-col items-center text-center mb-9">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-balance">Login to your Depositor account</p>
        </div>
        <FormField
          control={form.control}
          name="userRole"
          render={({ field }) => (
            <>
              <FormLabel>User Role</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="customer" />
                    </FormControl>
                    <FormLabel className="font-normal">Customer</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="employee" />
                    </FormControl>
                    <FormLabel className="font-normal">Employee</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter Username" {...field} />
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
                <Input type="password" placeholder="Enter Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};

export default LoginFormSection;
