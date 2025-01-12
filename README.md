## Specification

Berikut adalah spesifikasi minimum yang diperlukan untuk menjalankan aplikasi ini:

- **Composer**: versi `2.7.9`
- **PHP**: versi `8.3.15`
- **Node.js**: versi `v22.12.0`
- **NPM**: versi `10.9.0`

Pastikan semua dependensi telah diinstal sesuai spesifikasi di atas sebelum melanjutkan instalasi.

## Installation

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan aplikasi:

1. **Clone repository**  
   Pastikan Anda sudah meng-clone repository ini ke dalam folder lokal menggunakan:
   ```bash
   git https://github.com/Nofri26/ims-finance.git
   cd ims-finance
   ```
2. **Install PHP dependencies**  
   Jalankan perintah berikut untuk menginstal semua dependensi PHP yang dibutuhkan:
   ```bash
    composer install
   ```
3. **Install JavaScript dependencies**  
   Jalankan perintah berikut untuk menginstal semua dependensi Node.js yang dibutuhkan:
   ```bash
    npm install
   ```
4. **Setup database**
   ```bash
   cp .env.example .env
   ```
5. **Jalankan Migration dan Seeder**  
   Jalankan migrasi untuk membuat tabel-tabel database:
   ```bash
   php artisan migrate --seed
    ```
6. **Run the application**  
   Jalankan perintah berikut untuk memulai server lokal:
   ```bash
   composer run dev
    ```
Akses aplikasi pada Browser http://127.0.0.1:8000/
