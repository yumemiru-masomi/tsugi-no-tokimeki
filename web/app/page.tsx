"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import liff from "@line/liff";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // LIFF処理を一旦コメントアウト
    // const init = async () => {
    //   // ローカル環境の判定
    //   const isLocal =
    //     typeof window !== "undefined" &&
    //     (window.location.hostname === "localhost" ||
    //       window.location.hostname === "127.0.0.1");

    //   // ローカル環境の場合は認証をスキップ
    //   if (isLocal) {
    //     // プロフィールがあるかチェック
    //     const savedProfile = localStorage.getItem("userProfile");
    //     if (savedProfile) {
    //       router.push("/home");
    //     } else {
    //       router.push("/onboarding");
    //     }
    //     return;
    //   }

    //   try {
    //     const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    //     if (!liffId) {
    //       // 本番環境ではエラーページを表示
    //       if (process.env.NODE_ENV === "production") {
    //         router.push("/error?message=LIFF_ID_NOT_CONFIGURED");
    //         return;
    //       }
    //       // 開発環境ではホームへ
    //       console.error("LIFF ID が設定されていません");
    //       router.push("/home");
    //       return;
    //     }

    //     await liff.init({ liffId });

    //     if (!liff.isLoggedIn()) {
    //       // 未認証の場合はLINEログインへ
    //       liff.login();
    //       return;
    //     }

    //     // 認証済みの場合はホームへリダイレクト
    //     router.push("/home");
    //   } catch (e) {
    //     console.error("LIFF初期化エラー:", e);
    //     // 本番環境ではエラーページを表示
    //     if (process.env.NODE_ENV === "production") {
    //       router.push("/error?message=LIFF_INIT_FAILED");
    //       return;
    //     }
    //     router.push("/home");
    //   }
    // };

    // init();

    // オンボーディング完了状態をチェック
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      router.push("/home");
    } else {
      router.push("/onboarding");
    }
  }, [router]);

  return (
    <main style={{ padding: 24 }}>
      <p>読み込み中...</p>
    </main>
  );
}
