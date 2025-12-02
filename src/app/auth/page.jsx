'use client'

import React, { useState } from 'react'
import { Typography, Link } from '@mui/material'
import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'

const Page = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {isLogin ? <LoginForm /> : <SignupForm />}
                <div className="mt-4 text-center">
                    <Typography variant="body2">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <Link href="#" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default Page