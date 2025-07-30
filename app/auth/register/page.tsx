"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Sparkles,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Chrome,
  Check,
  Building,
  AlertCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { signUpAction } from "@/app/actions/auth"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string>("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setError("")
      setFieldErrors({})

      const result = await signUpAction(formData)

      if (result?.success && result.redirectTo) {
        window.location.href = result.redirectTo
        return
      }

      if (!result.success) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        }
        if (result.error) {
          setError(result.error)
        }
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 pb-20">
      <div className="w-full max-w-6xl flex gap-8">
        {/* Left Side - Header and What you get */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">PostPilot</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Create your account</h1>
            <p className="text-xl text-gray-600 mb-6">Start your social media journey today</p>
          </div>

          {/* What you get */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">What you get with PostPilot</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">AI-powered content generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Smart scheduling and automation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Detailed analytics and insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">Multi-platform support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Free Trial Badge and Register Card */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Free Trial Badge */}
          <div className="text-center mb-6">
            <Badge className="bg-green-100 text-green-700 px-4 py-2">
              <Check className="w-4 h-4 mr-1" />
              14-day free trial • No credit card required
            </Badge>
          </div>

          {/* Register Card */}
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-center text-xl">Sign up for PostPilot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full h-11 bg-transparent" type="button" disabled>
                  <Chrome className="w-5 h-5 mr-3" />
                  Continue with Google
                </Button>
                {/* <Button variant="outline" className="w-full h-11 bg-transparent" type="button" disabled>
                  <Twitter className="w-5 h-5 mr-3" />
                  Continue with X
                </Button> */}
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or create account with email</span>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Register Form */}
              <form action={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        className={`pl-10 h-11 ${fieldErrors.firstName ? "border-red-500" : ""}`}
                        required
                        disabled={isPending}
                      />
                    </div>
                    {fieldErrors.firstName && <p className="text-sm text-red-600">{fieldErrors.firstName[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      className={`h-11 ${fieldErrors.lastName ? "border-red-500" : ""}`}
                      required
                      disabled={isPending}
                    />
                    {fieldErrors.lastName && <p className="text-sm text-red-600">{fieldErrors.lastName[0]}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className={`pl-10 h-11 ${fieldErrors.email ? "border-red-500" : ""}`}
                      required
                      disabled={isPending}
                    />
                  </div>
                  {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email[0]}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company (optional)</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your company name"
                      className={`pl-10 h-11 ${fieldErrors.company ? "border-red-500" : ""}`}
                      disabled={isPending}
                    />
                  </div>
                  {fieldErrors.company && <p className="text-sm text-red-600">{fieldErrors.company[0]}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className={`pl-10 pr-10 h-11 ${fieldErrors.password ? "border-red-500" : ""}`}
                      required
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isPending}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {fieldErrors.password && <p className="text-sm text-red-600">{fieldErrors.password[0]}</p>}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Password must contain:</p>
                    <ul className="space-y-1 ml-4">
                      <li className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>At least 8 characters</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>One uppercase letter</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>One number and special character</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-10 h-11 ${fieldErrors.confirmPassword ? "border-red-500" : ""}`}
                      required
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isPending}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <p className="text-sm text-red-600">{fieldErrors.confirmPassword[0]}</p>
                  )}
                </div>

                {/* Terms and Privacy */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      name="terms"
                      className={`mt-1 ${fieldErrors.terms ? "border-red-500" : ""}`}
                      disabled={isPending}
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                      I agree to PostPilot&apos;s{" "}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {fieldErrors.terms && <p className="text-sm text-red-600">{fieldErrors.terms[0]}</p>}
                </div>

                {/* Marketing emails */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="marketing" name="marketing" className="mt-1" disabled={isPending} />
                  <Label htmlFor="marketing" className="text-sm text-gray-600 leading-relaxed">
                    Send me helpful tips, updates, and special offers (optional)
                  </Label>
                </div>

                {/* Create Account Button */}
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>

              {/* Sign in link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
                    Sign in
                  </Link>
                </p>
                <p className="text-sm text-gray-600 mt-5">
                  Questions? Contact our{" "}
                  <Link href="/support" className="text-blue-600 hover:text-blue-500">
                    support team
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
