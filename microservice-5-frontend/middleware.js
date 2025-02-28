import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;

  if (token) {
    // Jika ada token, lanjutkan ke URL yang diminta
    return NextResponse.next();
  } else {
    // Jika tidak ada token, arahkan ke halaman login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Konfigurasi matcher untuk menentukan rute yang akan menggunakan middleware ini
export const config = {
  matcher: '/dashboard/:path*', // Pastikan rute ini sesuai dengan rute yang Anda inginkan
}
