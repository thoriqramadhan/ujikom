<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Managements;
use App\Models\Menu;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menus = Menu::all();
        $categories = Category::all();
        $orders = Order::all();
        $orderbelumdibayar = Order::where('status','belum dibayar')->get();
        $orderselesai = Order::where('status','selesai')->get();
        $orderitems = OrderItem::all();
        $users = Auth::user();
        $loginuser = Auth::user();

        return Inertia::render('Kasir/Kasir', [
            'menus' => $menus,
            'categories' => $categories,
            'orders' => $orders,
            'orderbelumdibayar' => $orderbelumdibayar,
            'orderselesai' => $orderselesai,
            'orderitems' => $orderitems,
            'users' => $users,
            'loginuser' => $loginuser
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Ubah string JSON order menjadi array PHP
        $orderData = json_decode($request->input('order'), true);
        
        // Buat order baru dan simpan data pelanggan
        Order::create([
            'customer_name' => $orderData['customerName'],
            'tax' => $orderData['tax'],
            'totalHarga' => $orderData['totalHarga'],
            'data' => json_encode($orderData['data']), // Ubah array menjadi string JSON sebelum menyimpannya
        ]);
        
        // Redirect atau response lainnya
        return redirect('/kasir');
    }

    public function storeSpontan(Request $request)
    {
        // Ubah string JSON order menjadi array PHP
        $orderData = json_decode($request->input('order'), true);
        
        // Buat order baru dan simpan data pelanggan
        $order = Order::create([
            'customer_name' => $orderData['customerName'],
            'tax' => $orderData['tax'],
            'totalHarga' => $orderData['totalHarga'],
            'data' => json_encode($orderData['data']),
            // Ubah array menjadi string JSON sebelum menyimpannya
        ]);
        
        // Ubah status order menjadi 'selesai'
        $order->status = 'selesai';
        $order->save();
        
        // Redirect atau response lainnya
        return redirect('/kasir');
    }
    
    
    
    
    






    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // dd($id);
        $order = Order::find($id);
        if ($order) {
            $order->status = 'selesai';
            $order->save();
        }
    
        // Redirect atau response lainnya
        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function updateUser(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required'
        ]);

        $input = $request->all();

        User::create($input);
    }
}
