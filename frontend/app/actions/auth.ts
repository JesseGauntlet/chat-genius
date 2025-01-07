'use server'

import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  // Existing login code...
}

export async function register(formData: FormData) {
  // Existing register code...
}

export async function googleSSO() {
  // Simulate SSO delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // This is where you would implement actual Google SSO
  // For now, we'll just simulate a successful login
  console.log('Google SSO initiated')
  redirect('/chat') // Redirect to the main chat page after successful login
}

