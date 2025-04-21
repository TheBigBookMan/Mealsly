import React from "react";
import { ArrowUpTrayIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

interface FileUploadProps {
    id?: string;
    label?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    className?: string;
    isLoading?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
    id = "file-upload",
    label = "Upload File",
    onChange,
    accept = "*",
    className = "",
    isLoading = false,
}) => {
    return (
        <div className="w-full">
            <input
                id={id}
                type="file"
                accept={accept}
                onChange={onChange}
                className="hidden"
            />

            <label
                htmlFor={isLoading ? undefined : id}
                className={`cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-lg transition
                border border-sky-700 bg-sky-700 hover:bg-sky-800
                ${isLoading ? "opacity-60 cursor-not-allowed" : "hover:shadow-md"}
                ${className}
                `}
            >
                {isLoading ? (
                <>
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    Uploading...
                </>
                ) : (
                <>
                    <ArrowUpTrayIcon className="w-5 h-5" />
                    {label}
                </>
                )}
            </label>
        </div>
    );
};

export default FileUpload;