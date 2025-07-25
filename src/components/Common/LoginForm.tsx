import { phoneLoginSchema } from "@/lib/schema";
import type { IAPIErrorResponse, IVerifyOTPPayload, PhoneLoginFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, ROUTES } from "@/lib/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation } from "@tanstack/react-query";
import { getSSOLogin, postGenerateOTP, postVerifyOTP } from "@/lib/apis/loginApis";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setAuthField } from "@/store/slice/authSlice";

type LoginStep = "phone" | "otp";

const LoginFormSection = () => {
  const navigate = useNavigate();

  const { empNumber, empPernr, employeeData, mobileNo, plantNo, userData, userRole } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [otpTimer, setOtpTimer] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<LoginStep>("phone");
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);

  const phoneForm = useForm<PhoneLoginFormValues>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: {
      userRole: "customer",
      phoneNumber: "",
    },
  });

  const { watch } = phoneForm;
  const formUserRole = watch("userRole");

  const { mutate: mutateGenerateOTP, isPending: isGeneratingOTP } = useMutation({
    mutationFn: (mobile: string) => postGenerateOTP({ mobile: mobile }),
    onSuccess: () => {
      toast.success("OTP sent successfully!");
      setCurrentStep("otp");
      setOtpTimer(30);
      setIsResendDisabled(true);
    },
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Error generating OTP");
    },
  });

  const { mutate: mutateVerifyOTP, isPending: isVerifyingOTP } = useMutation({
    mutationFn: (data: IVerifyOTPPayload) => postVerifyOTP(data),
    onSuccess: async (data) => {
      // toast.success("OTP sent successfully!");
      // localStorage.setItem('userRole', 'C')

      await dispatch(setAuthField({ key: "userRole", value: "C" }));
      await dispatch(setAuthField({ key: "phoneNumber", value: data?.mobile }));
      navigate(ROUTES?.C_OVERVIEW);
    },
    onError: (err: AxiosError<IAPIErrorResponse>) => {
      toast.error(err.response?.data?.message ?? "Error generating OTP");
    },
  });

  // const { mutate: mutateSSOLogin, isPending: isSSOLoginLoading } = useMutation({
  //   mutationFn: () => getSSOLogin(),
  //   onSuccess: () => {
  //     toast.success("OTP sent successfully!");
  //     localStorage.setItem("ROLE", "E");
  //     localStorage.setItem("PHONE", phoneForm?.getValues()?.phoneNumber);
  //     navigate(ROUTES?.E_PENDING);
  //   },
  //   onError: (err: AxiosError<IAPIErrorResponse>) => {
  //     toast.error(err.response?.data?.message ?? "Error generating OTP");
  //   },
  // });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleGenerateOTP = async () => {
    const number = phoneForm?.getValues()?.phoneNumber;
    if (!number) toast.error("Please Enter Phone Number");
    try {
      mutateGenerateOTP(number);
    } catch (err) {
      console.error("err", err);
    }
  };

  const handleVerifyOTP = async () => {
    const number = phoneForm?.getValues()?.phoneNumber;
    const otp = phoneForm?.getValues()?.otp;
    try {
      mutateVerifyOTP({ otp: otp, mob_number: number });
    } catch (err) {
      console.error("err", err);
    }
  };

  const handleSSOLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}${API_ENDPOINTS?.SSO_LOGIN}`;
  };

  const handleBackToPhone = () => {
    setCurrentStep("phone");
    setOtpTimer(0);
    setIsResendDisabled(false);
  };

  return (
    <Form {...phoneForm}>
      <form onSubmit={phoneForm.handleSubmit(handleVerifyOTP)} className="flex flex-col gap-7 p-6">
        <div className="flex flex-col items-center text-center mb-9">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-balance">Login to your Depositor account</p>
        </div>

        <FormField
          control={phoneForm.control}
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

        {formUserRole === "customer" ? (
          <>
            <FormField
              control={phoneForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" disabled={currentStep === "otp"} type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {currentStep === "phone" && (
              <Button type="button" onClick={handleGenerateOTP} disabled={isGeneratingOTP}>
                {isGeneratingOTP ? "Sending OTP..." : "Send OTP"}
              </Button>
            )}
            {currentStep === "otp" && (
              <div className="flex flex-col gap-5">
                <FormField
                  control={phoneForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter 6-digit OTP" type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6} autoComplete="one-time-code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3">
                  <Button type="submit" disabled={phoneForm?.formState?.isSubmitting}>
                    {phoneForm?.formState?.isSubmitting ? "Verifying..." : "Verify OTP"}
                  </Button>

                  <div className="flex justify-between items-center text-sm">
                    <Button type="button" variant="ghost" onClick={handleBackToPhone} className="p-0 h-auto text-muted-foreground hover:text-foreground">
                      ← Change phone number
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleGenerateOTP}
                      disabled={isResendDisabled}
                      className="p-0 h-auto text-muted-foreground hover:text-foreground disabled:opacity-50"
                    >
                      {isResendDisabled ? `Resend OTP (${otpTimer}s)` : "Resend OTP"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Button onClick={handleSSOLogin}>SSO Login</Button>
        )}
      </form>
    </Form>
  );
};

export default LoginFormSection;
