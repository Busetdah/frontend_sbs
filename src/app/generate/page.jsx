'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1); 
  const pageSize = 10;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/predict?page=${page}&limit=${pageSize}`)
      .then((response) => {
        setData(response.data.results || []);
        setLastPage(response.data.pagination.last_page);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, [page]);

  const columns = [
    { accessorKey: "gate_valve_time", header: "Gate Valve Time" },
    { accessorKey: "pressure", header: "Pressure" },
    { accessorKey: "berat_pupuk_prediksi", header: "Predicted Fertilizer Weight" },
    { accessorKey: "status", header: "Status" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table border="1">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
            </button>
            <span> Page {page} of {lastPage} </span>
            <button onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))} disabled={page >= lastPage}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TableComponent;
