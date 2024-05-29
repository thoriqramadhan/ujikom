<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Menu;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;


class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        $loginuser = Auth::user();
        $onlykasir = User::where('role', 'kasir')->get();
        $menus = Menu::all();
        $categories = Category::all();
        
        foreach ($onlykasir as $kasir) {
            if (Cache::has('user-is-online-' . $kasir->id)) {
                $kasir['user-is-online'] = true;
            } else {
                $kasir['user-is-online'] = false;
            }
        }
        
        $today = Carbon::today();
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        
        $orderselesai = Order::where('status','selesai')->whereDate('order_time', $today)->get();

        $uangHarian = Order::where('status','selesai')->whereDate('order_time', $today)->sum('totalHarga');
        $uangBulanan = Order::where('status','selesai')->whereMonth('order_time', $currentMonth)->whereYear('order_time', $currentYear)->sum('totalHarga');
        $uangTahunan = Order::where('status','selesai')->whereYear('order_time', $currentYear)->sum('totalHarga');


        $menuSales = [];

        foreach ($orderselesai as $order) {
            $orderData = json_decode($order->data, true);
            if (is_array($orderData)) {
                foreach ($orderData as $item) {
                    if (isset($item['id']) && isset($item['items'])) { // Menyesuaikan dengan kunci yang ada
                        $menu = Menu::find($item['id']);
                        if ($menu) {
                            $menuName = $menu->nama;
                            $quantity = $item['items']; // Menyesuaikan dengan kunci yang ada
        
                            if (!isset($menuSales[$menuName])) {
                                $menuSales[$menuName] = 0;
                            }
        
                            $menuSales[$menuName] += $quantity;
                        }
                    }
                }
            }
        }

        // dd($menuSales);

        return Inertia::render('Admin/Admin', [
            'users' => $users,
            'loginuser' => $loginuser,
            'onlykasir' => $onlykasir,
            'menus' => $menus,
            'categories' => $categories,
            'uangHarian' => $uangHarian,
            'uangBulanan' => $uangBulanan,
            'uangTahunan' => $uangTahunan,
            'orderselesai' => $orderselesai,
            'menuSales' => $menuSales,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
{
    $validatedData = $request->validate([
        'categories_id' => 'required|integer',
        'nama' => 'required|string',
        'harga' => 'required|integer',
    ]);


    $category = Category::where('id', $validatedData['categories_id'])->first();

    if (!$category) {
        return redirect()->back()->with('error', 'Kategori tidak valid.');
    }

    Menu::create([
        'categories_id' => $category->id,
        'nama' => $validatedData['nama'],
        'harga' => $validatedData['harga'],
    ]);

    return redirect()->back()->with('success', 'Menu berhasil ditambahkan.');
}

public function createkategori(Request $request)
{
    $validatedData = $request->validate([
        'kategori' => 'required|string',
    ]);

    Category::create([
        'kategori' => $validatedData['kategori'],
    ]);

    return redirect()->back()->with('success', 'Kategori berhasil ditambahkan.');
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'first_name'  => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:'.User::class,
        'password' => 'required|min:1',
        'role' => 'required|string|in:kasir,admin'
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        event(new Registered($user));

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id, Request $request)
    {
        // Temukan menu berdasarkan ID
        $menu = Menu::findOrFail($id);

        // Validasi data yang diterima dari request
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'categories_id' => 'required|integer|exists:categories,id',
            'harga' => 'required|numeric',
        ]);

        // Update data menu berdasarkan data yang diterima dari request
        $menu->update($validatedData);

        // Beri respons berhasil
        return redirect()->back();

    }

    public function editKategori($id, Request $request)
    {
        // Temukan menu berdasarkan ID
        $kategori = Category::findOrFail($id);

        // Validasi data yang diterima dari request
        $validatedData = $request->validate([
            'kategori' => 'required|string|max:255',
        ]);

        // Update data menu berdasarkan data yang diterima dari request
        $kategori->update($validatedData);

        // Beri respons berhasil
        return redirect()->back();

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validasi request
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
        ]);

        // Temukan kasir berdasarkan ID
        $kasir = User::findOrFail($id);

        // Update data kasir dengan data baru dari request
        $kasir->update([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
        ]);

        // Redirect atau response sesuai kebutuhan aplikasi
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hapuskasir = User::findOrFail($id);

        $hapuskasir->delete();

        return redirect()->back();
    }

    public function destroyMenu($id)
    {
        $hapusmenu = Menu::findOrFail($id);

        $hapusmenu->delete();

        return redirect()->back();
    }

    public function destroyKategori($id)
    {
        $hapuskategori = Category::findOrFail($id);

        $hapuskategori->delete();

        return redirect()->back();
    }
}