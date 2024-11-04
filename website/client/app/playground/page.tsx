"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { themeContext } from "../provider/themeProvider";
import Editor, { OnMount } from "@monaco-editor/react";
import { Box, Play, RefreshCw } from "lucide-react";
import axios from "axios";
import DataTable, { TableColumn } from "react-data-table-component";

interface CustomEditorProps {
  getValue: () => string;
}

export default function Page() {
  const { isDark } = useContext(themeContext);

  useEffect(() => {
    setVsTheme(isDark ? "vs-dark" : "vs-light");
  }, [isDark]);

  const [vsTheme, setVsTheme] = useState("vs-dark");
  const [result, setResult] = useState<any[]>([]);
  const [columns, setColumns] = useState<TableColumn<any>[]>([]);
  const editorRef = useRef<CustomEditorProps>();
  
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };
  
  function getIDEValue() {
    return editorRef.current ? editorRef.current.getValue() : "";
  }

  // Handle SQL query
  const handleQuery = async () => {
    try {
      const query = getIDEValue();
      if (process.env.NEXT_PUBLIC_GRADER_API_URL) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_GRADER_API_URL}/api/execute`,
          { query }
        );
        if (response.data.result && !response.data.result.message) {
          setResult(response.data.result);
          setColumns(
            Object.keys(response.data.result[0] || {}).map((key) => ({
              name: key.charAt(0).toUpperCase() + key.slice(1),
              selector: (row) => row[key],
            }))
          );
        }
      } else {
        console.log("No Grader Found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-24 px-4 flex-wrap">
      <div className="max-w-5xl p-4 w-full">
        <h1 className="text-3xl font-bold mb-4 flex gap-2 items-center">
          <Box size={"1.5em"} />
          SQL Query Playground
        </h1>
        <div className="bg-card w-full border border-border rounded-lg hover:border-primary mb-4 p-4">
          <div className="overflow-hidden rounded-lg h-[500px]">
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
        <div className="flex flex-row space-x-3">
          <button
            onClick={handleQuery}
            className="flex items-center gap-2 bg-primary py-2 px-4 rounded-md font-bold text-lg hover:scale-95 transition"
          >
            <Play /> Query
          </button>
          <button
            className="flex items-center gap-2 bg-primary py-2 px-4 rounded-md font-bold text-lg hover:scale-95 transition"
          >
            <RefreshCw /> Query
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
