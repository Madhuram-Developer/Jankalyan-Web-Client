'use client'

import React, { useState } from 'react'
import { Typography, Link } from '@mui/material'
import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'
import Image from 'next/image'

const Page = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="flex flex-col items-center min-h-screen bg-background p-4">
             <Image src={'/png/appicon.png'} width={0} height={0} alt="Logo" className="h-auto w-[12%]" unoptimized/>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
                {isLogin ? <LoginForm /> : <SignupForm />}
                <div className="mt-4 text-center">
                    <Typography variant="body2">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <Link href="#" onClick={() => setIsLogin(!isLogin)} className='text-text-primary! font-semibold! decoration-text-primary!'>
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default Page