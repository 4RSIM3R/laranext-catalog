/**
 * FileUpload Component
 *
 * A robust file upload component with the following features:
 * - Drag & drop support
 * - File validation (type and size)
 * - Image preview with lazy loading
 * - Proper cleanup of object URLs
 * - State management for switching between records
 * - Disabled state support
 * - Accessibility features (ARIA labels, keyboard navigation)
 * - Error handling with user feedback
 * - Supports both File objects and existing Media objects
 */

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
    disabled?: boolean;
}

export default function FileUpload({
    media,
    onChange,
    accept = 'image/*,application/pdf,.doc,.docx,.txt',
    maxSize = 5 * 1024 * 1024,
    className,
    id,
    disabled = false,
}: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputId =
        id || `file-upload-${Math.random().toString(36).substr(2, 9)}`;

    // Clean up preview URL when component unmounts
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // Reset selected file when media prop changes (e.g., switching between edit records)
    useEffect(() => {
        // Only reset if there's actually a new media or switching between records
        setSelectedFile(null);
        setError(null);
        setPreviewUrl(null);
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [media?.id]);

    const validateFile = (file: File): string | null => {
        // Validate file size
        if (file.size === 0) {
            return 'File is empty';
        }
        if (file.size > maxSize) {
            return `File size must be less than ${formatFileSize(maxSize)}`;
        }

        // Validate file type
        const acceptedTypes = accept.split(',').map((type) => type.trim());
        const isValidType = acceptedTypes.some((type) => {
            if (type.startsWith('.')) {
                return file.name.toLowerCase().endsWith(type.toLowerCase());
            }
            if (type.includes('*')) {
                return file.type.startsWith(type.split('/')[0]);
            }
            return file.type === type;
        });

        if (!isValidType) {
            return 'File type not supported';
        }

        return null;
    };

    const processFile = (file: File) => {
        // Validate the file
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            setSelectedFile(null);
            onChange(null);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            return;
        }

        // Clear any previous errors
        setError(null);

        // Clean up previous preview URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        // Set the new file
        setSelectedFile(file);
        onChange(file);

        // Create preview for images
        if (file.type.startsWith('image/')) {
            try {
                const newPreviewUrl = URL.createObjectURL(file);
                setPreviewUrl(newPreviewUrl);
            } catch (err) {
                console.error('Failed to create preview URL:', err);
                setPreviewUrl(null);
            }
        } else {
            setPreviewUrl(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const file = e.dataTransfer.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleRemove = () => {
        // Clean up preview URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }

        // Reset state
        setSelectedFile(null);
        setError(null);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // Notify parent component
        onChange(null);
    };

    const handleClickUpload = () => {
        if (!disabled) {
            fileInputRef.current?.click();
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
                    {!disabled && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-destructive p-0 text-destructive-foreground hover:bg-destructive/90"
                            onClick={handleRemove}
                            aria-label="Remove file"
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove file</span>
                        </Button>
                    )}

                    {displayIsImage && displayImageUrl ? (
                        <div className="space-y-2">
                            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                                <img
                                    src={displayImageUrl}
                                    alt={displayName}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            '/placeholder.svg';
                                    }}
                                />
                            </div>
                            <div className="text-xs">
                                <p
                                    className="truncate font-medium"
                                    title={displayName}
                                >
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
                                <p
                                    className="truncate text-sm font-medium"
                                    title={displayName}
                                >
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
                <div
                    className="flex w-full items-center justify-center"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <label
                        htmlFor={!disabled ? inputId : undefined}
                        className={cn(
                            'flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card transition-colors',
                            disabled
                                ? 'cursor-not-allowed opacity-50'
                                : 'cursor-pointer hover:bg-muted/50',
                            isDragging &&
                                !disabled &&
                                'border-primary bg-primary/5',
                        )}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">
                                    {disabled
                                        ? 'Upload disabled'
                                        : isDragging
                                          ? 'Drop file here'
                                          : 'Click to upload or drag & drop'}
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
                disabled={disabled}
                className="hidden"
                aria-label="File upload input"
            />

            {hasContent && !disabled && (
                <Button
                    type="button"
                    onClick={handleClickUpload}
                    variant="outline"
                    className="w-full"
                    disabled={disabled}
                >
                    <Upload className="mr-2 h-4 w-4" />
                    Change File
                </Button>
            )}

            {error && (
                <p className="text-xs text-destructive" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
