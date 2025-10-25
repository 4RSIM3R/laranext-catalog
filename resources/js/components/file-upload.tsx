import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, formatFileSize } from '@/lib/utils';
import { Media } from '@/types/media';
import { FileIcon, ImageIcon, Upload, X } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface FileUploadProps {
    media?: Media | null;
    onChange: (file: File | null) => void;
    accept?: string;
    maxSize?: number; // in bytes
    className?: string;
    id?: string;
}

export default function FileUpload({
    media,
    onChange,
    accept = 'image/*,application/pdf,.doc,.docx,.txt',
    maxSize = 5 * 1024 * 1024,
    className,
    id,
}: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputId = id;

    // Effect to clean up the object URL
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const validateFile = (file: File): string | null => {
        if (file.size > maxSize) {
            return `File size must be less than ${formatFileSize(maxSize)}`;
        }
        const acceptedTypes = accept.split(',').map((type) => type.trim());
        const isValidType = acceptedTypes.some((type) => {
            if (type.startsWith('.'))
                return file.name.toLowerCase().endsWith(type.toLowerCase());
            if (type.includes('*'))
                return file.type.startsWith(type.split('/')[0]);
            return file.type === type;
        });
        if (!isValidType) return 'File type not supported';
        return null;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setSelectedFile(file);
        onChange(file);

        if (previewUrl) URL.revokeObjectURL(previewUrl);

        if (file.type.startsWith('image/')) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    const handleRemove = () => {
        setSelectedFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setError(null);
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const currentFile = selectedFile;
    const currentMedia = !selectedFile ? media : null;
    const hasContent = currentFile || currentMedia;

    const displayName =
        currentFile?.name ||
        currentMedia?.file_name ||
        currentMedia?.name ||
        'Unknown file';
    const displaySize = currentFile?.size || currentMedia?.size || 0;
    const displayImageUrl =
        previewUrl || currentMedia?.preview_url || currentMedia?.original_url;
    const displayIsImage = currentFile
        ? currentFile.type.startsWith('image/')
        : currentMedia
          ? currentMedia.mime_type?.startsWith('image/')
          : false;

    return (
        <div className={cn('w-full max-w-sm space-y-3', className)}>
            {hasContent ? (
                <div className="relative rounded-lg border bg-card p-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-destructive p-0 text-destructive-foreground hover:bg-destructive/90"
                        onClick={handleRemove}
                    >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove file</span>
                    </Button>

                    {displayIsImage && displayImageUrl ? (
                        <div className="space-y-2">
                            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                                <img
                                    src={displayImageUrl || '/placeholder.svg'}
                                    alt={displayName}
                                    className="object-cover"
                                    sizes="(max-width: 384px) 100vw, 384px"
                                />
                            </div>
                            <div className="text-xs">
                                <p className="truncate font-medium">
                                    {displayName}
                                </p>
                                <p className="text-muted-foreground">
                                    {formatFileSize(displaySize)}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                {displayIsImage ? (
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                ) : (
                                    <FileIcon className="h-8 w-8 text-muted-foreground" />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                    {displayName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {formatFileSize(displaySize)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex w-full items-center justify-center">
                    <label
                        htmlFor={inputId}
                        className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card hover:bg-muted/50"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">
                                    Click to upload
                                </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Max {formatFileSize(maxSize)}
                            </p>
                        </div>
                    </label>
                </div>
            )}

            <Input
                id={inputId}
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept={accept}
                className="hidden"
            />

            {hasContent && (
                <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                >
                    <Upload className="mr-2 h-4 w-4" />
                    Change File
                </Button>
            )}

            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
        </div>
    );
}
