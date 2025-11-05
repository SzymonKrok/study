import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Wszystkie użytkownicy będą mieli hasło: "password123"
  const hashedPassword = await bcrypt.hash('password123', 10)

  // ============================================================================
  // 1. ADMIN
  // ============================================================================
  console.log('👤 Creating Admin...')
  
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@szkola.pl',
      password: hashedPassword,
      role: 'ADMIN',
      admin: {
        create: {
          firstName: 'Jan',
          lastName: 'Kowalski',
          email: 'admin@szkola.pl',
          phone: '+48 123 456 789',
        },
      },
    },
  })

  // ============================================================================
  // 2. PRZEDMIOTY
  // ============================================================================
  console.log('📚 Creating Subjects...')
  
  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: 'Matematyka', code: 'MAT' } }),
    prisma.subject.create({ data: { name: 'Język polski', code: 'POL' } }),
    prisma.subject.create({ data: { name: 'Język angielski', code: 'ANG' } }),
    prisma.subject.create({ data: { name: 'Historia', code: 'HIS' } }),
    prisma.subject.create({ data: { name: 'Biologia', code: 'BIO' } }),
    prisma.subject.create({ data: { name: 'Chemia', code: 'CHE' } }),
    prisma.subject.create({ data: { name: 'Fizyka', code: 'FIZ' } }),
    prisma.subject.create({ data: { name: 'Geografia', code: 'GEO' } }),
    prisma.subject.create({ data: { name: 'Informatyka', code: 'INF' } }),
    prisma.subject.create({ data: { name: 'Wychowanie fizyczne', code: 'WF' } }),
  ])

  // ============================================================================
  // 3. KATEGORIE OCEN
  // ============================================================================
  console.log('📝 Creating Grade Categories...')
  
  const categories = await Promise.all([
    prisma.gradeCategory.create({
      data: { name: 'Sprawdzian', code: 'SPR', defaultWeight: 3, color: '#EF4444' },
    }),
    prisma.gradeCategory.create({
      data: { name: 'Kartkówka', code: 'KART', defaultWeight: 1.5, color: '#F59E0B' },
    }),
    prisma.gradeCategory.create({
      data: { name: 'Odpowiedź ustna', code: 'UST', defaultWeight: 1, color: '#10B981' },
    }),
    prisma.gradeCategory.create({
      data: { name: 'Praca domowa', code: 'PD', defaultWeight: 0.5, color: '#3B82F6' },
    }),
    prisma.gradeCategory.create({
      data: { name: 'Projekt', code: 'PROJ', defaultWeight: 2, color: '#8B5CF6' },
    }),
  ])

  // ============================================================================
  // 4. SALE
  // ============================================================================
  console.log('🏫 Creating Classrooms...')
  
  const classrooms = await Promise.all([
    prisma.classroom.create({ data: { number: '101', building: 'Budynek A', capacity: 30 } }),
    prisma.classroom.create({ data: { number: '102', building: 'Budynek A', capacity: 30 } }),
    prisma.classroom.create({ data: { number: '103', building: 'Budynek A', capacity: 30 } }),
    prisma.classroom.create({ data: { number: '201', building: 'Budynek B', capacity: 25 } }),
    prisma.classroom.create({ data: { number: '202', building: 'Budynek B', capacity: 25 } }),
    prisma.classroom.create({ data: { number: 'Sala gimnastyczna', building: 'Budynek C', capacity: 50 } }),
  ])

  // ============================================================================
  // 5. NAUCZYCIELE
  // ============================================================================
  console.log('👨‍🏫 Creating Teachers...')
  
  // Dyrektor (nauczyciel matematyki)
  const directorUser = await prisma.user.create({
    data: {
      username: 'dyrektor',
      email: 'dyrektor@szkola.pl',
      password: hashedPassword,
      role: 'TEACHER',
      teacher: {
        create: {
          firstName: 'Maria',
          lastName: 'Nowak',
          title: 'dr',
          email: 'dyrektor@szkola.pl',
          phone: '+48 123 456 790',
          isDirector: true, // 👑 DYREKTOR
          employmentDate: new Date('2010-09-01'),
        },
      },
    },
    include: { teacher: true },
  })

  // Pozostali nauczyciele
  const teacher1User = await prisma.user.create({
    data: {
      username: 'akowalska',
      email: 'a.kowalska@szkola.pl',
      password: hashedPassword,
      role: 'TEACHER',
      teacher: {
        create: {
          firstName: 'Anna',
          lastName: 'Kowalska',
          title: 'mgr',
          email: 'a.kowalska@szkola.pl',
          phone: '+48 123 456 791',
          employmentDate: new Date('2015-09-01'),
        },
      },
    },
    include: { teacher: true },
  })

  const teacher2User = await prisma.user.create({
    data: {
      username: 'jnowak',
      email: 'j.nowak@szkola.pl',
      password: hashedPassword,
      role: 'TEACHER',
      teacher: {
        create: {
          firstName: 'Jan',
          lastName: 'Nowak',
          title: 'mgr',
          email: 'j.nowak@szkola.pl',
          phone: '+48 123 456 792',
          employmentDate: new Date('2016-09-01'),
        },
      },
    },
    include: { teacher: true },
  })

  const teacher3User = await prisma.user.create({
    data: {
      username: 'mwisniewska',
      email: 'm.wisniewska@szkola.pl',
      password: hashedPassword,
      role: 'TEACHER',
      teacher: {
        create: {
          firstName: 'Maria',
          lastName: 'Wiśniewska',
          title: 'mgr',
          email: 'm.wisniewska@szkola.pl',
          phone: '+48 123 456 793',
          employmentDate: new Date('2017-09-01'),
        },
      },
    },
    include: { teacher: true },
  })

  const teacher4User = await prisma.user.create({
    data: {
      username: 'plewandowski',
      email: 'p.lewandowski@szkola.pl',
      password: hashedPassword,
      role: 'TEACHER',
      teacher: {
        create: {
          firstName: 'Piotr',
          lastName: 'Lewandowski',
          title: 'dr',
          email: 'p.lewandowski@szkola.pl',
          phone: '+48 123 456 794',
          employmentDate: new Date('2012-09-01'),
        },
      },
    },
    include: { teacher: true },
  })

  // Przypisz nauczycieli do przedmiotów
  await Promise.all([
    prisma.teacherSubject.create({
      data: { teacherId: directorUser.teacher!.id, subjectId: subjects[0].id }, // Matematyka
    }),
    prisma.teacherSubject.create({
      data: { teacherId: teacher1User.teacher!.id, subjectId: subjects[1].id }, // Polski
    }),
    prisma.teacherSubject.create({
      data: { teacherId: teacher2User.teacher!.id, subjectId: subjects[2].id }, // Angielski
    }),
    prisma.teacherSubject.create({
      data: { teacherId: teacher3User.teacher!.id, subjectId: subjects[3].id }, // Historia
    }),
    prisma.teacherSubject.create({
      data: { teacherId: teacher4User.teacher!.id, subjectId: subjects[4].id }, // Biologia
    }),
    prisma.teacherSubject.create({
      data: { teacherId: teacher4User.teacher!.id, subjectId: subjects[5].id }, // Chemia
    }),
  ])

  // ============================================================================
  // 6. KLASY
  // ============================================================================
  console.log('🎓 Creating Classes...')
  
  const class3A = await prisma.class.create({
    data: {
      name: '3A',
      level: 3,
      profile: 'Matematyczny',
      schoolYear: '2024/2025',
      classTeacherId: directorUser.teacher!.id, // Dyrektor jako wychowawca
    },
  })

  const class3B = await prisma.class.create({
    data: {
      name: '3B',
      level: 3,
      profile: 'Humanistyczny',
      schoolYear: '2024/2025',
      classTeacherId: teacher1User.teacher!.id,
    },
  })

  const class2A = await prisma.class.create({
    data: {
      name: '2A',
      level: 2,
      schoolYear: '2024/2025',
      classTeacherId: teacher2User.teacher!.id,
    },
  })

  // Przypisz przedmioty do klas
  await Promise.all([
    // Klasa 3A
    prisma.classSubject.create({
      data: {
        classId: class3A.id,
        subjectId: subjects[0].id, // Matematyka
        teacherId: directorUser.teacher!.id,
        hoursPerWeek: 5,
        schoolYear: '2024/2025',
      },
    }),
    prisma.classSubject.create({
      data: {
        classId: class3A.id,
        subjectId: subjects[1].id, // Polski
        teacherId: teacher1User.teacher!.id,
        hoursPerWeek: 4,
        schoolYear: '2024/2025',
      },
    }),
    prisma.classSubject.create({
      data: {
        classId: class3A.id,
        subjectId: subjects[2].id, // Angielski
        teacherId: teacher2User.teacher!.id,
        hoursPerWeek: 3,
        schoolYear: '2024/2025',
      },
    }),
  ])

  // ============================================================================
  // 7. UCZNIOWIE
  // ============================================================================
  console.log('👨‍🎓 Creating Students...')
  
  const students = []
  const studentNames = [
    { firstName: 'Anna', lastName: 'Kowalska', classId: class3A.id },
    { firstName: 'Jan', lastName: 'Nowak', classId: class3A.id },
    { firstName: 'Maria', lastName: 'Wiśniewska', classId: class3B.id },
    { firstName: 'Piotr', lastName: 'Lewandowski', classId: class2A.id },
    { firstName: 'Katarzyna', lastName: 'Zielińska', classId: class2A.id },
    { firstName: 'Tomasz', lastName: 'Dąbrowski', classId: class3A.id },
    { firstName: 'Agnieszka', lastName: 'Kamińska', classId: class3A.id },
    { firstName: 'Michał', lastName: 'Wójcik', classId: class3B.id },
  ]

  for (let i = 0; i < studentNames.length; i++) {
    const { firstName, lastName, classId } = studentNames[i]
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}`
    const email = `${username}@student.szkola.pl`

    const studentUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'STUDENT',
        student: {
          create: {
            firstName,
            lastName,
            studentNumber: `2024${String(i + 1).padStart(3, '0')}`,
            dateOfBirth: new Date(2008, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            phone: `+48 ${600 + i * 10} ${100 + i * 5} ${200 + i * 3}`,
            classId,
          },
        },
      },
      include: { student: true },
    })

    students.push(studentUser.student!)
  }

  // ============================================================================
  // 8. RODZICE
  // ============================================================================
  console.log('👪 Creating Parents...')
  
  // Rodzice dla pierwszych 4 uczniów
  for (let i = 0; i < 4; i++) {
    const student = students[i]
    
    // Matka
    const motherUser = await prisma.user.create({
      data: {
        username: `${student.lastName.toLowerCase()}.mother${i}`,
        email: `${student.lastName.toLowerCase()}.matka@gmail.com`,
        password: hashedPassword,
        role: 'PARENT',
        parent: {
          create: {
            firstName: 'Matka',
            lastName: student.lastName,
            email: `${student.lastName.toLowerCase()}.matka@gmail.com`,
            phone: `+48 ${700 + i * 10} ${100 + i * 5} ${200 + i * 3}`,
          },
        },
      },
      include: { parent: true },
    })

    await prisma.studentParent.create({
      data: {
        studentId: student.id,
        parentId: motherUser.parent!.id,
        relationship: 'matka',
      },
    })

    // Ojciec
    const fatherUser = await prisma.user.create({
      data: {
        username: `${student.lastName.toLowerCase()}.father${i}`,
        email: `${student.lastName.toLowerCase()}.ojciec@gmail.com`,
        password: hashedPassword,
        role: 'PARENT',
        parent: {
          create: {
            firstName: 'Ojciec',
            lastName: student.lastName,
            email: `${student.lastName.toLowerCase()}.ojciec@gmail.com`,
            phone: `+48 ${800 + i * 10} ${100 + i * 5} ${200 + i * 3}`,
          },
        },
      },
      include: { parent: true },
    })

    await prisma.studentParent.create({
      data: {
        studentId: student.id,
        parentId: fatherUser.parent!.id,
        relationship: 'ojciec',
      },
    })
  }

  // ============================================================================
  // 9. OCENY
  // ============================================================================
  console.log('📊 Creating Grades...')
  
  // Oceny dla pierwszych 3 uczniów
  for (let i = 0; i < 3; i++) {
    const student = students[i]
    
    // Matematyka
    await prisma.grade.create({
      data: {
        value: 5,
        type: 'PARTIAL',
        weight: 3,
        studentId: student.id,
        teacherId: directorUser.teacher!.id,
        subjectId: subjects[0].id, // Matematyka
        categoryId: categories[0].id, // Sprawdzian
        description: 'Sprawdzian z funkcji',
        semester: 1,
        date: new Date('2024-10-15'),
      },
    })

    await prisma.grade.create({
      data: {
        value: 4.5,
        type: 'PARTIAL',
        weight: 1.5,
        studentId: student.id,
        teacherId: directorUser.teacher!.id,
        subjectId: subjects[0].id,
        categoryId: categories[1].id, // Kartkówka
        description: 'Kartkówka z trygonometrii',
        semester: 1,
        date: new Date('2024-10-20'),
      },
    })

    // Polski
    await prisma.grade.create({
      data: {
        value: 4,
        type: 'PARTIAL',
        weight: 1,
        studentId: student.id,
        teacherId: teacher1User.teacher!.id,
        subjectId: subjects[1].id, // Polski
        categoryId: categories[2].id, // Odpowiedź ustna
        description: 'Lektura obowiązkowa',
        semester: 1,
        date: new Date('2024-10-18'),
      },
    })
  }

  // ============================================================================
  // 10. PLAN LEKCJI (dla klasy 3A, poniedziałek)
  // ============================================================================
  console.log('📅 Creating Schedule...')
  
  await Promise.all([
    prisma.schedule.create({
      data: {
        dayOfWeek: 'MONDAY',
        startTime: '08:00',
        endTime: '08:45',
        lessonNumber: 1,
        classId: class3A.id,
        subjectId: subjects[0].id, // Matematyka
        teacherId: directorUser.teacher!.id,
        classroomId: classrooms[0].id,
        schoolYear: '2024/2025',
      },
    }),
    prisma.schedule.create({
      data: {
        dayOfWeek: 'MONDAY',
        startTime: '08:55',
        endTime: '09:40',
        lessonNumber: 2,
        classId: class3A.id,
        subjectId: subjects[0].id, // Matematyka
        teacherId: directorUser.teacher!.id,
        classroomId: classrooms[0].id,
        schoolYear: '2024/2025',
      },
    }),
    prisma.schedule.create({
      data: {
        dayOfWeek: 'MONDAY',
        startTime: '09:50',
        endTime: '10:35',
        lessonNumber: 3,
        classId: class3A.id,
        subjectId: subjects[1].id, // Polski
        teacherId: teacher1User.teacher!.id,
        classroomId: classrooms[1].id,
        schoolYear: '2024/2025',
      },
    }),
  ])

  // ============================================================================
  // 11. WYDARZENIA
  // ============================================================================
  console.log('🎉 Creating Events...')
  
  await Promise.all([
    prisma.event.create({
      data: {
        title: 'Dzień otwarty szkoły',
        description: 'Zapraszamy wszystkich chętnych do odwiedzenia naszej szkoły',
        type: 'SCHOOL_WIDE',
        startDate: new Date('2024-11-15T10:00:00'),
        endDate: new Date('2024-11-15T16:00:00'),
        location: 'Cała szkoła',
      },
    }),
    prisma.event.create({
      data: {
        title: 'Wycieczka do muzeum',
        description: 'Wycieczka do Muzeum Narodowego',
        type: 'CLASS',
        classId: class3A.id,
        startDate: new Date('2024-11-20T08:00:00'),
        endDate: new Date('2024-11-20T16:00:00'),
        location: 'Muzeum Narodowe',
      },
    }),
    prisma.event.create({
      data: {
        title: 'Wywiadówka',
        description: 'Spotkanie z rodzicami',
        type: 'CLASS',
        classId: class3A.id,
        startDate: new Date('2024-11-25T17:00:00'),
        endDate: new Date('2024-11-25T19:00:00'),
        location: 'Sala 101',
      },
    }),
  ])

  // ============================================================================
  // 12. ZADANIA DOMOWE
  // ============================================================================
  console.log('📝 Creating Homework...')
  
  const homework1 = await prisma.homework.create({
    data: {
      title: 'Zadania z funkcji liniowych',
      description: 'Rozwiązać zadania ze strony 45, ćwiczenia 1-10',
      subjectId: subjects[0].id, // Matematyka
      teacherId: directorUser.teacher!.id,
      classId: class3A.id,
      assignedDate: new Date('2024-10-20'),
      dueDate: new Date('2024-10-27'),
      maxPoints: 10,
    },
  })

  // Oddane prace
  await prisma.homeworkSubmission.create({
    data: {
      homeworkId: homework1.id,
      studentId: students[0].id,
      submittedAt: new Date('2024-10-26'),
      content: 'Rozwiązałam wszystkie zadania zgodnie z poleceniem.',
      points: 10,
      grade: 5,
      feedback: 'Świetna praca! Wszystkie zadania poprawne.',
      gradedAt: new Date('2024-10-27'),
      isLate: false,
    },
  })

  console.log('✅ Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log('- 1 Admin')
  console.log('- 5 Teachers (1 Director)')
  console.log(`- ${students.length} Students`)
  console.log('- 8 Parents')
  console.log('- 3 Classes')
  console.log(`- ${subjects.length} Subjects`)
  console.log(`- ${categories.length} Grade Categories`)
  console.log('- Multiple Grades, Events, Homework, etc.')
  console.log('\n🔐 All users password: password123')
  console.log('\n👤 Login examples:')
  console.log('  Admin: username=admin, password=password123')
  console.log('  Director: username=dyrektor, password=password123')
  console.log('  Teacher: username=akowalska, password=password123')
  console.log('  Student: username=anna.kowalska0, password=password123')
  console.log('  Parent: username=kowalska.mother0, password=password123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

