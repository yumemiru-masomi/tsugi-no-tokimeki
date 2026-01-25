"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/lib/types";
import Onboarding from "@/components/Onboarding";

// モックユーザータイプ
interface MockUser {
  uid: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    const mockUser: MockUser = { uid: "mock-user-123" };
    setUser(mockUser);
  }, []);

  const handleOnboardingComplete = () => {
    // オンボーディング完了後、ホームにリダイレクト
    router.push("/home");
  };

  if (!user) {
    return null;
  }

  return <Onboarding user={user as any} onComplete={handleOnboardingComplete} />;
}

