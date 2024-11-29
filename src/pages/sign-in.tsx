import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axios";
import { accessCookie, setTokenCookie } from "@/lib/handle-cookie";
import { EyeIcon, EyeOffIcon, LogIn } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const SignIn: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = Boolean(accessCookie());

  // Focus on phone input when the page reloads
  useEffect(() => {
    if (isAuthenticated) navigate("/");
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, []);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/login", {
        phone: phoneInputRef.current?.value,
        password: passwordInputRef.current?.value,
      });
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setTokenCookie(res.data.token, res.data.expires_in);
        navigate("/");
        toast("Sign in successful");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <LogIn className="size-5 text-green-400" />
            <p>Sign In</p>
          </CardTitle>
          <CardDescription>
            Provide your phone no & password to sign in
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleOnSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone No</Label>
                <Input
                  id="phone"
                  placeholder="e.g. 01XXXXXXXXX"
                  ref={phoneInputRef}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    ref={passwordInputRef}
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2  text-gray-500"
                  >
                    {showPassword ? (
                      <EyeIcon
                        onClick={() => setShowPassword(false)}
                        className="size-4"
                      />
                    ) : (
                      <EyeOffIcon
                        onClick={() => setShowPassword(true)}
                        className="size-4"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full" type="submit">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
