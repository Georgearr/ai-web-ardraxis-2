const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ChatResponse {
  response: string;
  sources_used: number;
  processing_time: number;
}

export interface Member {
  id: string;
  nama_panggilan: string;
  nama_lengkap: string;
  jabatan: string;
  sekbid: string;
  instagram: string;
  deskripsi: string;
}

export interface Event {
  id: string;
  nama_event: string;
  tanggal: string;
  lokasi: string;
  instagram: string;
  deskripsi: string;
}

export async function sendMessage(message: string): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function getMembers(): Promise<Member[]> {
  const res = await fetch(`${API_BASE_URL}/members`);
  if (!res.ok) throw new Error("Failed to fetch members");
  const data = await res.json();
  return data.data;
}

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${API_BASE_URL}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return data.data;
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
