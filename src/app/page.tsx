import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import styles from "./index.module.css";
import Image from "next/image";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className={styles.main}>
      <div className={styles.navBar}>
        <div className={styles.icons}>
          <Image
            src="/hopiIcon.png"
            alt="Landscape picture"
            width={80}
            height={50}
          />
          <Image
            src="/hopiShopIcon.png"
            alt="Landscape picture"
            width={80}
            height={50}
          />
        </div>
        <div className={styles.pages}>
          <Link href="/create-post">ÜRÜNLER</Link>
          <Link href="/about">WEHOPİ</Link>
          <Link href="/about">KAMPANYALAR</Link>
          <Link href="/about">MARKALAR</Link>
          <Link href="/about">HOPİ</Link>
          <Link href="/about">BLOG</Link>
        </div>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Sana nasıl yardımcı olabilirim?"
            className={styles.inputArea}
          />
        </div>
        <div className={styles.signIn}>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className={styles.loginButton}
          >
            {session ? "Sign out" : "Giriş Yap veya Kayıt Ol"}
          </Link>
        </div>
      </div>
      <div className={styles.body}>
        <Image
          src="/hopiPageImage.png"
          alt="Landscape picture"
          width={1920}
          height={500}
          style={{ marginTop: "10px" }}
        />
      </div>
      <div className={styles.footer}>
        <div>
          <Image
            src="/hopiWorldIcon.png"
            alt="Landscape picture"
            width={100}
            height={50}
          />
          <h3>Hopi Dünyası</h3>
          <p>
            Yüzlerce markada kampanyalara ek tekliflerle, yüzlerce dükkandan
            anında alışveriş yapma ve hop diye ödeme imkanı sunan akıllı
            alışveriş arkadaşı.
          </p>
        </div>
        <div>
          <Image
            src="/hopiBenefitsIcon.png"
            alt="Landscape picture"
            width={100}
            height={50}
          />
          <h3>Hopi'nin Faydaları</h3>
          <p>
            Yüzlerce markada sana özel kazançlı alışveriş fırsatları ile
            Hopishop'ta özel ürün seçkileri ve Hopipay Dijital Kart ile kolay ve
            güvenli ödeme imkanı sunar.
          </p>
        </div>
        <div>
          <Image
            src="/pressWinIcon.png"
            alt="Landscape picture"
            width={100}
            height={50}
          />
          <h3>Tıkla Kazan</h3>
          "Tıkla Kazan" kampanyaları, markaların mevcut indirim ve
          kampanyalarına ek, her alışverişte sepet tutarının belli oranında
          Paracık kazandırır.
        </div>
        <div>
          <Image
            src="/hopiOpportunityIcon.png"
            alt="Landscape picture"
            width={100}
            height={50}
          />
          <h3>Hopi Fırsat Eklentisi</h3>
          <p>
            Hopi Eklentisi'ni tarayıcına yükleyerek, internette gönlünce
            dolaşırken yüzlerce markadaki kampanyalardan anında haberdar
            olabilirsin
          </p>
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className={styles.showcaseContainer}>
      {latestPost ? (
        <p className={styles.showcaseText}>
          Your most recent post: {latestPost.name}
        </p>
      ) : (
        <p className={styles.showcaseText}>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
