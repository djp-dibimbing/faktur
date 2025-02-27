## DEVELOPMENT

Please run:

```
npm run start:dev
```

## ENVIRONMENT

```
MONGODB_URI=mongodb://localhost:27017/dibimbing
```

## DUMMY

### CONTROLLER (EXAMPLE)

[POST] http://localhost:3400/history
body-raw

```
{
  "action": "User menambah data lapor",
  "userId": "661231235543000",
  "status": "error",
  "params": "data 1"
}
```

[GET] http://localhost:3400/history
header

```
[{"key":"Authorization","value":"Bearer [token]"}]
```

[PUT] http://localhost:3400/history/[id]
header

```
[{"key":"Authorization","value":"Bearer [token]"}]
```

body-raw

```
{
  "action": "User menambah data lapor",
  "userId": "661231235543000",
  "status": "success",
  "params": "data 1"
}
```

[DELETE] http://localhost:3400/history/[id]
header

```
[{"key":"Authorization","value":"Bearer [token]"}]
```
