<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class checkRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
        public function handle(Request $request, Closure $next)
        {
            if (auth()->check() && auth()->user()->role === 'kasir') {
                return redirect()->back()->with('error', 'Anda tidak memiliki izin untuk mengakses halaman ini.');
            }
    
            return $next($request);
        }
}
