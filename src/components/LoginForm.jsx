import React, { useState } from 'react'
import { TextField, Button, Typography, Link, Snackbar, Alert } from '@mui/material'
import { useApiPost } from '@/hooks'

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const { post, loading } = useApiPost('/api/v1/admin/login')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await post(formData)
            setSnackbar({ open: true, message: 'Login successful', severity: 'success' })
        } catch (err) {
            setSnackbar({ open: true, message: err.response?.data?.message || 'Login failed', severity: 'error' })
        }
    }

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Sign In
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="text-right">
                    <Link href="#" variant="body2">
                        Forgot Password?
                    </Link>
                </div>
                <Button type="submit" variant="contained" fullWidth disabled={loading}>
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