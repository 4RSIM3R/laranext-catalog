import { SeoConfiguration } from '@/components/seo-configuration';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AppLayout } from '@/layouts/app-layout';
import { FormResponse } from '@/lib/constant';
import page from '@/routes/setting/page';
import { Page } from '@/types/page';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

type Props = {
    props: Page;
};

export default function PageForm({ props }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: props?.name || '',
        slug: props?.slug || '',
        content: props?.content || ({} as Record<string, any>),
        seo_config:
            props?.seo_config ||
            ({
                title: '',
                description: '',
                keywords: '',
                author: '',
                canonical: '',
                locale: 'id_ID',
                language: 'id',
                type: 'website',
                site_name: '5758 Creative Lab',
                twitter_card: 'summary_large_image',
                twitter_site: '',
                twitter_creator: '',
                image: '',
                image_width: 1200,
                image_height: 630,
                image_alt: '',
            } as Record<string, any>),
        is_active: Boolean(props?.is_active ?? true),
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(page.update(props.id).url, FormResponse);
    };

    const updateSeoConfig = (field: string, value: any) => {
        if (field === 'seo_config') {
            // Handle full seo_config object update from SeoConfiguration component
            setData('seo_config', value);
        } else {
            // Handle individual field updates
            const newSeoConfig = { ...data.seo_config, [field]: value };
            setData('seo_config', newSeoConfig);
        }
    };

    const updateContent = (field: string, value: string) => {
        const newContent = { ...data.content, [field]: value };
        setData('content', newContent);
    };

    const handleIsActiveChange = (checked: boolean) => {
        // @ts-expect-error - Inertia useForm type inference issue with complex nested types
        setData('is_active', checked);
    };

    // Helper function to format field names for display
    const formatFieldName = (fieldName: string) => {
        return fieldName
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <form onSubmit={onSubmit}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            Page Form
                        </CardTitle>
                        <CardDescription>
                            Enter the system setting data here.
                        </CardDescription>
                    </div>
                    <Button type="submit" disabled={processing}>
                        {processing && (
                            <Loader2 className="ml-2 animate-spin" />
                        )}
                        {processing ? 'Saving...' : 'Save Page'}
                    </Button>
                </CardHeader>
                <CardContent className="flex h-fit flex-col gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Page Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Home"
                            disabled
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="home"
                            disabled
                        />
                        {errors.slug && (
                            <p className="text-sm text-red-500">
                                {errors.slug}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={data.is_active}
                            onChange={(e) =>
                                handleIsActiveChange(e.target.checked)
                            }
                            className="rounded border-gray-300"
                        />
                        <Label htmlFor="is_active">Active</Label>
                    </div>
                </CardContent>
            </Card>
            {/* Content Editor Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Page Content</CardTitle>
                    <CardDescription>
                        Configure dynamic content for this page. These fields
                        control the text displayed on the frontend.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {data.content &&
                        Object.keys(data.content).length > 0 ? (
                            Object.entries(data.content).map(([key, value]) => (
                                <div key={key} className="space-y-2">
                                    <Label
                                        htmlFor={`content_${key}`}
                                        className="text-sm font-medium"
                                    >
                                        {formatFieldName(key)}
                                    </Label>
                                    {key.includes('description') ||
                                    key.includes('content') ||
                                    value?.toString().length > 100 ? (
                                        <Textarea
                                            id={`content_${key}`}
                                            value={value?.toString() || ''}
                                            onChange={(e) =>
                                                updateContent(
                                                    key,
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={`Enter ${formatFieldName(key).toLowerCase()}...`}
                                            className="min-h-[80px] resize-y"
                                        />
                                    ) : (
                                        <Input
                                            id={`content_${key}`}
                                            value={value?.toString() || ''}
                                            onChange={(e) =>
                                                updateContent(
                                                    key,
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={`Enter ${formatFieldName(key).toLowerCase()}...`}
                                        />
                                    )}
                                    {errors[`content.${key}`] && (
                                        <p className="text-sm text-red-500">
                                            {errors[`content.${key}`]}
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="py-8 text-center text-gray-500">
                                <p>
                                    No content fields available for this page.
                                </p>
                                <p className="mt-2 text-sm">
                                    Content fields are automatically generated
                                    based on the page template.
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <SeoConfiguration
                data={data.seo_config as any}
                setData={updateSeoConfig}
                contentTypeOptions={[
                    { value: 'article', label: 'Article' },
                    { value: 'website', label: 'Website' },
                    { value: 'blog', label: 'Blog' },
                ]}
            />
        </form>
    );
}

PageForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
