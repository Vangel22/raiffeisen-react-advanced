import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div
        style={{
          backgroundColor: "orange",
          padding: "20px",
        }}
      >
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
    </div>
  );
}
