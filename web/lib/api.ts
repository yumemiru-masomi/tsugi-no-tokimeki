const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export async function sendNotification(): Promise<{ ok: boolean }> {
  const response = await fetch(`${API_BASE_URL}/notify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("通知の送信に失敗しました");
  }

  return response.json();
}

