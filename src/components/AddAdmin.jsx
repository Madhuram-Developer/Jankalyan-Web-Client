import React, { useState } from 'react'
import Image from 'next/image'
import Button from './Button'
import { Plus, Trash2 } from 'lucide-react'
import { TablePagination } from '@mui/material'

const AddAdmin = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dummyData = [
        { name: 'John Doe', email: 'john@example.com', role: 'Admin', action: 'Edit' },
        { name: 'Jane Smith', email: 'jane@example.com', role: 'Moderator', action: 'View' },
        { name: 'Bob Johnson', email: 'bob@example.com', role: 'User', action: 'Delete' },
        { name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', action: 'Edit' },
        { name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Moderator', action: 'View' },
        { name: 'Diana Davis', email: 'diana@example.com', role: 'User', action: 'Delete' },
        { name: 'Eve Miller', email: 'eve@example.com', role: 'Admin', action: 'Edit' },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className='flex flex-col'>
            <Image src={'/png/frame.png'} width={0} height={0} alt="Logo" className="h-auto w-full border-b border-b-[#0000001C]" unoptimized />
            <div className='flex flex-col px-4 '>
                <header className='flex justify-between py-2 pt-2'>
                    <h1 className='text-black font-bold text-2xl '>Admins</h1>
                    <Button className={'flex items-center gap-2 bg-text-primary p-2 rounded-xl text-white cursor-pointer'}><Plus />Add new Admin</Button>
                </header>
                <div>
                    <div className="table w-full border-collapse">
                        <div className="table-header-group">
                            <div className="table-row border-b border-gray-200">
                                <div className="table-cell text-[#00000078] text-xl py-3">Name</div>
                                <div className="table-cell text-[#00000078] text-xl py-3">Email Id</div>
                                <div className="table-cell text-center text-[#00000078] text-xl py-3">Role</div>
                                <div className="table-cell text-center text-[#00000078] text-xl py-3">Remove</div>
                            </div>
                        </div>
                        <div className="table-row-group">
                            {dummyData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <div key={index} className="table-row border-b border-gray-200">
                                    <div className="table-cell py-3">{row.name}</div>
                                    <div className="table-cell py-3">{row.email}</div>
                                    <div className="table-cell text-center py-3">{row.role}</div>
                                    <div className="table-cell text-center py-3"><div className="flex justify-center items-center"><Trash2 className="text-red-500" /></div></div>
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
        </div>
    )
}

export default AddAdmin