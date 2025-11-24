import Image from 'next/image'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material'
import QuestionView from './QuestionView'

const Dashboard = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showQuestionView, setShowQuestionView] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const dummyData = [
        { id: 1, date: '2023-01-01', question: 'What is React?', category: 'Tech', status: 'Active', action: 'Edit' },
        { id: 2, date: '2023-01-02', question: 'How to use hooks?', category: 'Tech', status: 'Pending', action: 'View' },
        { id: 3, date: '2023-01-03', question: 'CSS basics', category: 'Design', status: 'Completed', action: 'Delete' },
        { id: 4, date: '2023-01-04', question: 'JavaScript fundamentals', category: 'Tech', status: 'Active', action: 'Edit' },
        { id: 5, date: '2023-01-05', question: 'UI/UX principles', category: 'Design', status: 'Pending', action: 'View' },
        { id: 6, date: '2023-01-06', question: 'Node.js basics', category: 'Tech', status: 'Completed', action: 'Delete' },
        { id: 7, date: '2023-01-07', question: 'Database design', category: 'Tech', status: 'Active', action: 'Edit' },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (row) => {
        setSelectedQuestion(row);
        setShowQuestionView(true);
    };

    return (
        <div className='flex flex-col'>
            <Image src={'/png/frame.png'} width={0} height={0} alt="Logo" className="h-auto w-full border-b border-b-[#0000001C]" unoptimized />
            <div className='flex flex-col px-4 py-2'>
                {showQuestionView ? (
                    <QuestionView question={selectedQuestion} onBack={() => setShowQuestionView(false)} />
                ) : (
                    <div>
                        <header className='flex justify-between'>
                            <h1 className='text-black font-bold text-2xl '>Questions</h1>
                            <input placeholder='Search question' className='border border-amber-400 px-2 py-2 rounded-xl' />
                        </header>
                        <div className='flex'>
                            <div>Date</div>
                            <div>Category</div>
                            <div>Status</div>
                        </div>
                        <div className="">
                            <div className="table w-full border-collapse">
                                <div className="table-header-group">
                                    <div className="table-row border-b border-gray-200">
                                        <div className="table-cell text-[#00000078] text-xl py-3">Date</div>
                                        <div className="table-cell text-[#00000078] text-xl py-3">Question</div>
                                        <div className="table-cell text-center text-[#00000078] text-xl py-3">Category</div>
                                        <div className="table-cell text-center text-[#00000078] text-xl py-3">Status</div>
                                        <div className="table-cell text-center text-[#00000078] text-xl py-3">Action</div>
                                    </div>
                                </div>
                                <div className="table-row-group">
                                    {dummyData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                        <div key={index} className="table-row border-b border-gray-200 cursor-pointer hover:bg-gray-50" onClick={() => handleRowClick(row)}>
                                            <div className="table-cell py-3">{row.date}</div>
                                            <div className="table-cell py-3">{row.question}</div>
                                            <div className="table-cell text-center py-3">{row.category}</div>
                                            <div className="table-cell text-center py-3">{row.status}</div>
                                            <div className="table-cell text-center py-3">{row.action}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <TablePagination
                            component="div"
                            count={dummyData.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard