<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'login' => 'Admin',
            'email' => 'admin@test.com',
            'password' => bcrypt('admin'),
            'role' => 'admin'
        ]);
    }
}
