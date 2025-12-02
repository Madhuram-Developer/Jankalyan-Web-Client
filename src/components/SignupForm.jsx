import React, { useState } from 'react'
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material'
import { useApiPost } from '@/hooks'

const SignupForm = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
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
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" fullWidth disabled={loading}>
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