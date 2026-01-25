"use client";

// TODO: Firebase連携 - Firebase認証を有効化する
// import { signOut } from "firebase/auth";
// import { User } from "firebase/auth";
import { UserProfile } from "@/lib/types";
// import { auth } from "@/lib/firebase";

// モックユーザータイプ
interface MockUser {
  uid: string;
}

interface ProfileScreenProps {
  userProfile: UserProfile | null;
  user: MockUser | null; // TODO: Firebase連携時は User に変更
}

export default function ProfileScreen({ userProfile, user }: ProfileScreenProps) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
          🦄
        </div>
        <div>
          <h2 className="font-bold text-lg">My Profile</h2>
          <p className="text-xs text-gray-500">
            ID: {user?.uid?.slice(0, 6)}...
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-bold text-gray-500 mb-3 border-b pb-1">
            設定中の条件
          </h3>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-3 border-b border-gray-50 flex justify-between">
              <span className="text-sm text-gray-600">エリア</span>
              <span className="text-sm font-bold text-gray-900">
                {userProfile?.area}
              </span>
            </div>
            <div className="p-3 border-b border-gray-50">
              <span className="text-sm text-gray-600 block mb-2">
                お気に入りキャラ
              </span>
              <div className="flex flex-wrap gap-1">
                {userProfile?.favorites?.map((f) => (
                  <span
                    key={f}
                    className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded-md"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={() => {
            // TODO: Firebase連携 - Firebaseからログアウトする
            // signOut(auth);
            // モック実装：ローカルストレージをクリア
            localStorage.removeItem("userProfile");
            alert("ログアウト機能はFirebase連携後に有効化されます");
          }}
          className="w-full py-3 text-red-500 font-bold bg-red-50 rounded-xl mt-8"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}

