"use client";
import DataTable, { TableColumn } from "react-data-table-component";

interface DataRow {
  id: number;
  username: string;
  email: string;
}

export default function Table({ data }: { data: DataRow[] }) {
  const columns: TableColumn<DataRow>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "UserName",
      selector: (row) => row.username,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
  ];
  return <DataTable columns={columns} data={data} />;
}
