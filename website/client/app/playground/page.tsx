"use client";
import axios from "axios";
import React from "react";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function page() {
  const editorRef = useRef(null);
  const handleEdotorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };
  const handleExecute = async () => {
    try {
      const code = editorRef.current.getValue();
      await axios.post(`${process.env.NEXT_PUBLIC_GRADER_API_URL}/execute`, {
        query: code,
      });
    } catch (error) {
      console.error("Error executing query:", error);
    }
  };
  return (
    <main className="max-w-screen w-full min-h-screen bg-black px-10 py-2">
      <div className="container mx-auto flex gap-6">
        <div className="w-3/4 space-y-6">
          <div className="bg-white p-6 rounded-xl">
            <Editor
              height="40vh"
              defaultLanguage="sql"
              defaultValue="SELECT * FROM table"
              options={{ fontSize: 18 }}
              onMount={handleEdotorDidMount}
            />
            <div className="flex justify-end gap-x-6">
              <Button onClick={handleExecute}>Execute</Button>
              <Button variant="outline" onClick={handleExecute}>
                Reset
              </Button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl h-[40vh]">
            หน้าสำหรับแสดงผลลัพธ์ของการ Query
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl w-1/4">
          หน้าสำหรับการแสดงDbต่างๆที่เลือกได้
        </div>
      </div>
    </main>
  );
}
