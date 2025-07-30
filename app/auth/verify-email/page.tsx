import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Mail, CheckCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">PostPilot</span>
          </Link>

          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Check your email</h1>
          <p className="text-gray-600">We&apos;ve sent a verification link to your email address</p>
        </div>

        {/* Verify Email Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-center text-xl">Verify your email address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-4">
              <p className="text-gray-600">We sent a verification email to:</p>
              <p className="font-medium text-gray-900">john@example.com</p>
              <p className="text-sm text-gray-500">
                Click the link in the email to verify your account and get started with PostPilot.
              </p>
            </div>

            {/* Resend Button */}
            <div className="space-y-4">
              <Button variant="outline" className="w-full h-11 bg-transparent" type="button">
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend verification email
              </Button>

              <p className="text-xs text-gray-500">
                Didn&apos;t receive the email? Check your spam folder or try resending.
              </p>
            </div>

            {/* Success state (hidden by default) */}
            <div className="hidden p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm font-medium text-green-800">Email verified successfully!</p>
              </div>
              <Button
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                asChild
              >
                <Link href="/dashboard">Continue to dashboard</Link>
              </Button>
            </div>

            {/* Change email */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Wrong email address?{" "}
                <Link href="/auth/register" className="text-blue-600 hover:text-blue-500 font-medium">
                  Update your email
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Help */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <Link href="/support" className="text-blue-600 hover:text-blue-500">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
