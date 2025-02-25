## DEVELOPMENT

Please run:

```
npm run start:dev
```

## ENVIRONMENT

```
PORT=3100
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=db_faktur
JWT_SECRET=kelompok_faktur
JWT_EXPIRES_IN=1d
```

## DUMMY

### URI

http://localhost:3100/wp/register
body-raw

```
{
    "npwp": "661231235543000",
    "email": "timor.x@gmail.com",
    "nama": "Timor Bayu Saktiawan",
    "tempatlahir": "Ermera",
    "tanggallahir": "1988-10-01",
    "bentuk": "OP",
    "alamat": "Tangerang",
    "kontak": "081311253777",
    "jenisusaha": "pegawai negeri",
    "kpp": "KPP Pratama Bantul",
    "password": "1234r6"
}
```
