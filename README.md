# REST API Shop

#### REST API Shop

## Used technology

- Node.js/Express
- PostgreSQL
- sequelize
- cors
- express-fileupload
- dotenv
- jsonwebtoken
- JWT auth
- uuid
- bcrypt
- Class ApiError

## Opportunities

- JWT authorization
- authorization, registration, logout user
- Create and get the brands of items
- Create and get the types of items
- Get all, get by id, create new item in shop
- Save img-logo devices

## Guide how to use

| ApiKey User                 | Descriptions                                                                |
| --------------------------- | --------------------------------------------------------------------------- |
| GET /api/user/auth          | Create jwt tokens                                                           |
| POST /api/user/registration | Create new user, req.body - {email, password, role}, response new jwt token |
| POST /api/user/login        | login user in account, req.body - {email, password}, response new jwt token |

| ApiKey Type     | Descriptions                                                                 |
| --------------- | ---------------------------------------------------------------------------- |
| GET /api/type/  | Get all types                                                                |
| POST /api/type/ | ONLY for ADMIN role, create new type, req.body - { name }, response new type |

| ApiKey Device    | Descriptions                                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| GET /api/type/   | Get all devices                                                                                                        |
| GET /api/type/id | Get device by id                                                                                                       |
| POST /api/type/  | create new device in shop, req.body - { name, price, brandId, typeId, info,}, req.files - { img }, response new device |

| ApiKey Brand    | Descriptions                                                                 |
| --------------- | ---------------------------------------------------------------------------- |
| GET /api/type/  | Get all brands                                                               |
| POST /api/type/ | ONLY for ADMIN role, create new brand, req.body - { name ) response new type |

App use PostgreSQL DBMS
