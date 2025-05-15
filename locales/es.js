const es = {
  //SETTINGS
  settings: {
    accountTab: {
      infoAccount: "Información de la cuenta",
      name: "Nombre",
      email: "Correo electrónico",
      address: "Dirección",
      role: "Rol",
      phone: "Teléfono",
      password: "Contraseña",
      change: "Cambiar",
      currentPassword: "Contraseña actual",
      newPassword: "Nueva contraseña",
      repeatPassword: "Repetir contraseña",
      ActualPassword: "Contraseña actual",
      enterNewPassword: "Ingrese Nueva Constraseña",
      enterCurrentPassword: "Repita Nueva Constraseña",
      cancel: "Cancelar",
      save: "Guardar",
      minLength: "Al menos 8 caracteres",
      uppercase: "Una letra mayúscula",
      specialChar: "Un carácter especial",
      number: "Un número",
    },
    appearance: "Apariencia",
    settings: "Ajustes",
    general: "General",
    theme: "Tema",
    account: "Cuenta",

    fontSize: {
      fontSize: "Tamaño de fuente",
      title: "Título",
      subtitle: "Subtítulo",
      text: "Texto",
    },
    colors: {
      title: "Título",
      subtitle: "Subtítulo",
      button: "Botón",
      icon: "Ícono",
      toggleOn: "Activado",
      toggleOff: "Off",
    },
    security: "Seguridad",
    twoFactor: "Autenticación en dos pasos",
    backupEmail: "Correo de respaldo",
    sessionTimeout: "Tiempo de sesión (min)",
    lockAccount: "Bloquear cuenta",
    preferences: "Preferencias",
    language: "Idioma",
    autoSync: "Sincronización automática",
    soundFeedback: "Sonido de retroalimentación",
    touchVibration: "Vibración táctil",
    offlineMode: "Modo sin conexión",
    notifications: "Notificaciones",
    sections: {
      cambios: "Cambios",
      tareas: "Tareas",
      stock: "Stock",
      pedidos: "Pedidos",
      ventas: "Ventas",
      envios: "Envíos",
    },
  },

  //SIDEBAR
  sidebar: {
    productos: "Productos",
    servicios: "Servicios",
    finanzas: "Finanzas",
    clientes: "Clientes",
    procesos: "Procesos",
    empleados: "Empleados",
    pedidos: "Pedidos",
    tareas: "Tareas",
    legales: "Legales",
    stock: "Stock",
    envios: "Envíos",
    settings: "Ajustes",
  },

  //CLIENTES
  customers: {
    title: "Clientes",
  },

  //MODALS
  modals: {
    productos: {
      tabs: {
        detalles: "Detalles",
        stock: "Stock",
        proveedores: "Proveedores",
        metricas: "Métricas",
        historial: "Historial",
      },
      detalles: {
        title: "Detalles del producto",
        descripcion: "Descripción",
        categoria: "Categoría",
        stockDisponible: "Stock disponible",
        codigo: "Código",
      },
      categoryForm: {
        title: "Agregar Categoría",
        placeholder: "Nombre de la categoría",
        descripcion: "Descripción",
        stock: "Stock",
        guardar: "Guardar",
        confirm: "Añadir categoría",
        cancel: "Cancelar",
      },
      productForm: {
        title: "Agregar Producto",
        nombre: "Nombre del producto",
        descripcion: "Descripción",
        codigo: "Código del producto",
        stock: "Stock",
        guardar: "Guardar",
        confirm: "Añadir producto",
        cancel: "Cancelar",
      },
      cobrarCard: {
        numeroTarjeta: "Nº de tarjeta *",
        placeholderNumero: "**** **** **** ****",
        vencimiento: "Vencimiento *",
        placeholderVencimiento: "MM/AA",
        codSeguridad: "Cod. seguridad *",
        placeholderCod: "CVV",
        nombreApellido: "Nombre y apellido *",
        placeholderNombre: "Como aparece en la tarjeta",
        pagoConTarjeta: "Pago con tarjeta *",
        selectOption: "Seleccione un elemento",
        recordar: "Recordar tarjeta",
      },
      cobrar: {
        tabs: {
          cobrar: "Cobrar",
          stock: "Stock",
        },
        precio: "Precio",
        cantidad: "Cantidad",
        totalCobrar: "Total a cobrar",
        metodos: {
          efectivo: "Efectivo",
          tarjeta: "Tarjeta",
          qr: "QR",
        },
        pagaCon: "Paga con",
        limpiar: "Limpiar",
        recibido: "Recibido",
        total: "Total",
        vuelto: "Vuelto",
        exacto: "Pago exacto",
        escaneaQr: "Por favor scanee el QR",
        finalizar: "Finalizar",
        tooltip: "Complete los campos",
        cancelacionAuto: "Cancelación automática en {seg} seg",
      },
    },
  },

  //FINANZAS
  finanzas: {
    title: "Finanzas",
    tabs: {
      day: "Día",
      week: "Semana",
      month: "Mes",
      year: "Año",
    },
    ingresos: "INGRESOS",
    egresos: "EGRESOS",
    balance: {
      title: "BALANCE",
      totalIngresos: "Total Ingresos",
      totalEgresos: "Total Egresos",
      neto: "Balance Neto",
      seleccionado: "Seleccionado",
    },
    addPedido: "Añadir Pedido",
  },

  //EMPLEADOS
  empleados: {
    title: "Empleados",
    addEmployee: "Agregar Empleado",
  },

  //SEARCH BAR
  searchbar: {
    placeholder: "Buscar...",
  },

  //SERVICES
  services: {
    title: "Servicios",
    addEmployee: "Add Employee",
    categories: {
      title: "Categorias",
    },
  },

  //PRODUCTOS
  productos: {
    pageTitle: "Categoras",
    subTitle: "Productos",
    addProduct: "Agregar producto",
  },

  //ROLES
  roles: {
    title: "Roles",
    addRole: "Agregar role",
  },

  //PROCESSES
  processes: {
    title: "Procesos",
    addProcesses: "Agregar Proceso",
  },

  subprocesses: {
    title: "Sub-procesos",
    addSubprocesses: "Agregar Subproceso",
  },

  //SHIPMENTS
  shipments: {
    pageTitle: "Envíos",
    newShipment: "Nuevo Envío",
    tabs: {
      day: "Día",
      week: "Semana",
      month: "Mes",
      year: "Año",
    },
    listTitle: "Lista de envíos",
    filteredBy: "Filtrado por:",
    filterStatuses: {
      pendiente: "Pendiente",
      en_camino: "En camino",
      entregando: "Entregando",
      cancelado: "Cancelado",
    },
    details: "Detalles",
    edit: "Editar",
    finalize: "Finalizar",
    client: "Cliente",
    departure: "Salida",
    arrival: "Llegada",
    destination: "Destino",
    deliveryMan: "Repartidor",
    products: "Productos",
    noProducts: "No se agregaron productos a este pedido.",
    total: "Total",
    orderId: "Pedido",
    quantity: "Cantidad",
    selectShipment: "Seleccione un pedido para ver los detalles",
    stats: {
      title: "Estadísticas",
      total: "Total Pedidos",
      open: "Abiertos",
      closed: "Cerrados",
    },
  },

  //LOGIN
  login: {
    cookies: "Usamos cookies para mejorar tu experiencia. Al continuar, aceptás el uso de todas las cookies.",
    btnAcept:"Aceptar todas",
    titleLogin: "Bienvenido de nuevo",
    titleRegister: "Crea una cuenta",
    goToRegister: "Registrarse",
    goToLogin: "Iniciar sesión",
    name: "Nombre completo",
    email: "Correo electrónico",
    password: "Contraseña",
    enter: "Continuar",
    register: "Registrarse",
    errorEmailRequired: "Se requiere un correo electrónico.",
    errorPasswordRequired: "Se requiere una contraseña.",
    terms: "Términos de uso",
    privacy: "Política de privacidad",
    repeatEmail: "Repetir email",
    repeatPassword: "Repetir contraseña",
    errorEmail: "Los correos no coinciden",
    errorPassword: "Las contraseñas no coinciden"
  },

  // NOTIFICATIONBAR
  notification: {
    title: "Notificaciones",
    close: "Cerrar notificaciones",
    unreadTab: "No leídas",
    markAllAsRead: "Marcar como leídas",
    unreadSection: "No leídas",
    readSection: "Leídas",
    viewDetails: "Ver detalle",
  },

  //LEGAL
  legal: {
    pageTitle: "Legales",
  },

  //TASKS
  tasks: {
    filterBy: "Filtrar por",
    title: "Tareas",
    selected: "de {{count}}",
    allUsers: "de todos",
    searchPlaceholder: "Filtrar usuarios...",
    noMatchingUsers: "No hay usuarios coincidentes",
    allTasks: "Todas las tareas",
    priorities: "Prioridades",
    daysLeft: "{{count}} días restantes",
    overdue: "Vencida",
    cardTitlePlaceholder: "Escribe el título de la card",
    addCard: "Añadir card",
    modals: {
      addTask: "Agregar Tarea",
      titlePlaceholder: "Título de la tarea",
      descriptionPlaceholder: "Descripción",
      assignedPlaceholder: "Asignado a",
      tagsPlaceholder: "Presioná Enter para agregar etiquetas",
      save: "Guardar",
      taskDescription: {
        title: "Descripción",
        stepLabel: "Paso {{count}}",
        priority: "Prioridad",
        status: "Estado",
        newEnd: "Nuevo fin",
        taskEnd: "Fin de tarea",
        remaining: "Restan {{count}} días",
        select: "Seleccionar",
        assigned: "Asigando a",
        tags: "Etiquetas",
        save: "Save",
        delete: "Delete",
      },
    },
    priorityLabels: {
      Baja: "Baja",
      Media: "Media",
      Alta: "Alta",
      "Sin prioridad": "Sin prioridad",
    },
  },

  //INDEX
  index: {
    title: "Bienvenido al panel de gestión",
  },

  //ORDERS
  orders: {
    title: "Pedidos",
    tabs: {
      day: "Día",
      week: "Semana",
      month: "Mes",
      year: "Año",
    },
    list: "Lista de Pedidos",
    detail: "Detalle",
    pedido: "Pedido",
    proveedor: "Proveedor:",
    hora: "Hora:",
    productos: "Productos",
    cantidad: "Cantidad",
    total: "Total:",
    finalizar: "Finalizar",
    noProductos: "No se agregaron productos a este pedido.",
    emptyState: "Seleccione un pedido para ver los detalles",
    addPedido: "Añadir Pedido",
    estadisticas: "Estadísticas",
    totalPedidos: "Total Pedidos:",
    abiertos: "Abiertos:",
    cerrados: "Cerrados:",
    createTitle: "Crear Nuevo Envío",
    createButton: "Crear Envío",
    placeholders: {
      cliente: "Nombre del cliente",
      provincia: "Provincia",
      calle: "Calle",
      altura: "Altura",
      codigoPostal: "Código Postal",
      proveedor: "Nombre del proveedor",
    },
    statusLabels: {
      pendiente: "Pendiente",
      en_camino: "En camino",
      entregando: "Entregado",
      cancelado: "Cancelado",
      abierto: "Abierto",
      cerrado: "Cerrado",
    },
    createPedidoTitle: "Crear Nuevo Pedido",
    createPedidoButton: "Crear Pedido",
  },
};

export default es;
