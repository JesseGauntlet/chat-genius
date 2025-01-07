'use client'

import { useState } from "react"
import { useActionState } from "react"
import Link from "next/link"
import { register, googleSSO } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ChromeIcon as Google } from 'lucide-react'

export function RegisterForm() {
  const [state, action, isPending] = useActionState(register)

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-500">Enter your information to get started</p>
      </div>
      <form action={action} className="space-y-4">
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
          />
        </div>
        <Button className="w-full bg-[#3F0E40] hover:bg-[#522653]" disabled={isPending}>
          {isPending ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <form action={googleSSO}>
        <div className="grid gap-2">
          <Button type="submit" variant="outline" className="w-full">
            <Google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="underline hover:text-[#3F0E40]">
          Sign in
        </Link>
      </p>
    </div>
  )
}

