"use client";

import { useState } from "react";
import {
    XCircle,
    Send,
    RefreshCw,
    MapPin,
} from "lucide-react";
// TODO: Firebase連携 - Firestore書き込みを有効化する
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { User } from "firebase/auth";
// import { db, appId } from "@/lib/firebase";
import { CHARACTERS, STICKER_TYPES, UserProfile, PostStatus } from "@/lib/types";

// モックユーザータイプ
interface MockUser {
    uid: string;
}

interface PostModalProps {
    onClose: () => void;
    user: MockUser | null; // TODO: Firebase連携時は User に変更
    userProfile: UserProfile | null;
}

export default function PostModal({
    onClose,
    user,
    userProfile,
}: PostModalProps) {
    const [text, setText] = useState("");
    const [status, setStatus] = useState<PostStatus>("seen");
    const [character, setCharacter] = useState(
        userProfile?.favorites?.[0] || CHARACTERS[0]
    );
    const [stickerType, setStickerType] = useState(STICKER_TYPES[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!text || !user) return;
        setIsSubmitting(true);
        try {
            // TODO: Firebase連携 - Firestoreに投稿を保存する
            // await addDoc(
            //   collection(db, "artifacts", appId, "public", "data", "posts"),
            //   {
            //     uid: user.uid,
            //     text,
            //     status,
            //     character,
            //     stickerType,
            //     areaMasked: userProfile?.area || "不明",
            //     createdAt: serverTimestamp(),
            //   }
            // );

            // モック実装：コンソールに出力（実際の保存はFirebase連携後に実装）
            console.log("投稿内容:", {
                uid: user.uid,
                text,
                status,
                character,
                stickerType,
                areaMasked: userProfile?.area || "不明",
            });
            alert("投稿機能はFirebase連携後に有効化されます");
            onClose();
        } catch (e) {
            console.error("Post error:", e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-900">情報をシェア</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <XCircle className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                        {[
                            {
                                id: "seen",
                                label: "👀 見た",
                                activeClass: "bg-white text-blue-600 shadow-sm",
                            },
                            {
                                id: "bought",
                                label: "🛍 買えた",
                                activeClass: "bg-white text-green-600 shadow-sm",
                            },
                            {
                                id: "soldout",
                                label: "😢 売り切れ",
                                activeClass: "bg-white text-red-600 shadow-sm",
                            },
                        ].map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setStatus(s.id as PostStatus)}
                                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${status === s.id
                                    ? s.activeClass
                                    : "text-gray-700 hover:text-gray-900"
                                    }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <select
                            value={character}
                            onChange={(e) => setCharacter(e.target.value as any)}
                            className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900"
                        >
                            {CHARACTERS.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <select
                            value={stickerType}
                            onChange={(e) => setStickerType(e.target.value as any)}
                            className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900"
                        >
                            {STICKER_TYPES.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="詳細を教えてください（例：3Fのガチャコーナーにありました！残りわずかです。）"
                        className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-xl resize-none text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
                    />

                    <div className="flex items-center gap-2 text-xs text-gray-600 px-1">
                        <MapPin className="w-3 h-3" />
                        <span>
                            位置情報は「{userProfile?.area}」周辺として丸められます
                        </span>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !text}
                        className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {isSubmitting ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                        投稿する
                    </button>
                </div>
            </div>
        </div>
    );
}

