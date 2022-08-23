<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::firstOrCreate([
            'email' => env('ADMIN_EMAIL')
        ], [
            'name' => env('ADMIN_NAME'),
            'password' => Hash::make(env('ADMIN_PASSWORD'))
        ]);
    }
}
