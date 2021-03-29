<?php

use Illuminate\Database\Seeder;

class RTUDeviceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory('App\RTUDevice', 10)->create();
    }
}
