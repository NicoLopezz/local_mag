const en = {
  //SETINGS
  settings: {
    accountTab: {
      infoAccount: "Account information",
      name: "Nombre",
      email: "Email",
      address: "Address",
      role: "Role",
      phone: "Phone",
      password: "Password",
      change: "Change",
      currentPassword: "Current Password",
      newPassword: "New Password",
      repeatPassword: "Repeat Password",
      ActualPassword: "Current Password",
      enterNewPassword: "Enter New Password",
      repeatNewPassword: "Repeat New Password",
      cancel: "Cancel",
      save: "Save",
      minLength: "At least 8 characters",
      uppercase: "One uppercase letter",
      specialChar: "One special character",
      number: "One number",
    },
    appearance: "Appearance",
    settings: "Settings",
    general: "General",
    account: "Account",
    theme: "Theme",
    fontSize: {
      fontSize: "Font Size",
      title: "Title",
      subtitle: "Subtitle",
      text: "Text",
    },
    colors: {
      title: "Title",
      subtitle: "Subtitle",
      button: "Button",
      icon: "Icon",
      toggleOn: "Toggle On",
      toggleOff: "Toggle Off",
    },
    security: "Security",
    twoFactor: "Two-Factor Authentication",
    backupEmail: "Backup Email",
    sessionTimeout: "Session Timeout (min)",
    lockAccount: "Lock Account",
    preferences: "Preferences",
    language: "Language",
    autoSync: "Auto Sync",
    soundFeedback: "Sound Feedback",
    touchVibration: "Touch Vibration",
    offlineMode: "Offline Mode",
    notifications: "Notifications",
    sections: {
      cambios: "Changes",
      tareas: "Tasks",
      stock: "Stock",
      pedidos: "Orders",
      ventas: "Sales",
      envios: "Shipments",
    },
  },

  //SIDEBAR
  sidebar: {
    productos: "Products",
    servicios: "Services",
    finanzas: "Finance",
    clientes: "Customers",
    procesos: "Processes",
    empleados: "Employees",
    pedidos: "Orders",
    tareas: "Tasks",
    legales: "Legal",
    stock: "Stock",
    envios: "Shipments",
    settings: "Settings",
  },

  //EMPLEADOS
  empleados: {
    title: "Employees",
    addEmployee: "Add Employee",
  },

  //SERVICES
  services: {
    title: "Services",
    addServicio: "Add Service",
    categories: {
      title: "Categories",
      addCategory: "Add Category",
    },
  },

  //PROCESSES
  processes: {
    title: "Processes",
    addProcesses: "Add Process",
  },

  subprocesses: {
    title: "Sub-processes",
    addSubprocesses: "Add Subprocess",
  },

  //CLIENTES
  customers: {
    title: "Customers",
  },

  //ROLES
  roles: {
    title: "Roles",
    addRole: "Add role",
  },

  //SHIPMENTS
  shipments: {
    pageTitle: "Shipments",
    newShipment: "New Shipment",
    tabs: {
      day: "Day",
      week: "Week",
      month: "Month",
      year: "Year",
    },
    listTitle: "Shipment List",
    filteredBy: "Filtered by:",
    filterStatuses: {
      pendiente: "Pending",
      en_camino: "On the way",
      entregando: "Delivering",
      cancelado: "Cancelled",
    },
    details: "Details",
    edit: "Edit",
    finalize: "Finalize",
    client: "Client",
    departure: "Departure",
    arrival: "Arrival",
    destination: "Destination",
    deliveryMan: "Delivery person",
    products: "Products",
    queantity: "Quantity",
    noProducts: "No products added to this shipment.",
    total: "Total",
    orderId: "Order",
    selectShipment: "Select a shipment to see details",
    stats: {
      title: "Statistics",
      total: "Total Orders",
      open: "Open",
      closed: "Closed",
    },
  },

  //LEGAL
  legal: {
    pageTitle: "Legal",
  },

  //PRODUCTOS
  productos: {
    pageTitle: "Categories",
    subTitle: "Products",
    addProduct: "Add product",
  },

  // NOTIFICATIONBAR
  notification: {
    title: "Notifications",
    close: "Close notifications",
    unreadTab: "Unread",
    markAllAsRead: "Mark all as read",
    unreadSection: "Unread",
    readSection: "Read",
    viewDetails: "View details",
  },

  //LOGIN
  login: {
    titleLogin: "Welcome back",
    titleRegister: "Create an account",
    goToRegister: "Register",
    goToLogin: "Login",
    name: "Full name",
    email: "Email adress",
    password: "Password",
    repeatEmail: "Repeat email",
    repeatPassword: "Repeat password",
    enter: "Continue",
    register: "Register",
    errorEmailRequired: "Email is required.",
    errorPasswordRequired: "Password is required.",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    errorEmail: "The emails do not match",
    errorPassword: "The emails do not match"
  },

  //SEARCH BAR
  searchbar: {
    placeholder: "Search...",
  },

  //INDEX
  index: {
    title: "Welcome to the management panel",
  },

  //TASKS
  tasks: {
    title: "Tasks",
    filterBy: "Filter by",
    selected: "off {{count}}",
    allUsers: "off all",
    searchPlaceholder: "Filter users...",
    noMatchingUsers: "No matching users",
    allTasks: "All Tasks",
    priorities: "Priorities",
    daysLeft: "{{count}} days left",
    overdue: "Overdue",
    cardTitlePlaceholder: "Write the card title",
    addCard: "Add card",
    modals: {
      addTask: "Add Task",
      titlePlaceholder: "Task title",
      descriptionPlaceholder: "Description",
      assignedPlaceholder: "Assigned to",
      tagsPlaceholder: "Press Enter to add tags",
      save: "Save",
      taskDescription: {
        title: "Description",
        stepLabel: "Step {{count}}",
        priority: "Priority",
        status: "Status",
        newEnd: "New end",
        taskEnd: "Task end",
        remaining: "{{count}} days left",
        select: "Select",
        assigned: "Assigned to",
        tags: "Tags",
        save: "Save",
        delete: "Delete",
      },
    },
    priorityLabels: {
      Baja: "Low",
      Media: "Medium",
      Alta: "High",
      "Sin prioridad": "No priority",
    },
  },

  //MODALS
  modals: {
    productos: {
      tabs: {
        detalles: "Details",
        stock: "Stock",
        proveedores: "Suppliers",
        metricas: "Metrics",
        historial: "History",
      },
      detalles: {
        title: "Product details",
        descripcion: "Description",
        categoria: "Category",
        stockDisponible: "Available stock",
        codigo: "Code",
      },
      categoryForm: {
        title: "Add Category",
        placeholder: "Category name",
        descripcion: "Description",
        stock: "Stock",
        guardar: "Save",
        confirm: "Add category",
        cancel: "Cancel",
      },
      productForm: {
        title: "Add Product",
        nombre: "Product name",
        descripcion: "Description",
        codigo: "Product code",
        stock: "Stock",
        guardar: "Save",
        confirm: "Add product",
        cancel: "Cancel",
      },
      cobrarCard: {
        numeroTarjeta: "Card number *",
        placeholderNumero: "**** **** **** ****",
        vencimiento: "Expiration *",
        placeholderVencimiento: "MM/YY",
        codSeguridad: "Security code *",
        placeholderCod: "CVV",
        nombreApellido: "Full name *",
        placeholderNombre: "As appears on the card",
        pagoConTarjeta: "Pay with card *",
        selectOption: "Select an option",
        recordar: "Remember card",
      },
      cobrar: {
        tabs: {
          cobrar: "Charge",
          stock: "Stock",
        },
        precio: "Price",
        cantidad: "Quantity",
        totalCobrar: "Total to charge",
        metodos: {
          efectivo: "Cash",
          tarjeta: "Card",
          qr: "QR",
        },
        pagaCon: "Pay with",
        limpiar: "Clear",
        recibido: "Received",
        total: "Total",
        vuelto: "Change",
        exacto: "Exact amount",
        escaneaQr: "Please scan the QR",
        finalizar: "Finish",
        tooltip: "Fill in all fields",
        cancelacionAuto: "Auto cancel in {seg} sec",
      },
    },
  },
  //FINANZAS
  finanzas: {
    title: "Finances",
    tabs: {
      day: "Day",
      week: "Week",
      month: "Month",
      year: "Year",
    },
    ingresos: "INCOME",
    egresos: "EXPENSES",
    balance: {
      title: "BALANCE",
      totalIngresos: "Total Income",
      totalEgresos: "Total Expenses",
      neto: "Net Balance",
      seleccionado: "Selected",
    },
    addPedido: "Add Order",
  },

  //ORDERS
  orders: {
    title: "Orders",
    tabs: {
      day: "Day",
      week: "Week",
      month: "Month",
      year: "Year",
    },
    list: "Order List",
    detail: "Detail",
    pedido: "Order",
    proveedor: "Supplier:",
    hora: "Time:",
    productos: "Products",
    cantidad: "Quantity",
    total: "Total:",
    finalizar: "Finish",
    noProductos: "No products added to this order.",
    emptyState: "Select an order to see the details",
    addPedido: "Add Order",
    estadisticas: "Statistics",
    totalPedidos: "Total Orders:",
    abiertos: "Open:",
    cerrados: "Closed:",
    createTitle: "Create New Delivery",
    createButton: "Create Delivery",
    placeholders: {
      cliente: "Client name",
      provincia: "Province",
      calle: "Street",
      altura: "Street number",
      codigoPostal: "Postal code",
      proveedor: "Supplier name",
    },
    statusLabels: {
      pendiente: "Pending",
      en_camino: "On the way",
      entregando: "Delivered",
      cancelado: "Cancelled",
      abierto: "Open",
      cerrado: "Closed",
    },
    createPedidoTitle: "Create New Order",
    createPedidoButton: "Create Order",
  },
};

export default en;
