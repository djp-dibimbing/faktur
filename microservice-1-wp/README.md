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
FRONTEND_URL=http://localhost:3500

new env:
DATABASE_TYPE=mssql
DATABASE_HOST=localhost
DATABASE_PORT=1434
DATABASE_USER=sa
DATABASE_PASSWORD=Admin@2025!
DATABASE_NAME=fakturdb
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=fakturdb
JWT_SECRET=mysecretkey
JWT_EXPIRES_IN=1d

...

## DUMMY

### CONTROLLER (EXAMPLE)

[POST] http://localhost:3100/wp/register
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

[GET] http://localhost:3100/wp/profile
header

```
[{"key":"Authorization","value":"Bearer [token]"}]
```

params

```
npwp:661231235543000
```

[POST] http://localhost:3100/auth/login
body-raw

```
{
    "npwp": "661231235543000",
    "password": "1234r6"
}
```
