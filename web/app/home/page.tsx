"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// TODO: Firebase連携 - Firestore読み取りを有効化する
import { Post, UserProfile, Suggestion } from "@/lib/types";
import AppLayout from "@/components/AppLayout";
import ForYouScreen from "@/screens/ForYouScreen";

// モックユーザータイプ
interface MockUser {
    uid: string;
}

export default function HomePage() {
    const router = useRouter();
    const [user, setUser] = useState<MockUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion | null>(null);

    useEffect(() => {
        // モックユーザー
        const mockUser: MockUser = { uid: "mock-user-123" };
        setUser(mockUser);

        // ローカルストレージからプロフィールを読み込む
        const savedProfile = localStorage.getItem("userProfile");
        if (savedProfile) {
            try {
                setUserProfile(JSON.parse(savedProfile));
            } catch (e) {
                console.error("Failed to parse saved profile", e);
            }
        } else {
            // プロフィールがない場合はオンボーディングへ
            router.push("/onboarding");
            return;
        }

        // モック投稿データ
        const mockPosts: Post[] = [
            {
                id: "1",
                uid: "mock-user",
                text: "新宿の3Fガチャコーナーでエンジェルブルー見つけました！",
                status: "seen",
                character: "エンジェルブルー",
                stickerType: "ボンボンドロップ",
                areaMasked: "新宿",
                createdAt: new Date(),
            },
            {
                id: "2",
                uid: "mock-user",
                text: "メゾピアノ買えました！残り少ないので急いで！",
                status: "bought",
                character: "メゾピアノ",
                stickerType: "プチドロップ",
                areaMasked: "渋谷",
                createdAt: new Date(Date.now() - 3600000),
            },
        ];
        setPosts(mockPosts);
        setEvents([]);
    }, [router]);

    useEffect(() => {
        if (posts.length > 0 && userProfile) {
            const recentPosts = posts.slice(0, 10);
            const favPosts = recentPosts.filter((p) =>
                userProfile.favorites.includes(p.character)
            );

            let decision: "go" | "gather" | "wait" = "wait";
            let score = 0.3;
            let reasons = ["まだ情報が少ないみたい..."];

            if (favPosts.some((p) => p.status === "bought" || p.status === "seen")) {
                decision = "go";
                score = 0.85;
                reasons = [
                    `${favPosts[0].areaMasked}で${favPosts[0].character}の目撃情報あり！`,
                    `過去の傾向から今なら在庫がある確率が高いよ`,
                    `あなたの行動範囲内での動きが活発です`,
                ];
            } else if (favPosts.length > 0) {
                decision = "gather";
                score = 0.5;
                reasons = [
                    "動きはあるけど、まだ確定情報が足りないかも",
                    "もう少し様子を見てみよう",
                ];
            }

            setSuggestions({
                decision,
                score,
                reasons,
                candidates: [
                    {
                        area: userProfile.area || "新宿",
                        time: "18:00〜",
                        prob: Math.floor(score * 100),
                    },
                    { area: "池袋", time: "19:30〜", prob: Math.floor(score * 80) },
                ],
            });
        } else {
            setSuggestions({
                decision: "wait",
                score: 0.1,
                reasons: ["まだ静かな様子...", "投稿が増えるのを待とう"],
                candidates: [],
            });
        }
    }, [posts, userProfile]);

    if (!userProfile) {
        return null; // オンボーディングにリダイレクト中
    }

    return (
        <AppLayout
            user={user}
            userProfile={userProfile}
            posts={posts}
            events={events}
            suggestions={suggestions}
        >
            <ForYouScreen
                suggestions={suggestions}
                userProfile={userProfile}
                events={events}
            />
        </AppLayout>
    );
}
