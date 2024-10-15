"use client";

import { useRef } from "react"
import Editor ,{ OnMount } from '@monaco-editor/react';

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
			<div className="max-w-5xl p-4 bg-card w-full border border-border rounded-lg hover:border-primary mb-4">
				<div className="rounded-lg  overflow-hidden">
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
				<div>
					<button onClick={getIDEValue} className="btn">Get Value</button>
				</div>
			</div>
		</div>
	)
}
