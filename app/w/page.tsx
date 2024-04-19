import Markdown from "react-markdown";
import { Editor } from "@components/Editor";
import { readFile } from "node:fs/promises";
import styles from "./page.module.css";

async function Blog() {
	const article = await readFile("articles/article.md", "utf-8");

	return (
		<main className={styles.page}>
			<header className={styles.articleHeader}>Why TypeScript?</header>
			<Markdown
				components={{
					p(props) {
						return (
							<p
								style={{
									padding: "1rem 0",
								}}
							>
								{props.children}
							</p>
						);
					},
					code(props) {
						const { children, className, ...rest } = props;
						const match = /language-(\w+)/.exec(className || "");
						let code = String(children).replace(/\n$/, "");
						return match ? (
							<Editor
								code={code}
								lang={match[1]}
								padding={10}
								style={{
									fontFamily: '"Fira code", "Fira Mono", monospace',
									fontSize: 12,
									color: "#fff",
									backgroundColor: "#445",
									padding: ".3rem",
									margin: "1rem",
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
		</main>
	);
}

export default Blog;
