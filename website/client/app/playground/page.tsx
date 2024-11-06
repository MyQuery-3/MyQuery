"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { themeContext } from "../provider/themeProvider";
import Editor, { OnMount } from "@monaco-editor/react";
import { Box, Database, Play, RefreshCw, Table } from "lucide-react";
import axios from "axios";
import DataTable, { TableColumn } from "react-data-table-component";
import Swal, { SweetAlertOptions } from "sweetalert2";

interface CustomEditorProps {
  getValue: () => string;
}

export default function Page() {
  const { isDark } = useContext(themeContext);

  const [vsTheme, setVsTheme] = useState("vs-dark");
  const [result, setResult] = useState<any[]>([]);
  const [columns, setColumns] = useState<TableColumn<any>[]>([]);
  const [tables, setTables] = useState([])
  const [errM, setErrM] = useState('');
  const editorRef = useRef<CustomEditorProps>();

  useEffect(() => {
    setVsTheme(isDark ? "vs-dark" : "vs-light");
  }, [isDark]);

  useEffect(() => {
    handleGetTables();
  }, [])

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  function getIDEValue() {
    return editorRef.current ? editorRef.current?.getValue() : "";
  }

  const handleSelectDB = async (dbName: string) => {
    try {
      if (process.env.NEXT_PUBLIC_GRADER_API_URL) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_GRADER_API_URL}/api/execute_click`,
          { dbName: dbName }
        );
        const result = response.data.result || [];

        // ตรวจสอบผลลัพธ์และอัพเดตสถานะหากข้อมูลพร้อมแสดงผล
        if (response.data.result && !response.data.result.message) {
          const selectResults = Array.isArray(result) ? result : [];

          if (selectResults.length > 0) {
            setResult(selectResults);
            setColumns(
              Object.keys(selectResults[0] || {}).map((key) => ({
                name: key.charAt(0).toUpperCase() + key.slice(1),
                selector: (row) => row[key],
              }))
            );
          } else {
            console.log("No data available in the selected table.");
          }
        } else {
          console.log("Failed to retrieve data from database.");
        }
      }
    } catch (error) {
      console.error("Error selecting database:", error);
    }
  };

  const handleGetTables = async () => {
    try {
      if (process.env.NEXT_PUBLIC_GRADER_API_URL) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_GRADER_API_URL}/api/get`
        );
        const result = response.data.result || []
        if (response.data.result && !response.data.result.message) {
          const tableNames = result.map((data: { name: any; }) => data.name);
          setTables(tableNames);
        }
      }
    } catch (e) {
      console.error("Fail get tables : ", e)
    }
  }

  // Handle SQL query
  const handleQuery = async () => {
    const query = getIDEValue();

    // แยกคำสั่ง SQL แต่ละคำสั่งโดยใช้เครื่องหมาย ';'
    const queries = query.split(';').map(q => q.trim()).filter(q => q);

    // แสดงข้อความยืนยันก่อนเริ่ม query
    await Swal.fire({
      title: "Execute Query?",
      text: "Are you sure you want to run this SQL query?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, run it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (process.env.NEXT_PUBLIC_GRADER_API_URL) {
            const results = [];

            for (const q of queries) {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_GRADER_API_URL}/api/execute`,
                { query: q }
              );
              results.push(response.data.result);
            }

            const selectResults = results.find(result => Array.isArray(result));
            if (selectResults) {
              setResult(selectResults);
              setColumns(
                Object.keys(selectResults[0] || {}).map((key) => ({
                  name: key.charAt(0).toUpperCase() + key.slice(1),
                  selector: (row) => row[key],
                }))
              );
            }

            Swal.fire("Success", "Queries executed successfully!", "success");
            setErrM('')
          } else {
            Swal.fire("Error", 'No Grader Found! ', "error");
          }
        } catch (error) {
          var err = error as any
          Swal.fire("Error", "Failed to execute query\n" + (err.response?.data?.detail || err.message), "error");
          setErrM(err.response?.data?.detail || err.message)
        }
      }
    });
    await handleGetTables();
  };

  return (
    <div className="flex justify-center items-center mt-24 px-4 flex-wrap">
      <div className="grid max-w-6xl p-4 w-full">
        <h1 className="text-3xl font-bold mb-4 flex gap-2 items-center">
          <Box size={"1.5em"} />
          SQL Query Playground
        </h1>
        <div className="grid grid-flow-col space-x-3 w-full">
          <div className="bg-card w-full border border-border rounded-lg hover:border-primary mb-4 p-4">
            <div className="overflow-hidden rounded-lg h-[500px] ">
              <Editor
                className="h-[500px]"
                defaultLanguage="sql"
                defaultValue="SELECT * FROM users"
                theme={vsTheme}
                options={{ fontSize: 18 }}
                onMount={handleEditorDidMount}
              />
            </div>
          </div>
          <div className="max-[1150px]:hidden w-full">
            <p className="flex font-bold text-xl"><Table />  Gobal Query</p>
            <div className="grid h-[600px] w-[300px] border border-border hover:border-primary rounded-md p-3 space-x-1 space-y-1 overflow-scroll overflow-x-hidden">
              {tables.map((table, index) => (
                <button key={index} onClick={() => handleSelectDB(table)} className="flex flex-col border border-border justify-center items-center rounded-sm min-h-[70px] w-full hover:text-secondary hover:bg-primary">
                  <Database />
                  <p className="truncate w-[200px] overflow-hidden whitespace-nowrap text-ellipsis text-center">{table}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="my-2 w-full bg-border">
          {errM}
          </div>
        <div className="flex flex-row space-x-3">
          <button
            onClick={handleQuery}
            className="flex items-center gap-2 bg-primary py-2 px-4 rounded-md font-bold text-lg hover:scale-95 transition"
          >
            <Play /> Query
          </button>
          <button
            onClick={handleGetTables}
            className="flex items-center gap-2 bg-primary py-2 px-4 rounded-md font-bold text-lg hover:scale-95 transition"
          >
            <RefreshCw /> Refresh
          </button>
        </div>
        <div className="mt-4 rounded-md border border-border hover:border-primary">
          <DataTable
            columns={columns}
            data={result}
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}
