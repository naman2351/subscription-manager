"server-only";
import { cookies } from "next/headers";

export async function createSession(email) {
    const expiresAt = new Date( Date.now() + 7 * 24 * 60 * 60 *1000 );
    const session = { email,expiresAt };
    const cookieStore = await cookies();

    cookieStore.set('session', JSON.stringify(session), {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}