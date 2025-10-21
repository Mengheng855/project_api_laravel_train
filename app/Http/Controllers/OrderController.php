<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function createOrder(Request $req){
        $data=$req->validate([
            'items' => 'required|array',
            'items.*.course_id' => 'required|integer|exists:courses,course_id',
            'items.*.price' => 'required|numeric',
            'items.*.quantity' => 'required|integer|min:1'
        ]);
        $user_id = Auth::id();
        $total = collect($data['items'])->sum(fn($item) => $item['price'] * $item['quantity']);
        $order = Order::create([
            'user_id' => $user_id,
            'total_price' => $total,
            'status' => 'pending',
        ]);
        foreach ($data['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'course_id' => $item['course_id'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
            ]);
        }
        $order->load('items.course');
        return apiResponse(200,'order successfully',$order);
    }
}
