import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/app/page.module.css";
import LoginComponent from "@/components/LoginComponent";

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = async () => {
  return (
    <>
      <Head>
        <title>Parking slot reservation</title>
        <meta name="description" content="Reserve your parking slot." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${styles.main}`}>
        <h1>BATMAN</h1>
        <LoginComponent />
      </main>
    </>
  );
};

export default Home;
