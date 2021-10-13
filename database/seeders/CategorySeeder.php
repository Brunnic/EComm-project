<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'name' => 'Computers',
            'slug' => 'computers',
        ]);
        DB::table('categories')->insert([
            'name' => 'Headphones',
            'slug' => 'headphones',
        ]);
        DB::table('categories')->insert([
            'name' => 'Cell Phones',
            'slug' => 'cell-phones',
        ]);
        DB::table('categories')->insert([
            'name' => 'Accessories',
            'slug' => 'accessories',
        ]);
        DB::table('categories')->insert([
            'name' => 'Video Game Consoles & Accessories',
            'slug' => 'video-game-consoles-&-accessories',
        ]);
        DB::table('categories')->insert([
            'name' => 'Wearable Technology',
            'slug' => 'wearable-technology',
        ]);
        DB::table('categories')->insert([
            'name' => 'Camera & Photo',
            'slug' => 'camera-&-photo',
        ]);
        DB::table('categories')->insert([
            'name' => 'GPS & Navigation',
            'slug' => 'gps-&-navigation',
        ]);
    }
}
