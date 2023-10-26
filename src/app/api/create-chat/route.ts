// /api/create-chat

import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const {file_key, file_name} = body;
        const pages = await loadS3IntoPinecone(file_key);
        return NextResponse.json({ pages })
        
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        )
    }
}