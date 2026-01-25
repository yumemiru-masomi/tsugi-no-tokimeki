import { useEffect, useState } from "react";
import liff from "@line/liff";

type LiffProfile = Awaited<ReturnType<typeof liff.getProfile>>;

interface UseLiffResult {
  message: string;
  isLoading: boolean;
  profile: LiffProfile | null;
}

export function useLiff(): UseLiffResult {
  const [message, setMessage] = useState("初期化中...");
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<LiffProfile | null>(null);

  useEffect(() => {
    const init = async () => {
      // ローカル環境の判定
      const isLocal =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1");

      // ローカル環境の場合はLIFF初期化をスキップ
      if (isLocal) {
        setMessage("ローカル開発環境です");
        setIsLoading(false);
        return;
      }

      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) throw new Error("LIFF ID がない");

        await liff.init({ liffId });

        // 認証済みであることを前提とする（認証チェックは上位で行う）
        if (!liff.isLoggedIn()) {
          setMessage("認証が必要です");
          setIsLoading(false);
          return;
        }

        const userProfile = await liff.getProfile();
        setProfile(userProfile);
        setMessage(`こんにちは ${userProfile.displayName} さん！`);
      } catch (e) {
        setMessage("エラーが発生しました");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  return { message, isLoading, profile };
}

