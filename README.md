# Web Pendaftaran Semester Pendek

## Configurasi Project

1. **Clone repo**

   ```bash
   git clone https://github.com/Habiboys/Web-Pendaftaran-Semester-Pendek
   ```

2. **Cd ke folder project**

   ```bash
   cd Web-Pendaftaran-Semester-Pendek
   ```

3. **Install semua depedensi yang diperlukan**

   ```bash
   npm install
   ```

4. **Hidupkan MySQL XAMPP dan buat database & setting koneksi db pada config/config.json**

   ```bash
   "development": {
    "username": "root",
    "password": null,
    "database": "daftarsp",
    "host": "localhost",
    "dialect": "mysql"
   }
   ```

5. **Lakukan migrasi tabel dari express ke database**

   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Jalankan seeder untuk mengirim data ke database**

   ```bash
   npx sequelize-cli db:seed:all
   ```

7. **Jalankan Express dan tailwind di 2 terminal berbeda dengan perintah**

   ```bash
   npm run dev # untuk menjalankan express
   npm run tail # untuk menjalankan tailwind
   ```

8. **Untuk push perubahan silahkan buatlah branch baru terlebih dahulu**

   ```bash
   git branch (namaBranch)//buat branch baru
   git checkout namaBranch
   git add .
   git commit -m "pesan"
   git push -u origin namaBranch
   ```
