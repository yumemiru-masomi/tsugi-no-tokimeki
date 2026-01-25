"use client";

import { useState, useEffect } from "react";
import { Post, UserProfile, Suggestion } from "@/lib/types";
import AppLayout from "@/components/AppLayout";
import CalendarScreen from "@/screens/CalendarScreen";

// モックユーザータイプ
interface MockUser {
    uid: string;
}

export default function CalendarPage() {
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

        setPosts([]);
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
            <CalendarScreen userProfile={userProfile} events={events} />
        </AppLayout>
    );
}

