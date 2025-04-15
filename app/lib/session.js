import "server-only";
import { cookies } from "next/headers";

export async function getSession() {
    const cookieStore = await cookies();
    const sessionValue = cookieStore.get('session')?.value;

    if (!sessionValue) return null;

    try {
        const session = JSON.parse(sessionValue);
        if (new Date(session.expiresAt) < new Date()) return null;
        return session;
    } catch (error) {
        console.error("Invalid session:", error);
        return null;
    }
}

export async function destroySession() {
    const cookieStore = cookies();
    cookieStore.set('session','',{
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        sameSite: 'lax',
        path: '/',
    });
}