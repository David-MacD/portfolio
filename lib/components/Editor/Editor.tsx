"use client";
import SimpleEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism.css";
import styles from "./editor.module.css";

type EditorProps = {
	code: string;
	lang: string;
	padding: number;
	style: {
		readonly [key: string]: string | number;
	};
};

function Editor({ code, lang, padding, style }: EditorProps) {
	return (
		<SimpleEditor
			value={code}
			onValueChange={() => null}
			textareaClassName={styles.code}
			highlight={(code) => highlight(code, languages[lang], lang)}
			padding={padding}
			style={style}
		/>
	);
}

export default Editor;
