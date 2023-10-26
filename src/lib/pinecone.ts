import { Pinecone } from "@pinecone-database/pinecone"
import { downloadFromS3 } from "./s3-server";
import {PDFLoader} from 'langchain/document_loaders/fs/pdf'

let pinecone:  Pinecone | null = null

export const getPineconeClient = async () => {
    if(!pinecone) {
        pinecone = new Pinecone({
            environment: process.env.PINECONE_ENVIRONMENT!,
            apiKey: process.env.PINECONE_API_KEY!,
        });
    }
    return pinecone;
}

export async function loadS3IntoPinecone(file_key: string) {
    // 1. Obtain the PDF -> download and read from pdf
    console.log('Downloading S3 into file system');

    const file_name = await downloadFromS3(file_key)

    if(!file_name) {
        throw new Error("Could not download from S3")
    }

    const loader = new PDFLoader(file_name);
    const pages = await loader.load();
    return pages;
}