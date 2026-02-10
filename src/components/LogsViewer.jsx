'use client'

import React, { useState, useEffect } from 'react';
import { TablePagination } from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLogs } from '@/hooks';
import { formatDateTimeIST } from '@/utils/dateUtils';
import Loader from './Loader';

const LogRow = ({ log, type }) => {
  const [open, setOpen] = useState(false);

  const getStatusColorClass = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) return 'bg-success text-white';
    if (statusCode >= 400 && statusCode < 500) return 'bg-warning text-white';
    if (statusCode >= 500) return 'bg-error text-white';
    return 'bg-gray-500 text-white';
  };

  const getMethodColorClass = (method) => {
    const colors = {
      GET: 'bg-blue-600 text-white',
      POST: 'bg-green-600 text-white',
      PUT: 'bg-yellow-600 text-white',
      DELETE: 'bg-red-600 text-white',
      PATCH: 'bg-purple-600 text-white'
    };
    return colors[method] || 'bg-gray-600 text-white';
  };

  return (
    <>
      <div className="table-row border-b border-gray-200 hover:bg-gray-50">
        <div className="table-cell py-3 align-middle">
          <button onClick={() => setOpen(!open)} className="p-1 hover:bg-gray-200 rounded">
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        <div className="table-cell py-3 align-middle" style={{ minWidth: '150px' }}>
          {formatDateTimeIST(log.time)}
        </div>
        <div className="table-cell py-3 align-middle text-center">
          <span className={`px-2 py-1 rounded-sm text-xs font-semibold ${getMethodColorClass(log.method)}`}>
            {log.method}
          </span>
        </div>
        <div className="table-cell py-3 align-middle" style={{ maxWidth: '300px' }}>
          <div className="truncate">{log.fullUrl || log.url || log.pathurl || log.path}</div>
        </div>
        <div className="table-cell py-3 align-middle text-center">
          <span className={`px-2 py-1 rounded-sm text-xs font-semibold ${getStatusColorClass(log.statusCode)}`}>
            {log.statusCode}
          </span>
        </div>
        {type === 'api' && (
          <div className="table-cell py-3 align-middle text-center">
            {log.responseTime || 'N/A'}
          </div>
        )}
        {type === 'error' && (
          <div className="table-cell py-3 align-middle" style={{ maxWidth: '300px' }}>
            <div className="truncate">{log.message}</div>
          </div>
        )}
      </div>
      {open && (
        <div className="table-row">
          <div className="table-cell py-4 px-6" colSpan={6}>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-sm text-gray-700">IP Address:</p>
                  <p className="text-sm mb-2">{log.ip || 'N/A'}</p>
                  
                  <p className="font-semibold text-sm text-gray-700">User Agent:</p>
                  <p className="text-sm mb-2 break-all">{log.userAgent || 'N/A'}</p>
                  
                  <p className="font-semibold text-sm text-gray-700">Full URL:</p>
                  <p className="text-sm mb-2 break-all">{log.fullUrl || log.url || 'N/A'}</p>
                </div>
                
                <div>
                  {log.query && Object.keys(log.query).length > 0 && (
                    <>
                      <p className="font-semibold text-sm text-gray-700">Query Parameters:</p>
                      <pre className="bg-white p-2 rounded text-xs mb-2 overflow-auto border border-gray-200">
                        {JSON.stringify(log.query, null, 2)}
                      </pre>
                    </>
                  )}
                  
                  {log.body && Object.keys(log.body).length > 0 && (
                    <>
                      <p className="font-semibold text-sm text-gray-700">Request Body:</p>
                      <pre className="bg-white p-2 rounded text-xs mb-2 overflow-auto border border-gray-200">
                        {JSON.stringify(log.body, null, 2)}
                      </pre>
                    </>
                  )}
                  
                  {type === 'error' && log.stack && (
                    <>
                      <p className="font-semibold text-sm text-gray-700">Stack Trace:</p>
                      <pre className="bg-red-50 p-2 rounded text-xs overflow-auto max-h-60 border border-red-200">
                        {log.stack}
                      </pre>
                    </>
                  )}
                  
                  {type === 'error' && log.errors && log.errors.length > 0 && (
                    <>
                      <p className="font-semibold text-sm text-gray-700">Errors:</p>
                      <pre className="bg-red-50 p-2 rounded text-xs overflow-auto border border-red-200">
                        {JSON.stringify(log.errors, null, 2)}
                      </pre>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const LogsViewer = () => {
  const [activeTab, setActiveTab] = useState('api');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  
  const { 
    apiLogs, 
    errorLogs, 
    stats, 
    loading, 
    error, 
    fetchApiLogs, 
    fetchErrorLogs, 
    fetchStats 
  } = useLogs();

  useEffect(() => {
    if (activeTab === 'api') {
      fetchApiLogs(page + 1, rowsPerPage);
    } else if (activeTab === 'error') {
      fetchErrorLogs(page + 1, rowsPerPage);
    } else if (activeTab === 'stats') {
      fetchStats();
    }
  }, [activeTab, page, rowsPerPage, fetchApiLogs, fetchErrorLogs, fetchStats]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(0);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col px-4 py-2">
        <header className="flex justify-between mb-4">
          <h1 className="text-black font-bold text-2xl">System Logs</h1>
        </header>

        <div className="flex gap-2 mb-4 border-b border-gray-200">
          <button
            onClick={() => handleTabChange('api')}
            className={`px-4 py-2 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'api'
                ? 'border-text-primary text-text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            API Logs
          </button>
          <button
            onClick={() => handleTabChange('error')}
            className={`px-4 py-2 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'error'
                ? 'border-text-primary text-text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Error Logs
          </button>
          <button
            onClick={() => handleTabChange('stats')}
            className={`px-4 py-2 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'stats'
                ? 'border-text-primary text-text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Statistics
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <>
            {activeTab === 'api' && apiLogs && (
              <>
                <div className="table w-full border-collapse">
                  <div className="table-header-group">
                    <div className="table-row border-b border-gray-200">
                      <div className="table-cell text-[#00000078] text-xl py-3" style={{ width: '50px' }}></div>
                      <div className="table-cell text-[#00000078] text-xl py-3" style={{ minWidth: '150px' }}>Time</div>
                      <div className="table-cell text-center text-[#00000078] text-xl py-3">Method</div>
                      <div className="table-cell text-[#00000078] text-xl py-3">Path</div>
                      <div className="table-cell text-center text-[#00000078] text-xl py-3">Status</div>
                      <div className="table-cell text-center text-[#00000078] text-xl py-3">Response Time</div>
                    </div>
                  </div>
                  <div className="table-row-group">
                    {apiLogs.logs && apiLogs.logs.length > 0 ? (
                      apiLogs.logs.map((log, index) => (
                        <LogRow key={index} log={log} type="api" />
                      ))
                    ) : (
                      <div className="table-row">
                        <div className="table-cell py-8 text-center text-gray-500" colSpan={6}>
                          No API logs found
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <TablePagination
                  component="div"
                  count={apiLogs.totalLogs || 0}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[25, 50, 100, 200]}
                />
              </>
            )}

            {activeTab === 'error' && errorLogs && (
              <>
                <div className="table w-full border-collapse">
                  <div className="table-header-group">
                    <div className="table-row border-b border-gray-200">
                      <div className="table-cell text-[#00000078] text-xl py-3" style={{ width: '50px' }}></div>
                      <div className="table-cell text-[#00000078] text-xl py-3" style={{ minWidth: '150px' }}>Time</div>
                      <div className="table-cell text-center text-[#00000078] text-xl py-3">Method</div>
                      <div className="table-cell text-[#00000078] text-xl py-3">Path</div>
                      <div className="table-cell text-center text-[#00000078] text-xl py-3">Status</div>
                      <div className="table-cell text-[#00000078] text-xl py-3">Message</div>
                    </div>
                  </div>
                  <div className="table-row-group">
                    {errorLogs.logs && errorLogs.logs.length > 0 ? (
                      errorLogs.logs.map((log, index) => (
                        <LogRow key={index} log={log} type="error" />
                      ))
                    ) : (
                      <div className="table-row">
                        <div className="table-cell py-8 text-center text-gray-500" colSpan={6}>
                          No error logs found
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <TablePagination
                  component="div"
                  count={errorLogs.totalLogs || 0}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[25, 50, 100, 200]}
                />
              </>
            )}

            {activeTab === 'stats' && stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-black">API Logs Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Current Log Size:</span>
                      <span className="text-sm font-semibold text-black">{formatFileSize(stats.api?.currentLogSize)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Current Log Lines:</span>
                      <span className="text-sm font-semibold text-black">{stats.api?.currentLogLines?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Archived Logs Count:</span>
                      <span className="text-sm font-semibold text-black">{stats.api?.archivedLogsCount || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-black">Error Logs Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Current Log Size:</span>
                      <span className="text-sm font-semibold text-black">{formatFileSize(stats.error?.currentLogSize)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Current Log Lines:</span>
                      <span className="text-sm font-semibold text-black">{stats.error?.currentLogLines?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Archived Logs Count:</span>
                      <span className="text-sm font-semibold text-black">{stats.error?.archivedLogsCount || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm md:col-span-2">
                  <h3 className="text-xl font-bold mb-4 text-black">Total Archives</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Archived Logs:</span>
                    <span className="text-3xl font-bold text-text-primary">{stats.totalArchivedLogs || 0}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 border-t border-gray-100 pt-4">
                    Logs are automatically archived daily at 12:00 AM IST and retained for 15 days
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LogsViewer;
