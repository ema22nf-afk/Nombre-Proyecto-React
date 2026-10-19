export const initialStudent = {
  nombre: "José Miguel Roldán",
  grado: "11°",
  codigo: "EST-202611",
  telefono: "3001234567",
  correo: "jose.miguel@educonnect.edu.co",
  avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
};

export const initialTeacher = {
  nombre: "Prof. Carlos Ramírez",
  especialidad: "Tecnología & Artística",
  codigo: "DOC-8942",
  telefono: "3109876543",
  correo: "carlos.ramirez@educonnect.edu.co",
  avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
};

export const initialStudentSubjects = [
  {
    id: "artistica",
    nombre: "Artística",
    profesor: "Carlos Ramírez",
    codigo: "ART-101",
    icono: "fa-solid fa-palette",
    imagen: "https://cdn-icons-png.flaticon.com/512/3163/3163478.png"
  },
  {
    id: "fisica",
    nombre: "Física",
    profesor: "Roberto Méndez",
    codigo: "FIS-202",
    icono: "fa-solid fa-atom",
    imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046269.png"
  },
  {
    id: "quimica",
    nombre: "Química",
    profesor: "Andrea Castro",
    codigo: "QUI-303",
    icono: "fa-solid fa-flask",
    imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046278.png"
  },
  {
    id: "matematicas",
    nombre: "Matemáticas",
    profesor: "Gabriel Torres",
    codigo: "MAT-404",
    icono: "fa-solid fa-calculator",
    imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046252.png"
  }
];

export const initialTasks = {
  artistica: [
    { id: "art-1", title: "Colorear dibujo", status: "completada", nota: 4.5 },
    { id: "art-2", title: "Delineado", status: "completada", nota: 4.0 },
    { id: "art-3", title: "Sombras", status: "cancelada", nota: 3.8 },
    {
      id: "art-4",
      title: "Paisaje",
      status: "pendiente",
      dueDate: "16/09/2026",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
      description: "Realiza el dibujo con base en la muestra y aplica colores cálidos con delineado y degradado."
    },
    { id: "art-5", title: "Biografía", status: "completada", nota: 4.8 }
  ],
  fisica: [
    {
      id: "fis-1",
      title: "Caída libre",
      status: "pendiente",
      dueDate: "20/09/2026",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
      description: "Realiza el informe de caída libre con base en las fórmulas vistas en clase sobre aceleración gravitatoria."
    },
    { id: "fis-2", title: "Movimiento uniforme", status: "completada", nota: 4.6 },
    { id: "fis-3", title: "Leyes de Newton", status: "completada", nota: 4.2 }
  ],
  quimica: [
    {
      id: "qui-1",
      title: "Reacciones químicas",
      status: "pendiente",
      dueDate: "22/09/2026",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600",
      description: "Realiza el balanceo de las siguientes ecuaciones químicas y describe el tipo de reacción."
    },
    { id: "qui-2", title: "Tabla periódica", status: "completada", nota: 4.7 },
    { id: "qui-3", title: "Enlaces químicos", status: "completada", nota: 4.1 }
  ],
  matematicas: [
    {
      id: "mat-1",
      title: "Resolver problemas",
      status: "pendiente",
      dueDate: "25/09/2026",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600",
      description: "Resuelve la guía de ejercicios prácticos sobre funciones cuadráticas y análisis gráfico."
    },
    { id: "mat-2", title: "Álgebra lineal", status: "completada", nota: 4.8 },
    { id: "mat-3", title: "Geometría analítica", status: "completada", nota: 4.3 }
  ]
};

export const initialNotifications = [
  {
    id: "n1",
    titulo: "Nuevo mensaje",
    mensaje: "Tienes un nuevo mensaje en la materia de Artística sin leer.",
    leida: false
  },
  {
    id: "n2",
    titulo: "Tarea no entregada",
    mensaje: 'Tu tarea "Sombras" de Artística venció.',
    leida: false
  },
  {
    id: "n3",
    titulo: "Recordatorio",
    mensaje: "Te quedan 2 días para entregar el delineado de Artística.",
    leida: false
  }
];

export const initialChats = {
  artistica: [
    { id: 1, sender: "me", text: "Hola profesor, tengo una duda sobre la actividad.", time: "10:14" },
    { id: 2, sender: "other", text: "Claro, dime cuál es tu duda y con gusto te ayudo.", time: "10:16" },
    { id: 3, sender: "me", text: "¿La pintura debe hacerse en cartulina?", time: "10:18" },
    { id: 4, sender: "other", text: "Sí. Debe realizarse en cartulina tamaño pliego y entregarse el viernes.", time: "10:20" }
  ],
  fisica: [
    { id: 1, sender: "me", text: "Buenos días profe, ¿cuándo es el parcial de cinemática?", time: "08:30" },
    { id: 2, sender: "other", text: "Hola, el próximo martes a primera hora.", time: "08:45" }
  ],
  quimica: [
    { id: 1, sender: "me", text: "Profe, ¿el informe de laboratorio es individual o en parejas?", time: "14:10" },
    { id: 2, sender: "other", text: "Es en parejas, recuerden adjuntar las fotos de las reacciones.", time: "14:25" }
  ],
  matematicas: [
    { id: 1, sender: "me", text: "Profesor, ¿los ejercicios van en el cuaderno o en hojas de examen?", time: "09:05" },
    { id: 2, sender: "other", text: "En hojas de examen cuadriculadas bien presentadas.", time: "09:12" }
  ]
};

export const initialTeacherSubjects = [
  {
    id: "tecnologia",
    nombre: "Tecnología",
    icono: "fa-solid fa-laptop-code",
    grados: ["9°", "10°", "11°"]
  },
  {
    id: "artistica-prof",
    nombre: "Artística",
    icono: "fa-solid fa-palette",
    artisticaClass: true,
    grados: ["10°", "11°"]
  }
];

export const initialStudentsByGrade = {
  "tecnologia-9°": [
    {
      id: "juan-perez",
      nombre: "Juan Pérez",
      grado: "9°",
      materia: "Tecnología",
      avatar: "👨‍🎓",
      actividades: [
        { id: "act-1", titulo: "Actividad 1", subtitulo: "Introducción a la tecnología", status: "calificada", nota: 4.5 },
        {
          id: "act-2",
          titulo: "Actividad 2",
          subtitulo: "Investigación sobre tecnología",
          status: "pendiente",
          nota: null,
          archivo: "Investigación_tecnologia.pdf",
          descripcion: "Realiza una investigación sobre la importancia de la tecnología en la vida cotidiana y explica dos ejemplos de cómo influye en la sociedad."
        },
        { id: "act-3", titulo: "Actividad 3", subtitulo: "Proyecto tecnológico", status: "calificada", nota: 4.3 }
      ]
    },
    {
      id: "maria-gomez",
      nombre: "María Gómez",
      grado: "9°",
      materia: "Tecnología",
      avatar: "👩‍🎓",
      actividades: [
        { id: "act-1", titulo: "Actividad 1", subtitulo: "Introducción a la tecnología", status: "calificada", nota: 4.8 },
        { id: "act-2", titulo: "Actividad 2", subtitulo: "Investigación sobre tecnología", status: "calificada", nota: 4.6 }
      ]
    },
    {
      id: "carlos-rodriguez",
      nombre: "Carlos Rodríguez",
      grado: "9°",
      materia: "Tecnología",
      avatar: "👨‍🎓",
      actividades: [
        { id: "act-1", titulo: "Actividad 1", subtitulo: "Introducción a la tecnología", status: "calificada", nota: 4.0 },
        { id: "act-2", titulo: "Actividad 2", subtitulo: "Investigación sobre tecnología", status: "calificada", nota: 4.2 }
      ]
    },
    {
      id: "laura-martinez",
      nombre: "Laura Martínez",
      grado: "9°",
      materia: "Tecnología",
      avatar: "👩‍🎓",
      actividades: [
        { id: "act-1", titulo: "Actividad 1", subtitulo: "Introducción a la tecnología", status: "calificada", nota: 4.7 },
        { id: "act-2", titulo: "Actividad 2", subtitulo: "Investigación sobre tecnología", status: "calificada", nota: 4.9 }
      ]
    }
  ],
  "tecnologia-10°": [
    { id: "andres-lopez", nombre: "Andrés López", grado: "10°", materia: "Tecnología", avatar: "👨‍🎓" },
    { id: "valentina-torres", nombre: "Valentina Torres", grado: "10°", materia: "Tecnología", avatar: "👩‍🎓" },
    { id: "sebastian-gomez", nombre: "Sebastián Gómez", grado: "10°", materia: "Tecnología", avatar: "👨‍🎓" },
    { id: "camila-rodriguez", nombre: "Camila Rodríguez", grado: "10°", materia: "Tecnología", avatar: "👩‍🎓" }
  ],
  "tecnologia-11°": [
    { id: "valeria-gallego", nombre: "Valeria Gallego", grado: "11°", materia: "Tecnología", avatar: "👩‍🎓" },
    { id: "sara-ramirez", nombre: "Sara Ramírez", grado: "11°", materia: "Tecnología", avatar: "👩‍🎓" },
    { id: "maria-sanchez", nombre: "María Sánchez", grado: "11°", materia: "Tecnología", avatar: "👩‍🎓" },
    { id: "daniel-rodriguez", nombre: "Daniel Rodríguez", grado: "11°", materia: "Tecnología", avatar: "👨‍🎓" }
  ],
  "artistica-prof-10°": [
    { id: "andres-lopez", nombre: "Andrés López", grado: "10°", materia: "Artística", avatar: "👨‍🎓" },
    { id: "valentina-torres", nombre: "Valentina Torres", grado: "10°", materia: "Artística", avatar: "👩‍🎓" },
    { id: "sebastian-gomez", nombre: "Sebastián Gómez", grado: "10°", materia: "Artística", avatar: "👨‍🎓" },
    { id: "camila-rodriguez", nombre: "Camila Rodríguez", grado: "10°", materia: "Artística", avatar: "👩‍🎓" }
  ],
  "artistica-prof-11°": [
    { id: "valeria-gallego", nombre: "Valeria Gallego", grado: "11°", materia: "Artística", avatar: "👩‍🎓" },
    { id: "sara-ramirez", nombre: "Sara Ramírez", grado: "11°", materia: "Artística", avatar: "👩‍🎓" },
    { id: "maria-sanchez", nombre: "María Sánchez", grado: "11°", materia: "Artística", avatar: "👩‍🎓" },
    { id: "daniel-rodriguez", nombre: "Daniel Rodríguez", grado: "11°", materia: "Artística", avatar: "👨‍🎓" }
  ]
};
