<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\RTUDevice;
use Faker\Generator as Faker;

$factory->define(RTUDevice::class, function (Faker $faker) {
    return [
        //
        'serial_number'    =>  "RTU".  $faker->randomNumber($nbDigits = 5, $strict = true) ,
        'name'     =>     'Pole'.$faker->randomDigit. $faker->name,
        'channels'     =>    $faker->randomDigit,
        'cruster'       =>      $faker->randomDigit,
        'phonenumber'       =>      $faker->phoneNumber,
    ];
});
