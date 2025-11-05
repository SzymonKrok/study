# 📡 E-Dziennik API - Przykłady Użycia

Kompletna dokumentacja wszystkich endpointów z przykładami request/response.

## 🔗 Base URL

```
http://localhost:3001
```

## 📚 Swagger UI

Interaktywna dokumentacja: `http://localhost:3001/api/docs`

---

## 🔐 Authentication

### 1. Register (Rejestracja)

**Endpoint:** `POST /auth/register`

**Request:**
```json
{
  "username": "jan.kowalski",
  "email": "jan.kowalski@example.com",
  "password": "SecurePass123!",
  "role": "STUDENT"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "clxxx",
      "username": "jan.kowalski",
      "email": "jan.kowalski@example.com",
      "role": "STUDENT"
    }
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 2. Login

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "username": "jan.kowalski",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "clxxx",
      "username": "jan.kowalski",
      "email": "jan.kowalski@example.com",
      "role": "STUDENT"
    }
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 3. Refresh Token

**Endpoint:** `POST /auth/refresh`

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 4. Get Profile

**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx",
    "username": "jan.kowalski",
    "email": "jan.kowalski@example.com",
    "role": "STUDENT",
    "isActive": true,
    "lastLogin": "2025-11-05T12:00:00.000Z"
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

---

## 👨‍🎓 Students

### 1. Get All Students (Lista uczniów)

**Endpoint:** `GET /students?page=1&limit=20&classId=xxx&search=Kowalski`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` - numer strony (default: 1)
- `limit` - liczba wyników (default: 20)
- `classId` - filtruj po klasie (optional)
- `search` - szukaj po nazwisku (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "clxxx",
        "firstName": "Jan",
        "lastName": "Kowalski",
        "studentNumber": "2025001",
        "dateOfBirth": "2010-05-15T00:00:00.000Z",
        "phone": "123456789",
        "address": "ul. Główna 1",
        "pesel": "10051512345",
        "classId": "clxxx",
        "class": {
          "id": "clxxx",
          "name": "3A"
        },
        "user": {
          "id": "clxxx",
          "username": "jan.kowalski",
          "email": "jan.kowalski@example.com",
          "role": "STUDENT"
        }
      }
    ],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 2. Get Student by ID

**Endpoint:** `GET /students/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx",
    "firstName": "Jan",
    "lastName": "Kowalski",
    "studentNumber": "2025001",
    "class": {
      "id": "clxxx",
      "name": "3A",
      "classTeacher": {
        "id": "clxxx",
        "firstName": "Anna",
        "lastName": "Nowak",
        "title": "mgr"
      }
    },
    "parents": [
      {
        "parent": {
          "id": "clxxx",
          "firstName": "Maria",
          "lastName": "Kowalska",
          "phone": "987654321",
          "email": "maria.kowalska@example.com"
        }
      }
    ],
    "grades": [
      {
        "id": "clxxx",
        "value": 5,
        "weight": 3,
        "description": "Sprawdzian z matematyki",
        "date": "2025-11-01T00:00:00.000Z",
        "subject": {
          "name": "Matematyka"
        }
      }
    ]
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 3. Get Student Grades

**Endpoint:** `GET /students/:id/grades`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "value": 5,
      "weight": 3,
      "semester": 1,
      "type": "PARTIAL",
      "description": "Sprawdzian z matematyki",
      "date": "2025-11-01T00:00:00.000Z",
      "subject": {
        "name": "Matematyka"
      },
      "teacher": {
        "firstName": "Piotr",
        "lastName": "Wiśniewski",
        "title": "mgr"
      },
      "category": {
        "name": "Sprawdziany",
        "weight": 5
      }
    }
  ],
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 4. Get Student Attendance

**Endpoint:** `GET /students/:id/attendance`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "status": "PRESENT",
      "date": "2025-11-05T00:00:00.000Z",
      "notes": null,
      "schedule": {
        "subject": {
          "name": "Matematyka"
        },
        "teacher": {
          "firstName": "Piotr",
          "lastName": "Wiśniewski"
        }
      }
    }
  ],
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

---

## 👨‍🏫 Teachers

### 1. Get All Teachers

**Endpoint:** `GET /teachers?page=1&limit=20`

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "clxxx",
        "firstName": "Anna",
        "lastName": "Nowak",
        "title": "mgr",
        "phone": "111222333",
        "email": "anna.nowak@school.com",
        "isDirector": false,
        "subjects": [
          {
            "subject": {
              "name": "Język Polski"
            }
          }
        ],
        "classTeacher": [
          {
            "id": "clxxx",
            "name": "3A"
          }
        ]
      }
    ],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "totalPages": 1
    }
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

---

## 🏫 Classes

### 1. Get All Classes

**Endpoint:** `GET /classes`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "name": "3A",
      "level": 3,
      "profile": "matematyczno-fizyczny",
      "schoolYear": "2024/2025",
      "classTeacher": {
        "id": "clxxx",
        "firstName": "Anna",
        "lastName": "Nowak",
        "title": "mgr"
      },
      "_count": {
        "students": 28
      }
    }
  ],
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 2. Get Class by ID (z uczniami)

**Endpoint:** `GET /classes/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx",
    "name": "3A",
    "level": 3,
    "profile": "matematyczno-fizyczny",
    "classTeacher": {
      "firstName": "Anna",
      "lastName": "Nowak"
    },
    "students": [
      {
        "id": "clxxx",
        "firstName": "Jan",
        "lastName": "Kowalski",
        "studentNumber": "2025001",
        "user": {
          "email": "jan.kowalski@example.com",
          "username": "jan.kowalski"
        }
      }
    ],
    "subjects": [
      {
        "subject": {
          "name": "Matematyka",
          "code": "MAT"
        }
      }
    ]
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

---

## 📊 Grades

### 1. Create Grade (TEACHER, ADMIN)

**Endpoint:** `POST /grades`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "value": 5,
  "weight": 3,
  "semester": 1,
  "type": "PARTIAL",
  "studentId": "clxxx",
  "subjectId": "clxxx",
  "categoryId": "clxxx",
  "description": "Sprawdzian z równań kwadratowych"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx",
    "value": 5,
    "weight": 3,
    "semester": 1,
    "type": "PARTIAL",
    "date": "2025-11-05T00:00:00.000Z",
    "description": "Sprawdzian z równań kwadratowych",
    "student": {
      "firstName": "Jan",
      "lastName": "Kowalski"
    },
    "subject": {
      "name": "Matematyka"
    },
    "category": {
      "name": "Sprawdziany"
    }
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 2. Get All Grades (z filtrowaniem)

**Endpoint:** `GET /grades?studentId=xxx&subjectId=xxx`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "value": 5,
      "weight": 3,
      "semester": 1,
      "type": "PARTIAL",
      "date": "2025-11-05T00:00:00.000Z",
      "description": "Sprawdzian",
      "student": {
        "firstName": "Jan",
        "lastName": "Kowalski"
      },
      "subject": {
        "name": "Matematyka"
      },
      "teacher": {
        "firstName": "Piotr",
        "lastName": "Wiśniewski",
        "title": "mgr"
      },
      "category": {
        "name": "Sprawdziany"
      }
    }
  ],
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

---

## ✅ Attendance

### 1. Create Attendance (TEACHER, ADMIN)

**Endpoint:** `POST /attendance`

**Request:**
```json
{
  "status": "PRESENT",
  "date": "2025-11-05",
  "studentId": "clxxx",
  "scheduleId": "clxxx",
  "notes": null
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx",
    "status": "PRESENT",
    "date": "2025-11-05T00:00:00.000Z",
    "notes": null,
    "student": {
      "firstName": "Jan",
      "lastName": "Kowalski"
    },
    "schedule": {
      "subject": {
        "name": "Matematyka"
      }
    }
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 2. Get Attendance Stats

**Endpoint:** `GET /attendance/stats/:studentId`

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 100,
    "present": 92,
    "absent": 5,
    "late": 3,
    "attendanceRate": "92.00%"
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

---

## 📅 Schedule

### 1. Get Schedule

**Endpoint:** `GET /schedule?classId=xxx`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "dayOfWeek": "MONDAY",
      "startTime": "08:00:00",
      "endTime": "08:45:00",
      "subject": {
        "name": "Matematyka",
        "code": "MAT"
      },
      "teacher": {
        "firstName": "Piotr",
        "lastName": "Wiśniewski",
        "title": "mgr"
      },
      "classroom": {
        "number": "101",
        "building": "A"
      },
      "class": {
        "name": "3A"
      }
    }
  ],
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

---

## 📆 Events

### 1. Get All Events

**Endpoint:** `GET /events?type=SCHOOL_WIDE`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "title": "Dzień Sportu",
      "description": "Ogólnoszkolny Dzień Sportu i Rekreacji",
      "type": "SCHOOL_WIDE",
      "startDate": "2025-11-20T08:00:00.000Z",
      "endDate": "2025-11-20T15:00:00.000Z",
      "isAllDay": false,
      "location": "Sala gimnastyczna",
      "class": null,
      "student": null
    }
  ],
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 2. Get Upcoming Events

**Endpoint:** `GET /events/upcoming`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "title": "Zebranie rodzicielskie",
      "description": null,
      "type": "CLASS",
      "startDate": "2025-11-15T18:00:00.000Z",
      "endDate": "2025-11-15T20:00:00.000Z",
      "class": {
        "name": "3A"
      }
    }
  ],
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

---

## 📝 Homework

### 1. Create Homework (TEACHER, ADMIN)

**Endpoint:** `POST /homework`

**Request:**
```json
{
  "title": "Zadania z matematyki",
  "description": "Rozwiązać zadania 1-10 ze str. 45",
  "dueDate": "2025-11-12",
  "classId": "clxxx",
  "subjectId": "clxxx",
  "attachmentUrl": null
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx",
    "title": "Zadania z matematyki",
    "description": "Rozwiązać zadania 1-10 ze str. 45",
    "dueDate": "2025-11-12T00:00:00.000Z",
    "class": {
      "name": "3A"
    },
    "subject": {
      "name": "Matematyka"
    },
    "teacher": {
      "firstName": "Piotr",
      "lastName": "Wiśniewski",
      "title": "mgr"
    }
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 2. Submit Homework (STUDENT)

**Endpoint:** `POST /homework/:id/submit`

**Content-Type:** `multipart/form-data`

**Form Data:**
```
content: "Rozwiązanie zadań..."
file: [plik.pdf]
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx",
    "submittedAt": "2025-11-05T12:00:00.000Z",
    "content": "Rozwiązanie zadań...",
    "attachmentUrl": "/uploads/1699191234567-plik.pdf",
    "homework": {
      "title": "Zadania z matematyki"
    },
    "student": {
      "firstName": "Jan",
      "lastName": "Kowalski"
    }
  },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

### 3. Get Homework Submissions (TEACHER, ADMIN)

**Endpoint:** `GET /homework/:id/submissions`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "submittedAt": "2025-11-05T12:00:00.000Z",
      "content": "Rozwiązanie...",
      "attachmentUrl": "/uploads/file.pdf",
      "grade": null,
      "points": null,
      "feedback": null,
      "student": {
        "firstName": "Jan",
        "lastName": "Kowalski"
      }
    }
  ],
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "timestamp": "2025-11-05T12:00:00.000Z",
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "BadRequestException"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "timestamp": "2025-11-05T12:00:00.000Z",
  "message": ["Unauthorized"],
  "error": "UnauthorizedException"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "timestamp": "2025-11-05T12:00:00.000Z",
  "message": ["You can only access your own data"],
  "error": "ForbiddenException"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "timestamp": "2025-11-05T12:00:00.000Z",
  "message": ["Student not found"],
  "error": "NotFoundException"
}
```

---

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get Students (with auth)
```bash
curl -X GET "http://localhost:3001/students?page=1&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Grade
```bash
curl -X POST http://localhost:3001/grades \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "value": 5,
    "weight": 3,
    "semester": 1,
    "type": "PARTIAL",
    "studentId": "clxxx",
    "subjectId": "clxxx",
    "description": "Sprawdzian"
  }'
```

---

## 📌 Notes

- Wszystkie endpointy (oprócz `/auth/login` i `/auth/register`) wymagają JWT token w headerze
- Role-based access jest automatycznie sprawdzany
- Soft delete - usunięte rekordy nie są fizycznie usuwane
- Paginacja jest dostępna dla list
- Filtry można łączyć (np. `?page=1&limit=10&classId=xxx&search=Kowalski`)

---

**Happy Coding! 🚀**

