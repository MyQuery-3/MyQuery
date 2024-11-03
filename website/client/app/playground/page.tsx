"use client";

import { useState, useRef, useEffect, useContext, use } from "react";
import { themeContext } from "../provider/themeProvider";
import Editor, { OnMount } from "@monaco-editor/react";
import { Box, Play, RefreshCw } from "lucide-react";
import axios from "axios";
import DataTable, { TableColumn } from "react-data-table-component";

interface CustomEditorProps {
  getValue: () => string;
}

interface DataRow {
  id: number;
  name: string;
  email: string;
}

export default function page() {
  const { isDark } = useContext(themeContext);

  useEffect(() => {
    if (isDark) {
      setVsTheme("vs-dark");
    } else {
      setVsTheme("vs-light");
    }
  }, [isDark]);

  const [vsTheme, setVsTheme] = useState("vs-dark");
  const [result, setResult] = useState<any>([]);
  const editorRef = useRef<CustomEditorProps>();
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };
  function getIDEValue() {
    if (editorRef.current) {
      return editorRef.current.getValue();
    }
  }
  // Handle sql query
  const handleQuery = async () => {
    try {
      const query = getIDEValue();
      if (process.env.NEXT_PUBLIC_GRADER_API_URL != undefined) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_GRADER_API_URL}/api/execute`,
          {
            query,
          }
        );
        setResult(response.data.result);
        console.log(result);
      } else {
        console.log("No Grader Found!")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
  ];

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
              options={{
                fontSize: 18,
              }}
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
        <div className="mt-4">
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
