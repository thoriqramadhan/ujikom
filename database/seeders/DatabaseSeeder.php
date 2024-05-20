<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Faker\Generator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        DB::table('users')->insert([
            'first_name'    =>  'Test',
            'last_name'     =>  'User',
            'email'         =>  'test@gmail.com',
            'password'      =>  Hash::make('123456789'),
            'role'          =>  'admin',
            'last_seen'     =>  null
        ]);
    }
}
