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
        $orders = Order::where('status','belum dibayar')->get();
        $orderselesai = Order::where('status','selesai')->get();
        $orderitems = OrderItem::all();
        $users = Auth::user();
        $managements = Managements::all();

        return Inertia::render('Kasir/Kasir', [
            'menus' => $menus,
            'categories' => $categories,
            'orders' => $orders,
            'orderselesai' => $orderselesai,
            'orderitems' => $orderitems,
            'users' => $users,
            'managements' => $managements
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
    $customerData = $request->validate([
        'customer_name' => 'required',
    ]);
    

    // Ubah string JSON selectedFood menjadi array PHP
    $foodData = json_decode($request->input('selectedFood'), true);

    // Validasi apakah $foodData adalah array
    if (!is_array($foodData)) {
        return redirect()->back()->withErrors(['selectedFood' => 'Format data makanan yang dipilih tidak valid']);
    }

    // Buat order dan simpan data pelanggan
    $order = Order::create([
        'customer_name' => $customerData['customer_name'],
    ]);

    // Iterasi melalui selectedFood dan simpan setiap item ke dalam order items
    foreach ($foodData as $item) {
        OrderItem::create([
            'order_id' => $order->id,
            'menu_id' => $item['id'],
            'name' => $item['name'],
            'harga' => $item['harga'],
            'totalHarga' => $item['totalHarga'],
            'items' => $item['items'],
            // Tambahkan kolom lain sesuai kebutuhan
        ]);
    }  


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
    public function edit(string $order_id)
    {
        $orders = Order::where('status','belum dibayar')->get();
        $orderselesai = Order::where('status','selesai')->get();
        $orderitemsid = OrderItem::findOrFail($order_id);
        $orderitems = OrderItem::all();
        $users = Auth::user();
        $managements = Managements::all();

        return Inertia::render('Kasir/Kasir', [
            'orders' => $orders,
            'orderselesai' => $orderselesai,
            'orderitems' => $orderitems,
            'users' => $users,
            'managements' => $managements,
        ]);
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
