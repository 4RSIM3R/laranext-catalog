<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payload = [
            [
                'key' => 'company_email',
                'value' => 'info@example.com',
            ],
            [
                'key' => 'company_phone',
                'value' => '081234567890',
            ],
            [
                'key' => 'company_address',
                'value' => 'Jl. Raya No. 123, Jakarta Selatan',
            ],
            [
                'key' => 'company_facebook',
                'value' => 'https://www.facebook.com/example',
            ],
            [
                'key' => 'company_instagram',
                'value' => 'https://www.instagram.com/example',
            ],
            [
                'key' => 'company_twitter',
                'value' => 'https://www.twitter.com/example',
            ],
            [
                'key' => 'company_linkedin',
                'value' => 'https://www.linkedin.com/example',
            ],
            [
                'key' => 'company_youtube',
                'value' => 'https://www.youtube.com/example',
            ],
            [
                'key' => 'company_tiktok',
                'value' => 'https://www.tiktok.com/example',
            ],
        ];

        Setting::insert($payload);
    }
}
