"use server";
import { destroySession } from "@/app/lib/session";

export async function POST() {
    try{
        console.log("check");
        await destroySession();
        return Response.json({message: "Logged out successfully"}, {status:200});
    } catch (e){
        console.error("Error terminating session:",e);
        return Response.json({ message:"Server Error" },{status:500});
    }
}