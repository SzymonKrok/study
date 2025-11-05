-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DIRECTOR', 'TEACHER', 'STUDENT', 'PARENT');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT_EXCUSED', 'ABSENT_UNEXCUSED', 'LATE', 'EXCUSED');

-- CreateEnum
CREATE TYPE "GradeType" AS ENUM ('PARTIAL', 'SEMESTER', 'FINAL', 'BEHAVIOR');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('SCHOOL_WIDE', 'CLASS', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "pesel" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "classId" TEXT,
    "studentNumber" TEXT NOT NULL,
    "enrollmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "title" TEXT,
    "pesel" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "employmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "pesel" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "profile" TEXT,
    "classTeacherId" TEXT,
    "schoolYear" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "building" TEXT,
    "capacity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "defaultWeight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "GradeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "GradeType" NOT NULL DEFAULT 'PARTIAL',
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "categoryId" TEXT,
    "description" TEXT,
    "comment" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "semester" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "lessonNumber" INTEGER NOT NULL,
    "classId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classroomId" TEXT,
    "schoolYear" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "studentId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT,
    "excusedBy" TEXT,
    "excusedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Homework" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "assignedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "attachmentUrl" TEXT,
    "maxPoints" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Homework_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeworkSubmission" (
    "id" TEXT NOT NULL,
    "homeworkId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3),
    "content" TEXT,
    "attachmentUrl" TEXT,
    "grade" DOUBLE PRECISION,
    "points" INTEGER,
    "feedback" TEXT,
    "gradedAt" TIMESTAMP(3),
    "isLate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HomeworkSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "EventType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isAllDay" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "classId" TEXT,
    "studentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentParent" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "relationship" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentParent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherSubject" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSubject" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "teacherId" TEXT,
    "hoursPerWeek" INTEGER NOT NULL DEFAULT 1,
    "schoolYear" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_pesel_key" ON "Student"("pesel");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentNumber_key" ON "Student"("studentNumber");

-- CreateIndex
CREATE INDEX "Student_classId_idx" ON "Student"("classId");

-- CreateIndex
CREATE INDEX "Student_lastName_firstName_idx" ON "Student"("lastName", "firstName");

-- CreateIndex
CREATE INDEX "Student_studentNumber_idx" ON "Student"("studentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_pesel_key" ON "Teacher"("pesel");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE INDEX "Teacher_lastName_firstName_idx" ON "Teacher"("lastName", "firstName");

-- CreateIndex
CREATE INDEX "Teacher_email_idx" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_pesel_key" ON "Parent"("pesel");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

-- CreateIndex
CREATE INDEX "Parent_lastName_firstName_idx" ON "Parent"("lastName", "firstName");

-- CreateIndex
CREATE INDEX "Parent_email_idx" ON "Parent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE INDEX "Class_name_idx" ON "Class"("name");

-- CreateIndex
CREATE INDEX "Class_schoolYear_idx" ON "Class"("schoolYear");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE INDEX "Subject_name_idx" ON "Subject"("name");

-- CreateIndex
CREATE INDEX "Subject_code_idx" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_number_key" ON "Classroom"("number");

-- CreateIndex
CREATE INDEX "Classroom_number_idx" ON "Classroom"("number");

-- CreateIndex
CREATE UNIQUE INDEX "GradeCategory_name_key" ON "GradeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GradeCategory_code_key" ON "GradeCategory"("code");

-- CreateIndex
CREATE INDEX "GradeCategory_name_idx" ON "GradeCategory"("name");

-- CreateIndex
CREATE INDEX "Grade_studentId_idx" ON "Grade"("studentId");

-- CreateIndex
CREATE INDEX "Grade_teacherId_idx" ON "Grade"("teacherId");

-- CreateIndex
CREATE INDEX "Grade_subjectId_idx" ON "Grade"("subjectId");

-- CreateIndex
CREATE INDEX "Grade_date_idx" ON "Grade"("date");

-- CreateIndex
CREATE INDEX "Grade_semester_idx" ON "Grade"("semester");

-- CreateIndex
CREATE INDEX "Schedule_classId_idx" ON "Schedule"("classId");

-- CreateIndex
CREATE INDEX "Schedule_teacherId_idx" ON "Schedule"("teacherId");

-- CreateIndex
CREATE INDEX "Schedule_dayOfWeek_idx" ON "Schedule"("dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_classId_dayOfWeek_lessonNumber_schoolYear_key" ON "Schedule"("classId", "dayOfWeek", "lessonNumber", "schoolYear");

-- CreateIndex
CREATE INDEX "Attendance_studentId_idx" ON "Attendance"("studentId");

-- CreateIndex
CREATE INDEX "Attendance_scheduleId_idx" ON "Attendance"("scheduleId");

-- CreateIndex
CREATE INDEX "Attendance_date_idx" ON "Attendance"("date");

-- CreateIndex
CREATE INDEX "Attendance_status_idx" ON "Attendance"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_scheduleId_date_key" ON "Attendance"("studentId", "scheduleId", "date");

-- CreateIndex
CREATE INDEX "Homework_classId_idx" ON "Homework"("classId");

-- CreateIndex
CREATE INDEX "Homework_subjectId_idx" ON "Homework"("subjectId");

-- CreateIndex
CREATE INDEX "Homework_teacherId_idx" ON "Homework"("teacherId");

-- CreateIndex
CREATE INDEX "Homework_dueDate_idx" ON "Homework"("dueDate");

-- CreateIndex
CREATE INDEX "HomeworkSubmission_homeworkId_idx" ON "HomeworkSubmission"("homeworkId");

-- CreateIndex
CREATE INDEX "HomeworkSubmission_studentId_idx" ON "HomeworkSubmission"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "HomeworkSubmission_homeworkId_studentId_key" ON "HomeworkSubmission"("homeworkId", "studentId");

-- CreateIndex
CREATE INDEX "Event_type_idx" ON "Event"("type");

-- CreateIndex
CREATE INDEX "Event_startDate_idx" ON "Event"("startDate");

-- CreateIndex
CREATE INDEX "Event_classId_idx" ON "Event"("classId");

-- CreateIndex
CREATE INDEX "Event_studentId_idx" ON "Event"("studentId");

-- CreateIndex
CREATE INDEX "StudentParent_studentId_idx" ON "StudentParent"("studentId");

-- CreateIndex
CREATE INDEX "StudentParent_parentId_idx" ON "StudentParent"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentParent_studentId_parentId_key" ON "StudentParent"("studentId", "parentId");

-- CreateIndex
CREATE INDEX "TeacherSubject_teacherId_idx" ON "TeacherSubject"("teacherId");

-- CreateIndex
CREATE INDEX "TeacherSubject_subjectId_idx" ON "TeacherSubject"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherSubject_teacherId_subjectId_key" ON "TeacherSubject"("teacherId", "subjectId");

-- CreateIndex
CREATE INDEX "ClassSubject_classId_idx" ON "ClassSubject"("classId");

-- CreateIndex
CREATE INDEX "ClassSubject_subjectId_idx" ON "ClassSubject"("subjectId");

-- CreateIndex
CREATE INDEX "ClassSubject_teacherId_idx" ON "ClassSubject"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassSubject_classId_subjectId_schoolYear_key" ON "ClassSubject"("classId", "subjectId", "schoolYear");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_classTeacherId_fkey" FOREIGN KEY ("classTeacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GradeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Homework" ADD CONSTRAINT "Homework_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Homework" ADD CONSTRAINT "Homework_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Homework" ADD CONSTRAINT "Homework_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeworkSubmission" ADD CONSTRAINT "HomeworkSubmission_homeworkId_fkey" FOREIGN KEY ("homeworkId") REFERENCES "Homework"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeworkSubmission" ADD CONSTRAINT "HomeworkSubmission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentParent" ADD CONSTRAINT "StudentParent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentParent" ADD CONSTRAINT "StudentParent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherSubject" ADD CONSTRAINT "TeacherSubject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherSubject" ADD CONSTRAINT "TeacherSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubject" ADD CONSTRAINT "ClassSubject_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubject" ADD CONSTRAINT "ClassSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
