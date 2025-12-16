'use client'

import React, { useState } from 'react'
import { CornerUpLeft } from 'lucide-react'
import { formatDateIST } from '@/utils/dateUtils'
import { TextField, Snackbar, Alert } from '@mui/material'
import Button from './Button'
import { useApiPost } from '@/hooks'

const QuestionView = ({ question, onBack }) => {
    const [answer, setAnswer] = useState('')
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const { post, loading, error } = useApiPost(`api/v1/doubts/${question.id}/answer`)

    const handleSubmit = async () => {
        if (!answer.trim()) return
        try {
            await post({ answer })
            setAnswer('')
            setSnackbar({ open: true, message: 'Answer submitted successfully', severity: 'success' })
        } catch (err) {
            setSnackbar({ open: true, message: 'Error submitting answer', severity: 'error' })
        }
    }

    return (
        <div className='flex flex-col h-full justify-between'>
            <div className='flex flex-col'>
                <div className='border-b border-b-[#0000001C] flex-1'>
                    <header className='flex px-10 items-center gap-2 py-3'>
                        <CornerUpLeft onClick={onBack} className="cursor-pointer" />
                        <h1 className='text-black text-xl '>Back</h1>
                    </header>
                </div>
                <div className='px-10 flex flex-col justify-between h-full'>
                    <div className='flex mt-4 gap-8'>
                        <h1 className='text-black font-bold text-xl underline '>Question</h1>
                        <p className='bg-[#742B0024] px-3 rounded-lg flex items-center'>{question.category}</p>
                        <span className={`px-2 py-1 rounded-lg text-sm font-medium ${question.answer?.trim() ? 'bg-success text-white' : ''
                            }`}>
                            {question.answer?.trim() ? 'Answered' : ''}
                        </span>
                    </div>
                    <h2 className='font-semibold py-3 text-xl'>{question.question}</h2>
                    <h1 className='font-bold underline text-xl'>Answer</h1>
                    {question.answer ? (
                        <h4 className='pt-2'>{question.answer}</h4>
                    ) : (
                        <div className='pt-2'>
                            <TextField
                                multiline
                                rows={4}
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter your answer"
                                fullWidth
                                className=''
                                sx={{
                                    '& .MuiOutlinedInput-root': { boxShadow: '0px 0px 4px 0px #742B0094' },
                                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 'none' }
                                }}
                            />
                            <div className='flex justify-end mt-2'>
                                <Button onClick={handleSubmit} disabled={loading} className={'bg-text-primary text-white px-2 py-1 text-sm'}>{loading ? 'Submitting...' : 'Submit'}</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='px-10 pt-6'>
                <h3 className='font-bold underline'>About User</h3>
                <h4><span className='font-bold'>Name:</span> {question.fullName}</h4>
                <h4><span className='font-bold'>Phone:</span> {question.phoneNumber}</h4>
                <h4><span className='font-bold'>DOB:</span> {formatDateIST(question.dob)}</h4>
            </div>
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
        </div>
    )
}

export default QuestionView