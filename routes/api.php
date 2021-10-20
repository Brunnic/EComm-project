<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\ProductsController;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    if($request->user()) {
        return $request->user();
    } else {
        return response()->json(['message' => 'Unauthenticated']);
    }
});


Route::apiResource('categories', CategoriesController::class);
Route::apiResource('products', ProductsController::class);

Route::get('/search/{query}', function(Request $request, $query) {
    $products = Product::where('name', 'like', '%'. $query . '%')->limit(3)->get();
    $categories = Category::where('name', 'like', '%'. $query . '%')->limit(3)->get();
    
    return $products->merge($categories);
});

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::get('/auth/logout', [AuthController::class, 'logout']);
