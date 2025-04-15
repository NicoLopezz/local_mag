  export interface Task {
    id: string;
    title: string;
    tag?: string;
    priority?: string;
    assigned?: string;
    description?: string;
    status?: string;
    dueDate: string;
    endDate?: Date;
  }
  
  export interface Column {
    id: string;
    title: string;
    tasks: Task[];
  }
  
  export const initialTasks: Column[] = [
    {
      id: "priorities",
      title: "Prioridades",
      tasks: [
        {
          id: "1",
          title: "Servidor en Render de test",
          tag: "Infraestructura",
          priority: "Alta",
          assigned: "Ruben",
          description: "Subir el entorno a producción con validaciones",
          status: "Paso 1",
          dueDate: "2025-12-25"
        },
        {
          id: "2",
          title: "Crear vista de tareas",
          tag: "Frontend",
          priority: "Media",
          assigned: "Camila",
          description: "Diseñar y desarrollar UI de tareas con drag & drop",
          status: "Paso 2",
          dueDate: "2025-06-25"
        }
      ]
    },
    {
      id: "in_progress",
      title: "In Progress",
      tasks: [
        {
          id: "3",
          title: "Conectar login con backend",
          tag: "Auth",
          priority: "Alta",
          assigned: "Nicolás",
          description: "Integrar login con autenticación JWT y cookies",
          status: "Paso 4",
          dueDate: "2025-05-25"
        }
      ]
    },
    {
      id: "delivered",
      title: "Done",
      tasks: []
    }
  ];
  