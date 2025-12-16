'use client';

import React, { useState } from 'react'
import { TextField, Button, Typography, Link, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material'
import { Eye, EyeOff } from 'lucide-react';
import { useApiPost } from '@/hooks'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [showPassword, setShowPassword] = useState(false);
    const { post, loading } = useApiPost('/api/v1/admin/login')
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await post(formData)
            router.push('/dashboard')
            setSnackbar({ open: true, message: 'Login successful', severity: 'success' })
        } catch (err) {
            setSnackbar({ open: true, message: err.response?.data?.message || 'Login failed', severity: 'error' })
        }
    }

    return (
        <>
            <div className='text-2xl font-semibold mb-6 text-center'>
                Sign In
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    className='bg-[#742B0024] mb-4!'
                    slotProps={{
                        inputLabel: { style: { color: 'black' } },
                        input: { style: { color: 'black' } },
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            //   "& fieldset": { borderColor: "black" },
                            "&:hover fieldset": { borderColor: "black" },
                            "&.Mui-focused fieldset": { borderColor: "black" },
                        },
                    }}
                />
                <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    className='bg-[#742B0024] mb-4!'
                    slotProps={{
                        inputLabel: { style: { color: 'black' } },
                        input: {
                            style: { color: 'black' }, endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        },
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": { borderColor: "black" },
                            "&.Mui-focused fieldset": { borderColor: "black" },
                        },
                    }}
                />
                <div className="text-right">
                    <Link href="#" variant="body2" className='text-text-primary! font-semibold!'>
                        Forgot Password?
                    </Link>
                </div>
                <Button type="submit" variant="contained" className='bg-text-primary!' fullWidth disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </Button>
            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default LoginForm