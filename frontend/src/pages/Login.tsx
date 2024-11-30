import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import FormFields from "@/elements/FormFields";
import LoadingButton from "@/elements/LoadingButton";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";
import axios from "axios";

export default function Login() {
  const form = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth//login",
        {
          email: form.watch("email"),
          password: form.watch("password"),
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(true);
    console.log(form.getValues());
    setLoading(false);
  };
  return (
    <div className="flex flex-col h-screen bg-cover bg-auth">
      <Link
        to="#"
        className="flex items-start justify-center m-4 mb-0 lg:my-8 lg:mx-20 md:justify-start "
      >
        <img src={Logo} alt="logo" className="h-40 w-88" />
      </Link>
      <div className="flex flex-col items-center justify-center m-4">
        <Card className="w-full max-w-md h-100">
          <CardHeader>
            <CardTitle className="text-xl text-center">LOGIN</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFields
                  type="email"
                  required
                  name="email"
                  label="Email"
                  form={form}
                />
                <FormFields
                  type="password"
                  required
                  name="password"
                  label="Password"
                  form={form}
                  className="mt-4"
                />
                <div className="flex items-center justify-between">
                  <div className=" my-4">
                    <FormItem className="flex flex-row items-start w-full space-y-0">
                      <FormControl>
                        <Controller
                          name="remember_me"
                          control={form.control}
                          render={({ field }) => (
                            <div className="flex items-center">
                              <Checkbox
                                id="remember_me"
                                checked={field.value}
                                onCheckedChange={(checked) =>
                                  field.onChange(checked)
                                }
                              />
                              <FormLabel
                                className="ml-2 text-sm cursor-pointer leading-2"
                                htmlFor="remember_me"
                              >
                                Remember me
                              </FormLabel>
                            </div>
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                  <div className="my-1">
                    <Link to="#">
                      <span className="text-sm font-medium text-blue-800 hover:underline">
                        Forgot Password?
                      </span>
                    </Link>
                  </div>
                </div>
                <LoadingButton
                  loading={loading}
                  size="xl"
                  className="mt-6 px-4 py-2 w-full bg-blue-900"
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
