"use client";

import { useState, useEffect } from "react";
import { Post, UserProfile, Suggestion } from "@/lib/types";
import AppLayout from "@/components/AppLayout";
import FeedScreen from "@/screens/FeedScreen";

// モックユーザータイプ
interface MockUser {
    uid: string;
}

export default function FeedPage() {
    const [user, setUser] = useState<MockUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion | null>(null);

    useEffect(() => {
        const mockUser: MockUser = { uid: "mock-user-123" };
        setUser(mockUser);

        const savedProfile = localStorage.getItem("userProfile");
        if (savedProfile) {
            try {
                setUserProfile(JSON.parse(savedProfile));
            } catch (e) {
                console.error("Failed to parse saved profile", e);
            }
        }

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
    }, []);

    if (!userProfile) {
        return null;
    }

    return (
        <AppLayout
            user={user}
            userProfile={userProfile}
            posts={posts}
            events={events}
            suggestions={suggestions}
        >
            <FeedScreen posts={posts} userProfile={userProfile} />
        </AppLayout>
    );
}

