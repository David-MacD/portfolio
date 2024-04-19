import Markdown from "react-markdown";
import { Editor } from "@components/Editor";
import { readFile } from "node:fs/promises";

async function Blog() {
	const article = await readFile("articles/article.md", "utf-8");
	// const article = await response.text();

	return (
		<main>
			<Markdown
				components={{
					code(props) {
						const { children, className, ...rest } = props;
						const match = /language-(\w+)/.exec(className || "");
						let code = String(children).replace(/\n$/, "");
						return match && match[1] === "typescript" ? (
							<Editor
								code={code}
								lang={match[1]}
								padding={10}
								style={{
									fontFamily: '"Fira code", "Fira Mono", monospace',
									fontSize: 12,
								}}
							/>
						) : (
							<code {...rest} className={className}>
								{children}
							</code>
						);
					},
				}}
			>
				{article}
			</Markdown>
			{/* <Editor
				value={code}
				onValueChange={(code) => setCode(code)}
				highlight={(code) =>
					highlight(code, languages.typescript, "typescript")
				}
				padding={10}
				style={{
					fontFamily: '"Fira code", "Fira Mono", monospace',
					fontSize: 12,
				}}
			/> */}
		</main>
	);
}

export default Blog;
