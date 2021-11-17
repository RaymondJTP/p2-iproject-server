# Finde Me App Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /rooms`
- `POST /rooms`
- `POST /rooms/:id`
- `DELETE /rooms/:id`
- `GET /rooms/room/:id`
- `DELETE /rooms/room/:id`
- `PUT /updatelocation`





&nbsp;

## 1. POST /register

Description : Register user account

Request:


_Response (200 - OK)_

```json
{
    "status": "online",
    "id": 23,
    "username": "bel",
    "email": "bel@mail.com",
    "password": "$2a$10$bpl6EgVbVnbYK3SFiNa3/OM82tXTZxtD6ltWqr.yPnWyQCbWwCkWu",
    "address": "fafa",
    "phoneNumber": "525235",
    "updatedAt": "2021-11-17T20:22:35.988Z",
    "createdAt": "2021-11-17T20:22:35.988Z",
    "longitude": null,
    "latitude": null
}

```

_Response (400 - Bad Request)_

```json
{
  "message" : "Email cant be empty"
},
{
  "message" : "Email has been registered"
},
{
  "message" : "Password cant be empty"
}
```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid Server error"
}
```
&nbsp;


## 2. POST /login

Description : Login user

Request:


_Response (200 - OK)_

```json
{
  "email": "string",
  "password": "string",
}

```

_Response (401 - Unauthorized)_

```json
{
  "message": "Email/password Invalid"
}
```

_Response (403 - Unauthorized)_

```json
{
  "message" : "You dont have authorized"

```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid Server error"
}
```

&nbsp;


## 3. GET /rooms

Description : Get All Rooms from database


_Response (200 - OK)_

```json
[
  {
        "id": 1,
        "name": "Group Alumni TK/SD Cikajang 1996",
        "member": 50,
        "passwordRoom": "cikajangraya",
        "UserId": 1,
        "createdAt": "2021-11-16T07:10:11.754Z",
        "updatedAt": "2021-11-16T07:10:11.754Z"
    },
    {
        "id": 2,
        "name": "Arisan Kelurahan Cikaso Utara",
        "member": 30,
        "passwordRoom": "cikaso",
        "UserId": 2,
        "createdAt": "2021-11-16T07:10:11.754Z",
        "updatedAt": "2021-11-16T07:10:11.754Z"
    }
  ...,
]

```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid server error"
}
```


&nbsp;

## 4. POST /rooms
Description : Create new room

Request:
- req.body
```json
{
  "name": "string",
  "member": "integer",
  "passwordRoom": "string"

}
```

```json
{
    "name": "string",
    "member": "integer",
    "passwordRoom": "string",
    "createdAt": "2021-11-16T07:10:11.754Z",
    "updatedAt": "2021-11-16T07:10:11.754Z"
}
```

_Response (201 - Created)_

```json
{
    "id": 13,
    "name": "Dago Squad",
    "member": 30,
    "passwordRoom": "$2a$10$1muL6UOoc1S3YFex9G9eBORxIIwobMxu91I9ifT6VUiyEZvBuYS3a",
    "UserId": 20,
    "updatedAt": "2021-11-17T20:32:57.547Z",
    "createdAt": "2021-11-17T20:32:57.547Z"
}
```

_Response (400 - Validation Error)_

```json
{
  "message": "Room name cant be empty"
}
OR
{
  "message": "Total Member cant be empty"
}
OR
{
  "message": "Password Room cant below 10000"
}
OR
{
  "message": "Please input your password"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid server error"
}
```

&nbsp;

## 5. POST /rooms/:id

Description : Join into room

Request:
- req.user.id:
```json
{
  "id": "integer"
}
```

- req.body:
```json
{
  "passwordRoom": "string"
}
```


_Response (201 - OK)_

```json
{
    "result": {
        "id": 57,
        "UserId": 20,
        "RoomId": 9,
        "createdAt": "2021-11-17T15:59:08.967Z",
        "updatedAt": "2021-11-17T15:59:08.967Z"
    },
    "message": "You enter this room"
}

```
_Response (401 - Unauthorized)_

```json
{
  "message": "You cant join this room"
},
{
  "message": "Invalid token"
}
```
_Response (404 - Unauthorized)_

```json
{
  "message": "Room not found"
}
```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid"
}
```

&nbsp;

## 6. DELETE /rooms/:id

Description:
- Delete room by id

Request:

- params id:

```json
{
  "RoomId": "integer (required)"
}
```

- user id:

```json
{
  "RoomId": "integer (required)"
}
```


_Response (200 - OK)_

```json
{
  "message": "Succss deleted room"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Room not found"
}
```

_Response (500 - Not Found)_

```json
{
  "message": "Internal server error"
}
```

## 7. GET /rooms/room/:id

Description : Get All UserRoom from database

Request:

- params id:

```json
{
  "RoomId": "integer (required)"
}
```

- user id:

```json
{
  "RoomId": "integer (required)"
}
```


_Response (200 - OK)_

```json
[
    {
        "id": 11,
        "UserId": 7,
        "RoomId": 9,
        "createdAt": "2021-11-16T20:20:53.758Z",
        "updatedAt": "2021-11-16T20:20:53.758Z",
        "User": {
            "id": 7,
            "username": null,
            "email": "aldi@mail.com",
            "password": "$2a$10$e/Z0ZVkvV2kOHAixMi35VuxhBVTdsmabp2FRAObCHbLHdqUQKd2uS",
            "address": null,
            "phoneNumber": null,
            "status": null,
            "longitude": "107.57172174011913",
            "latitude": "-6.594095406004892",
            "createdAt": "2021-11-16T10:13:14.449Z",
            "updatedAt": "2021-11-16T10:57:03.264Z"
        },
    }
]

```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not found)_

```json
{
  "message": "Room not found"
}
```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid server error"
}
```

&nbsp;

## 8. DELETE /rooms/room/:id

Description:
- Leave room

Request:

- params id:

```json
{
  "RoomId": "integer (required)"
}
```

- user id:

```json
{
  "UserId": "integer (required)"
}
```


_Response (200 - OK)_

```json
{
  "message": "Success Leave Room"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```


_Response (404 - Not Found)_

```json
{
  "message": "Room not found"
}
```

_Response (500 - Not Found)_

```json
{
  "message": "Internal server error"
}
```

## 9. PUT /updatelocation

Description:
- Update location of UserRoom

Request:

- params id:

```json
{
  "RoomId": "integer (required)"
}
```
- user id:

```json
{
  "UserId": "integer (required)"
}
```




_Response (200 - OK)_

```json
{
  "message": "Success Update"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```


_Response (404 - Not Found)_

```json
{
  "message": "Room not found"
}
```

_Response (500 - Not Found)_

```json
{
  "message": "Internal server error"
}
```
