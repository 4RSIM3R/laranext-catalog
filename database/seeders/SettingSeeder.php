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
                'key' => 'contact_email',
                'value' => 'info@lokalberdaya.id',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'contact_phone',
                'value' => '+62 813 3062 1873',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'company_address',
                'value' => 'Jl. Raya No. 123, Jakarta Selatan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'site_description',
                'value' => 'Lokal Berdaya adalah platform yang menghubungkan produk lokal dengan konsumen. Kami mendukung UMKM Indonesia untuk berkembang dan berdaya saing di era digital.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'company_facebook',
                'value' => 'https://www.facebook.com/lokalberdaya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'company_instagram',
                'value' => 'https://www.instagram.com/lokalberdaya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'company_twitter',
                'value' => 'https://www.twitter.com/lokalberdaya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'company_linkedin',
                'value' => 'https://www.linkedin.com/company/lokalberdaya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'company_youtube',
                'value' => 'https://www.youtube.com/@lokalberdaya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'company_tiktok',
                'value' => 'https://www.tiktok.com/@lokalberdaya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Setting::insert($payload);
    }
}
