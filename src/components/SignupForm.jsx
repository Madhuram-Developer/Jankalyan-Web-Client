import React, { useState } from 'react'
import { TextField, Button, Typography, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material'
import { Eye, EyeOff } from 'lucide-react'
import { useApiPost } from '@/hooks'

const SignupForm = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [showPassword, setShowPassword] = useState(false)
    const { post, loading } = useApiPost('/api/v1/admin/register')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            setSnackbar({ open: true, message: 'Passwords do not match', severity: 'error' })
            return
        }
        try {
            await post(formData)
            setSnackbar({ open: true, message: 'Signup successful', severity: 'success' })
        } catch (err) {
            setSnackbar({ open: true, message: err.response?.data?.message || 'Signup failed', severity: 'error' })
        }
    }

    return (
        <>
            <div className='text-2xl font-semibold mb-6 text-center'>
                Sign Up
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col gap-4">
                <TextField
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    fullWidth
                    required
                    className='bg-[#742B0024]'
                    slotProps={{
                        inputLabel: { style: { color: 'black' } },
                        input: { style: { color: 'black' } },
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": { borderColor: "black" },
                            "&.Mui-focused fieldset": { borderColor: "black" },
                        },
                    }}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    className='bg-[#742B0024]'
                    slotProps={{
                        inputLabel: { style: { color: 'black' } },
                        input: { style: { color: 'black' } },
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
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
                    className='bg-[#742B0024]'
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
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                    className='bg-[#742B0024]'
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
                <Button type="submit" variant="contained" className='bg-text-primary! mt-4!' fullWidth disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
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

export default SignupForm