import Image from 'next/image'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material'
import QuestionView from './QuestionView'
import { useApiGet } from '@/hooks'
import { API_ENDPOINTS } from '@/constants/api'
import { formatDateTimeIST } from '@/utils/dateUtils'
import { ChevronDown } from 'lucide-react'


const Dashboard = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showQuestionView, setShowQuestionView] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    
    // Filter states
    const [dateFilter, setDateFilter] = useState('today');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Date filter options
    const dateOptions = [
        { value: 'today', label: 'Today' },
        { value: 'last3days', label: 'Last 3 Days' },
        { value: 'last7days', label: 'Last 7 Days' },
        { value: 'last14days', label: 'Last 14 Days' },
        { value: 'lastMonth', label: 'Last Month' },
        { value: 'all', label: 'All' }
    ];

    // Status filter options
    const statusOptions = [
        { value: 'all', label: 'All' },
        { value: 'answered', label: 'Answered' },
        { value: 'pending', label: 'Pending' }
    ];

    // Category filter options (dummy data)
    const categoryOptions = [
        { value: 'all', label: 'All' },
        { value: 'tech', label: 'Technology' },
        { value: 'design', label: 'Design' },
        { value: 'business', label: 'Business' },
        { value: 'other', label: 'Other' }
    ];

    // Build query parameters for API
    const buildQueryParams = () => {
        const params = new URLSearchParams();
        
        if (dateFilter !== 'all') {
            const now = new Date();
            let startDate;
            
            switch (dateFilter) {
                case 'today':
                    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case 'last3days':
                    startDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
                    break;
                case 'last7days':
                    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'last14days':
                    startDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
                    break;
                case 'lastMonth':
                    startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                    break;
                default:
                    startDate = null;
            }
            
            if (startDate) {
                params.append('date', startDate.toISOString());
            }
        }
        
        if (statusFilter !== 'all') {
            params.append('status', statusFilter);
        }
        
        if (categoryFilter !== 'all') {
            params.append('category', categoryFilter);
        }

        console.log('Query Params:', params.toString());
        
        return params.toString();
    };

    const { data: response, loading, error } = useApiGet(`${API_ENDPOINTS.DOUBTS}?${buildQueryParams()}`);

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
                            <h1 className='text-black font-bold text-2xl '>Doubts</h1>
                            <input placeholder='Search doubt' className='border border-amber-400 px-2 py-2 rounded-xl' />
                        </header>
                        
                        <div className='flex gap-4 my-1'>
                            <div className='flex flex-col'>
                                <label className='text-sm font-medium text-gray-700 mb-1'>Date</label>
                                <select 
                                    value={dateFilter} 
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className=' bg-[#742B0024] text-black font-semibold px-3 py-2 rounded-md text-sm'

                                >
                                    {dateOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className='flex flex-col'>
                                <label className='text-sm font-medium text-gray-700 mb-1'>Status</label>
                                <select 
                                    value={statusFilter} 
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className='bg-[#742B0024] text-black font-semibold px-3 py-2 rounded-md text-sm'
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className='flex flex-col'>
                                <label className='text-sm font-medium text-gray-700 mb-1'>Category</label>
                                <select 
                                    value={categoryFilter} 
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className='bg-[#742B0024] text-black font-semibold px-3 py-2 rounded-md text-sm'
                                >
                                    {categoryOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="">
                            {loading ? (
                                <div className="text-center py-4">Loading doubts...</div>
                            ) : error ? (
                                <div className="text-center py-4 text-red-500">Error loading doubts: {error.message}</div>
                            ) : (
                                <div className="table w-full border-collapse">
                                    <div className="table-header-group">
                                        <div className="table-row border-b border-gray-200">
                                            <div className="table-cell text-[#00000078] text-xl py-3" style={{ width: '170px', minWidth: '170px' }}>Date</div>
                                            <div className="table-cell text-[#00000078] text-xl py-3">Question</div>
                                            <div className="table-cell text-center text-[#00000078] text-xl py-3">Category</div>
                                            <div className="table-cell text-center text-[#00000078] text-xl py-3">Status</div>
                                            <div className="table-cell text-center text-[#00000078] text-xl py-3">Action</div>
                                        </div>
                                    </div>
                                    <div className="table-row-group">
                                        {(Array.isArray(response?.data) ? response.data : []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                            <div key={index} className="table-row border-b border-gray-200 hover:bg-gray-50">
                                                <div className="table-cell py-3" style={{ width: '150px', minWidth: '150px' }}>{formatDateTimeIST(row.createdAt)}</div>
                                                <div className="table-cell py-3">{row.question}</div>
                                                <div className="table-cell text-center py-3 ">
                                                    <span className='bg-[#742B0024] text-black px-2 py-1 rounded-sm text-sm font-medium'>{row.category}</span>
                                                </div>
                                                <div className="table-cell text-center py-3">
                                                    <span className={`px-2 py-1 rounded-sm text-xs font-medium ${row.answer?.trim() ? 'bg-success text-white' : 'bg-warning text-white'
                                                        }`}>
                                                        {row.answer?.trim() ? 'Answered' : 'Pending'}
                                                    </span>
                                                </div>
                                                <div className="table-cell text-center py-3">
                                                    <button
                                                        onClick={() => handleRowClick(row)}
                                                        className="bg-text-primary hover:bg-[#973b06] text-white font-semibold text-xs py-1 px-3 rounded-sm cursor-pointer"
                                                    >
                                                        Open
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <TablePagination
                            component="div"
                            count={response?.total || 0}
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