import Link from "next/link";
import s from "./page.module.css";
// import { cx } from "@/lib/util";
// import css from "./util.module.css";

export default function Home() {
	return (
		<main className={s.main}>
			<header className={s.header}>
				<Link href="/" className={s.brand}>
					David MacDonald
				</Link>
				<ul className={s.nav}>
					<li className={s.navLink}>
						<Link href="/projects" className={s.navLink}>
							Projects
						</Link>
					</li>
					<li className={s.navLink}>
						<Link href="/contact" className={s.navLink}>
							Contact
						</Link>
					</li>
				</ul>
			</header>
			<section className={s.summary}>
				<span>Summary</span>
			</section>
			<section className={s.projects}>
				<span>Projects</span>
			</section>
			<footer className={s.mainFooter}>
				<span>Footer</span>
			</footer>
		</main>
	);
}
