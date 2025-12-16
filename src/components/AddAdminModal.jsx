import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Modal from './Modal'
import Button from './Button'
import { useApiPost } from '@/hooks'

const AddAdminModal = ({ open, onClose, onSuccess }) => {
    const [email, setEmail] = useState('')
    const { post, loading } = useApiPost('/api/v1/admin/add')

    const handleSubmit = async () => {
        if (!email.trim()) return
        try {
            await post({ email })
            onSuccess()
            onClose()
            setEmail('')
        } catch (err) {
            console.error('Error adding admin:', err)
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Add New Admin"
            actions={
                <>
                    <Button onClick={onClose} className="text-gray-500 px-4 py-2">Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading} className="bg-text-primary text-white px-4 py-2">{loading ? 'Adding...' : 'Invite'}</Button>
                </>
            }
        >
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ marginY: 2, '& .MuiInputBase-root': { height: '50px' } }}
            />
        </Modal>
    )
}

export default AddAdminModal