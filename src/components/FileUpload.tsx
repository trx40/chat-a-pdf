'use client'

import { Inbox } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {

    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        multiple: false,
    });

     return ( 
        <div className='p-2 bg-white rounded-xl'>
            <div {...getRootProps({
                className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col',
            })}>
                <input {...getInputProps()}/>
                <>
                    <Inbox className='w-10 h-10 text-blue-500' />
                    <p className='mt-2 text-sm text-slate-400'>Drop PDF here</p>
                </>
            </div>
        </div>
     )
}
export default FileUpload;