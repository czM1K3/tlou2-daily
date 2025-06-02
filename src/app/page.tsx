import styles from "./page.module.css";
import { Tlou } from "./_components/tlou";

export const revalidate = 0;
export const runtime = "edge";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Tlou />
      </main>
    </div>
  );
}
