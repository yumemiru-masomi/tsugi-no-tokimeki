"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function Page() {
  const [message, setMessage] = useState("初期化中...");

  useEffect(() => {
    const init = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) throw new Error("LIFF ID がない");

        await liff.init({ liffId });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        setMessage(`こんにちは ${profile.displayName} さん！`);
      } catch (e) {
        setMessage("エラーが発生しました");
        console.error(e);
      }
    };

    init();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>LIFF × Next.js</h1>
      <p>{message}</p>
    </main>
  );
}
