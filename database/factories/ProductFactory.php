<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = $this->faker->words($this->faker->numberBetween(3, 9), true);
        return [
            'name' => $name,
            'description' => $this->faker->paragraphs(5, true),
            'image' => $this->faker->imageUrl(),
            'price' => $this->faker->randomFloat(2, 5, 3000),
            'slug' => Str::slug($name, '-'),
            'category_id' => $this->faker->numberBetween(1, 8),
        ];
    }
}
