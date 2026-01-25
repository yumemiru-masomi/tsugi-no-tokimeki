"use client";

import { useState } from "react";
// TODO: Firebase連携 - Firestore書き込みを有効化する
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { User } from "firebase/auth";
import { Sparkles } from "lucide-react";
// import { db, appId } from "@/lib/firebase";
import { CHARACTERS, AREAS, WEEKDAYS, UserProfile } from "@/lib/types";

// モックユーザータイプ
interface MockUser {
    uid: string;
}

interface OnboardingProps {
    user: MockUser | any; // TODO: Firebase連携時は User に変更
    onComplete: () => void;
}

export default function Onboarding({ user, onComplete }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<Partial<UserProfile>>({
        favorites: [],
        area: undefined,
        availability: {},
    });

    const toggleFavorite = (char: string) => {
        setProfile((prev) => ({
            ...prev,
            favorites: prev.favorites?.includes(char as any)
                ? prev.favorites.filter((c) => c !== char)
                : [...(prev.favorites || []), char as any],
        }));
    };

    const toggleAvailability = (dayIndex: number, timeSlot: string) => {
        const dayStr = dayIndex.toString();
        setProfile((prev) => {
            const currentSlots = prev.availability?.[dayStr] || [];
            const newSlots = currentSlots.includes(timeSlot)
                ? currentSlots.filter((s) => s !== timeSlot)
                : [...currentSlots, timeSlot];
            return {
                ...prev,
                availability: { ...prev.availability, [dayStr]: newSlots },
            };
        });
    };

    const saveProfile = async () => {
        if (!user) return;
        try {
            // TODO: Firebase連携 - Firestoreにプロフィールを保存する
            // await setDoc(
            //   doc(db, "artifacts", appId, "users", user.uid, "profile", "main"),
            //   {
            //     ...profile,
            //     updatedAt: serverTimestamp(),
            //   }
            // );

            // モック実装：ローカルストレージに保存
            localStorage.setItem("userProfile", JSON.stringify(profile));
            onComplete();
        } catch (e) {
            console.error("Error saving profile", e);
        }
    };

    return (
        <div className="flex flex-col h-full bg-pink-50 p-6 overflow-y-auto">
            <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full">
                <div className="mb-8 text-center">
                    <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800">Tsugi no Tokimeki</h1>
                    <p className="text-gray-500 text-sm mt-2">
                        次のトキメキを逃さないための
                        <br />
                        行動判断エージェント
                    </p>
                </div>

                {step === 1 && (
                    <div className="w-full bg-white p-6 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-lg font-bold mb-4 text-center">推しキャラを選んでね</h2>
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                            {CHARACTERS.map((char) => (
                                <button
                                    key={char}
                                    onClick={() => toggleFavorite(char)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${profile.favorites?.includes(char)
                                            ? "bg-pink-500 text-white shadow-md transform scale-105"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {char}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            disabled={!profile.favorites || profile.favorites.length === 0}
                            className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            次へ
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="w-full bg-white p-6 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-lg font-bold mb-4 text-center">よく行くエリアは？</h2>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {AREAS.map((area) => (
                                <button
                                    key={area}
                                    onClick={() => setProfile({ ...profile, area })}
                                    className={`p-3 rounded-xl text-sm font-medium border-2 transition-all ${profile.area === area
                                            ? "border-pink-500 bg-pink-50 text-pink-700"
                                            : "border-transparent bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {area}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 py-3 text-gray-500 font-medium"
                            >
                                戻る
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                disabled={!profile.area}
                                className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-bold disabled:opacity-50"
                            >
                                次へ
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="w-full bg-white p-6 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-lg font-bold mb-2 text-center">いつ買いに行ける？(v3)</h2>
                        <p className="text-xs text-center text-gray-400 mb-4">
                            空いている時間を登録すると
                            <br />
                            「行ける日」だけ通知します
                        </p>

                        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                            {WEEKDAYS.map((day, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <span className="w-8 text-sm font-bold text-gray-600 text-center">
                                        {day}
                                    </span>
                                    <div className="flex-1 flex gap-2 overflow-x-auto pb-1">
                                        {["午前", "午後", "夕方", "夜"].map((slot) => (
                                            <button
                                                key={slot}
                                                onClick={() => toggleAvailability(idx, slot)}
                                                className={`whitespace-nowrap px-2 py-1 rounded-md text-xs border ${(profile.availability?.[idx.toString()] || []).includes(slot)
                                                        ? "bg-blue-100 border-blue-400 text-blue-700"
                                                        : "bg-white border-gray-200 text-gray-400"
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(2)}
                                className="flex-1 py-3 text-gray-500 font-medium"
                            >
                                戻る
                            </button>
                            <button
                                onClick={saveProfile}
                                className="flex-1 bg-pink-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-pink-200"
                            >
                                はじめる
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

