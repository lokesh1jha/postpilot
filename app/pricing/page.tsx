"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, X, Sparkles, Star, Users } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = {
    free: {
      name: "Free",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Perfect for getting started",
    },
    creator: {
      name: "Creator",
      monthlyPrice: 19,
      yearlyPrice: 15, // 20% discount
      description: "For solo creators and influencers",
    },
    pro: {
      name: "Pro",
      monthlyPrice: 49,
      yearlyPrice: 39, // 20% discount
      description: "For teams and agencies",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PostPilot</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your social media needs. Start free, upgrade when you&apos;re ready.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-gray-600 ${!isYearly ? "font-semibold" : ""}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-gray-600 ${isYearly ? "font-semibold" : ""}`}>Yearly</span>
            <Badge className="bg-green-100 text-green-700">Save 20%</Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-gray-600" />
                </div>
                <CardTitle className="text-2xl">{plans.free.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plans.free.yearlyPrice : plans.free.monthlyPrice}
                  </span>
                  <span className="text-gray-600">/{isYearly ? "year" : "month"}</span>
                </div>
                <p className="text-gray-600 mt-2">{plans.free.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/auth/login">Start Free</Link>
                </Button>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">1 connected account</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">10 posts per month</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Basic analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">AI post suggestions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-gray-300" />
                    <span className="text-sm text-gray-400">Advanced scheduling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-gray-300" />
                    <span className="text-sm text-gray-400">Team collaboration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-gray-300" />
                    <span className="text-sm text-gray-400">Priority support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Creator Plan */}
            <Card className="relative border-2 border-blue-500 shadow-lg">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                Recommended
              </Badge>
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">{plans.creator.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plans.creator.yearlyPrice : plans.creator.monthlyPrice}
                  </span>
                  <span className="text-gray-600">/{isYearly ? "year" : "month"}</span>
                  {isYearly && (
                    <div className="text-sm text-green-600 mt-1">
                      Save ${(plans.creator.monthlyPrice - plans.creator.yearlyPrice) * 12}/year
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{plans.creator.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  asChild
                >
                  <Link href="/auth/login">Upgrade Now</Link>
                </Button>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">3 connected accounts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">100 posts per month</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Full analytics dashboard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Advanced AI writer</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Smart scheduling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Content calendar</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Email support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative opacity-75">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white">
                Coming Soon
              </Badge>
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">{plans.pro.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plans.pro.yearlyPrice : plans.pro.monthlyPrice}
                  </span>
                  <span className="text-gray-600">/{isYearly ? "year" : "month"}</span>
                  {isYearly && (
                    <div className="text-sm text-green-600 mt-1">
                      Save ${(plans.pro.monthlyPrice - plans.pro.yearlyPrice) * 12}/year
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{plans.pro.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button className="w-full bg-transparent" variant="outline" disabled>
                  Coming Soon
                </Button>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">10+ connected accounts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Unlimited posts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Advanced analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Team collaboration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">White-labeled dashboards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Client management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s included</h2>
            <p className="text-lg text-gray-600">See what&apos;s included in each plan</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6">Features</th>
                  <th className="text-center py-4 px-6">Free</th>
                  <th className="text-center py-4 px-6">Creator</th>
                  <th className="text-center py-4 px-6">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-6 font-medium">Connected Accounts</td>
                  <td className="text-center py-4 px-6">1</td>
                  <td className="text-center py-4 px-6">3</td>
                  <td className="text-center py-4 px-6">10+</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Posts per {isYearly ? "Year" : "Month"}</td>
                  <td className="text-center py-4 px-6">{isYearly ? "120" : "10"}</td>
                  <td className="text-center py-4 px-6">{isYearly ? "1,200" : "100"}</td>
                  <td className="text-center py-4 px-6">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">AI Content Generation</td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Analytics Dashboard</td>
                  <td className="text-center py-4 px-6">Basic</td>
                  <td className="text-center py-4 px-6">Full</td>
                  <td className="text-center py-4 px-6">Advanced</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Team Collaboration</td>
                  <td className="text-center py-4 px-6">
                    <X className="w-5 h-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <X className="w-5 h-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Priority Support</td>
                  <td className="text-center py-4 px-6">
                    <X className="w-5 h-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">Email</td>
                  <td className="text-center py-4 px-6">Phone & Email</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan later?</h3>
                  <p className="text-gray-600">
                    Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we&apos;ll
                    prorate any charges.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens when I reach my limit?</h3>
                  <p className="text-gray-600">
                    We&apos;ll notify you when you&apos;re approaching your limit. You can either upgrade your plan or wait until
                    your next billing cycle.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-2">Is there a free trial for paid plans?</h3>
                <p className="text-gray-600">
                  Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-2">When will the Pro plan be available?</h3>
                <p className="text-gray-600">
                  The Pro plan is coming in Q2 2024. Join our waitlist to be notified when it launches and get early
                  access pricing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 opacity-90">Start with our free plan and upgrade when you&apos;re ready to scale</p>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            Get started for free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PostPilot</span>
              </div>
              <p className="text-gray-400">Your AI-powered social media assistant for effortless content creation.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PostPilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
