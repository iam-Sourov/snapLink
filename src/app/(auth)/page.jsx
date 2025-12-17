// app/auth/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { registerUser } from "@/actions/auth";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");


  const handleRegister = async (formData) => {
    setLoading(true);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const result = await registerUser({ name, email, password });
    if (result.success) {
      alert("Account created! Please log in.");
      setActiveTab("login");
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  // --- HANDLE LOGIN ---
  const handleLogin = async (formData) => {
    alert("Login logic needs NextAuth or a Session library to be secure!");
  };

  return (
    // MAIN CONTAINER: Flex center with padding for mobile safety
    <div className="flex min-h-screen w-full items-center justify-center px-4">

      {/* CONTENT WRAPPER: Limits width on desktop, full width on mobile */}
      <div className="w-full max-w-100 space-y-6">

        {/* HEADER SECTION: Centered and spaced */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">
            SnapLink
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your gallery & links in one place
          </p>
        </div>

        {/* TABS COMPONENT */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>

          {/* --- LOGIN TAB --- */}
          <TabsContent value="login">
            <Card className="border-none shadow-lg sm:border-border sm:shadow-sm">
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>
                  Enter your email to sign in to your account.
                </CardDescription>
              </CardHeader>
              <form action={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full mt-3" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="border-none shadow-lg sm:border-border sm:shadow-sm">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your information to get started.
                </CardDescription>
              </CardHeader>
              <form action={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-email">Email</Label>
                    <Input
                      id="r-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-password">Password</Label>
                    <Input
                      id="r-password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter >
                  <Button className="w-full mt-3" type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}