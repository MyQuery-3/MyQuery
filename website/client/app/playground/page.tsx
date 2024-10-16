"use client";

import { useRef } from "react"
import Editor ,{ OnMount } from '@monaco-editor/react';
import { Box , Play } from "lucide-react"

interface CustomEditorProps {
	getValue: () => string;
}

export default function page() {

	const editorRef = useRef<CustomEditorProps>();

	const handleEditorDidMount :OnMount = (editor) => {
		editorRef.current = editor;
	}

	function getIDEValue() {
		if (editorRef.current) {
			return editorRef.current.getValue();
		}
	}

	return (
		<div className="flex justify-center items-center mt-24 px-4 flex-wrap">
			<div className="max-w-5xl p-4 w-full">
				<h1 className="text-3xl font-bold mb-4 flex gap-2 items-center"><Box size={"1.5em"} />SQL Query Playground</h1>
				<div className="bg-card w-full border border-border rounded-lg hover:border-primary mb-4 p-4">
					<div className="overflow-hidden rounded-lg h-[500px]">
						<Editor
							className="h-[500px]"
							defaultLanguage="sql"
							defaultValue="// some comment"
							theme="vs-dark"
							options={{
								fontSize: 16,
							}}
							onMount={handleEditorDidMount}
						/>
					</div>
				</div>
				<div>
					<button onClick={getIDEValue} className="flex items-center gap-2 bg-primary py-2 px-4 rounded-md font-bold text-lg hover:scale-95 transition"><Play /> Query</button>
				</div>
			</div>
		</div>
	)
}
