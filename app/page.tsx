import styles from "./page.module.css";
import SignIn from "./components/sign-in";
import { auth } from "@/auth"

export default async function Home() {
  const session = await auth()
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>Welcome {session?.user?.name}!</p>
        <SignIn />
      </main>
      <footer className={styles.footer}>
        <p>ふったー</p>
      </footer>
    </div>
  );
}
