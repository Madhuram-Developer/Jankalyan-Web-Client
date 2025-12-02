import React from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'
import { useApiPost } from '@/hooks'

const Logout = () => {
    const { post, loading } = useApiPost('/api/v1/admin/logout')
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await post()
            router.push('/auth')
        } catch (err) {
            console.error('Logout failed:', err)
        }
    }

    return (
        <Button onClick={handleLogout} disabled={loading} className={'bg-text-primary text-white font-bold text-sm px-3 py-1'}>
            {loading ? 'Logging Out...' : 'Log Out'}
        </Button>
    )
}

export default Logout