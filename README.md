# LaBooking

LaBooking adalah sebuah aplikasi web untuk manajemen penjadwalan penggunaan laboratorium komputer bagi Program Studi Pendidikan Teknologi Informasi.

## Link : https://labooking.vercel.app/

## Teknologi yang Digunakan

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- body-parser
- cors
- dotenv
- Express
- jsonwebtoken
- mongodb

### Database
- MongoDB Atlas Cloud


## Fitur dan Tupoksi

### Frontend

#### UI (Html,CSS)
- Login Page --> Khoirunnisa Stiani
![Login Page](./UI/login%20page.png)

- Signup Page --> Khoirunnisa Stiani
![Signup Page](./UI/signup%20page.png)

- Home Page (Index) --> Fransiska Heni
![Home Page 1](./UI/home%20page.png)
![Home Page 3](./UI/home%20page%20day%20view.png)

- Booking Page (Form Booking) --> Fransiska Heni
![Booking Page](./UI/booking%20page.png)

- Admin Page (Admin Dashboard) --> Hadi Rama Wijaya
![Admin Page](./UI/admin%20page.png)

#### Function Logic (JavaScript)
- Login --> Pinky Eka
- Signup --> Pinky Eka
- Logout --> Joe Fendika
- Setup Calendar dan fetch data jadwal dari api --> I Gede Yogi
- booking --> Joe Fendika
- Admin page fetch bookingan dari api dan render --> I Gede Yogi


### Backend
### API link: https://api-labooking.vercel.app/
- Setup Database dan Koneksi --> Lutfi Nur Rohman
- autentikasi dan verifikasi admin --> Lutfi Nur Rohman
- get /schedules (data jadwal) --> Hadi Rama Wijaya
- post /signup --> Lutfi Nur Rohman
- post /login --> Lutfi Nur Rohman
- post /booking --> Lutfi Nur Rohman
- get /admin (data request bookingan) --> Lutfi Nur Rohman
- put /request-action (hapus/approve requestan) --> Lutfi Nur Rohman
