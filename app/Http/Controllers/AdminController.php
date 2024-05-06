<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Menu;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $onlykasir = User::where('role','kasir')->get();
        $menus = Menu::all();
        $categories = Category::all();

        return Inertia::render('Admin/Admin', [
            'users' => $users,
            'loginuser' => $loginuser,
            'onlykasir' => $onlykasir,
            'menus' => $menus,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'categories_id' => 'required|exists:categories,id',
            'nama' => 'required|string',
            'harga' => 'required|integer',
        ]);

        $menu = Menu::create([
            'categories_id' => $validatedData['categories_id'],
            'nama' => $validatedData['nama'],
            'harga' => $validatedData['harga'],
        ]);

        return redirect()->back();
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

        return redirect('/admin');
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        //
    }
}