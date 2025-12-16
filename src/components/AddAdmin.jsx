import React, { useState } from 'react'
import Image from 'next/image'
import Button from './Button'
import AddAdminModal from './AddAdminModal'
import { Plus, Trash2 } from 'lucide-react'
import { TablePagination } from '@mui/material'
import { useApiGet } from '@/hooks'
import Loader from './Loader'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AddAdmin = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { data: admins, loading: adminsLoading, error: adminsError, refetch: refetchAdmins } = useApiGet('/api/v1/admin/users');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddAdmin = async () => {
        try {
            refetchAdmins();
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error adding admin:', error);
        }
    };

    if (adminsLoading) {
        return <Loader/>;
    }

    if (adminsError) {
        return <div>Error loading admins data.</div>;
    }

    return (
        <div className='flex flex-col'>
            
            <div className='flex flex-col px-4 '>
                <header className='flex justify-between py-2 pt-2'>
                    <h1 className='text-black font-bold text-2xl '>Admins</h1>
                    <Button onClick={() => setModalOpen(true)} className={'flex items-center gap-2 bg-text-primary p-2 rounded-xl text-white cursor-pointer'}><Plus />Add new Admin</Button>
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
                            {(admins?.adminUsers || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <div key={index} className="table-row border-b border-gray-200">
                                    <div className="table-cell py-3">{row.fullName}</div>
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
                    count={admins?.total || 0}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            <AddAdminModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={handleAddAdmin}/>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Admin added successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddAdmin