import { Timestamp } from 'firebase/firestore';

export const CHARACTERS = ['エンジェルブルー', 'メゾピアノ', 'デイジーラバーズ', 'ポンポネット', 'ブルークロス'] as const;
export const STICKER_TYPES = ['ボンボンドロップ', 'プチドロップ', 'タイルシール', 'ノーマル'] as const;
export const AREAS = ['新宿', '渋谷', '池袋', '東京', '横浜', '大宮'] as const;
export const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'] as const;

export type Character = typeof CHARACTERS[number];
export type StickerType = typeof STICKER_TYPES[number];
export type Area = typeof AREAS[number];
export type PostStatus = 'seen' | 'bought' | 'soldout';
export type Decision = 'go' | 'gather' | 'wait';

export interface UserProfile {
  favorites: Character[];
  area: Area;
  availability: Record<string, string[]>; // { "1": ["午前", "午後"], ... }
}

export interface Post {
  id: string;
  uid: string;
  text: string;
  status: PostStatus;
  character: Character;
  stickerType: StickerType;
  areaMasked?: string;
  createdAt: Timestamp | Date | null;
}

export interface StoreEvent {
  id: string;
  // イベント情報の型定義
  [key: string]: any;
}

export interface Suggestion {
  decision: Decision;
  score: number;
  reasons: string[];
  candidates: {
    area: string;
    time: string;
    prob: number;
  }[];
}

