declare module "@/locales/es" {
  const es: {
    //SETTINGS
    settings: {
      accountTab: {
        infoAccount: string;
        name: string;
        email: string;
        address: string;
        role: string;
        phone: string;
        password: string;
        change: string;
        currentPassword: string;
        newPassword: string;
        repeatPassword: string;
        cancel: string;
        save: string;
        minLength: string;
        uppercase: string;
        specialChar: string;
        number: string;
        enterNewPassword: string;
        repeatNewPassword: string;
      };

      appearance: string;
      settings: string;
      theme: string;
      general: string;
      account: string;
      fontSize: {
        fontSize: string;
        title: string;
        subtitle: string;
        text: string;
      };
      colors: {
        title: string;
        subtitle: string;
        button: string;
        icon: string;
        toggleOn: string;
        toggleOff: string;
      };
      security: string;
      twoFactor: string;
      backupEmail: string;
      sessionTimeout: string;
      lockAccount: string;
      preferences: string;
      language: string;
      autoSync: string;
      soundFeedback: string;
      touchVibration: string;
      offlineMode: string;
      notifications: string;
      sections: {
        cambios: string;
        tareas: string;
        stock: string;
        pedidos: string;
        ventas: string;
        envios: string;
      };
    };

    //SIDEBAR
    sidebar: {
      productos: string;
      servicios: string;
      finanzas: string;
      clientes: string;
      procesos: string;
      empleados: string;
      pedidos: string;
      tareas: string;
      legales: string;
      stock: string;
      envios: string;
      settings: string;
    };

    //NOTIFICATION
    notification: {
      title: string;
      close: string;
      unreadTab: string;
      markAllAsRead: string;
      unreadSection: string;
      readSection: string;
      viewDetails: string;
    };


    //SHIPMENTS
    shipments: {
      pageTitle: string;
      newShipment: string;
      tabs: {
        day: string;
        week: string;
        month: string;
        year: string;
      };
      listTitle: string;
      filteredBy: string;
      filterStatuses: {
        pendiente: string;
        en_camino: string;
        entregando: string;
        cancelado: string;
      };
      details: string;
      edit: string;
      finalize: string;
      client: string;
      departure: string;
      arrival: string;
      destination: string;
      deliveryMan: string;
      products: string;
      noProducts: string;
      total: string;
      orderId: string;
      quantity: string;
      selectShipment: string;
      stats: {
        title: string;
        total: string;
        open: string;
        closed: string;
      };
    };

    //EMPLEADOS
    empleados: {
      title: string;
      addEmployee: string;
    };

    //ROLES
    roles: {
      title: string;
      addRole: string;
    };

    //PROCESOS
    processes: {
      title: string;
      addProcesses: string;
    };

    //SUB-PROCESSES
    subprocesses: {
      title: string;
      addSubprocesses: string;
    };

    //CLIENTES
    customers: {
      title: string;
    };

    //LEGAL
    legal: {
      pageTitle: string;
    };

    //PRODUCTOS
    productos: {
      pageTitle: string;
      subTitle: string;
      addProduct: string;
    };

    //SEARCH BAR
    searchbar: {
      placeholder: string;
    };

    //SERVICES
    services: {
      title: string;
      addServicio: string;
      categories: {
        title: string;
        addCategory: string;
      };
    };

    // FINANZAS
    finanzas: {
      title: string;
      tabs: {
        day: string;
        week: string;
        month: string;
        year: string;
      };
      ingresos: string;
      egresos: string;
      balance: {
        title: string;
        totalIngresos: string;
        totalEgresos: string;
        neto: string;
        seleccionado: string;
      };
      addPedido: string;
    };

    //MODALS
    modals: {
      productos: {
        tabs: {
          detalles: string;
          stock: string;
          proveedores: string;
          metricas: string;
          historial: string;
        };
        detalles: {
          title: string;
          descripcion: string;
          categoria: string;
          stockDisponible: string;
          codigo: string;
        };
        categoryForm: {
          title: string;
          placeholder: string;
          descripcion: string;
          stock: string;
          guardar: string;
          confirm: string;
          cancel: string;
        };
        productForm: {
          title: string;
          nombre: string;
          descripcion: string;
          codigo: string;
          stock: string;
          guardar: string;
          confirm: string;
          cancel: string;
        };
        cobrarCard: {
          numeroTarjeta: string;
          placeholderNumero: string;
          vencimiento: string;
          placeholderVencimiento: string;
          codSeguridad: string;
          placeholderCod: string;
          nombreApellido: string;
          placeholderNombre: string;
          pagoConTarjeta: string;
          selectOption: string;
          recordar: string;
        };
        cobrar: {
          tabs: {
            cobrar: string;
            stock: string;
          };
          precio: string;
          cantidad: string;
          totalCobrar: string;
          metodos: {
            efectivo: string;
            tarjeta: string;
            qr: string;
          };
          pagaCon: string;
          limpiar: string;
          recibido: string;
          total: string;
          vuelto: string;
          exacto: string;
          escaneaQr: string;
          finalizar: string;
          tooltip: string;
          cancelacionAuto: string; // debe contener "{seg}"
        };
      };
    };

    //TASKS
    tasks: {
      filterBy: string;
      title: string;
      selected: string;
      allUsers: string;
      searchPlaceholder: string;
      noMatchingUsers: string;
      allTasks: string;
      priorities: string;
      daysLeft: string;
      overdue: string;
      cardTitlePlaceholder: string;
      addCard: string;
      modals: {
        addTask: string;
        titlePlaceholder: string;
        descriptionPlaceholder: string;
        assignedPlaceholder: string;
        tagsPlaceholder: string;
        save: string;
        taskDescription: {
          title: string;
          stepLabel: string;
          priority: string;
          status: string;
          newEnd: string;
          taskEnd: string;
          remaining: string;
          select: string;
          assigned: string;
          tags: string;
          save: string;
          delete: string;
        };
      };

      priorityLabels: {
        Baja: string;
        Media: string;
        Alta: string;
        "Sin prioridad": string;
      };
    };

    //LOGIN
    login: {
      cookies:string;
      btnAcept:string;
      titleLogin: string,
      titleRegister: string,
      goToRegister: string;
      goToLogin: string;
      name: string;
      email: string;
      password: string;
      repeatEmail: string;
      repeatPassword: string;
      enter: string;
      register: string;
      errorEmailRequired: string;
      errorPasswordRequired: string;
      terms: string;
      privacy: string;
      errorEmail: string;
      errorPassword: string;
    };

    //ORDERS
    orders: {
      title: string;
      tabs: {
        day: string;
        week: string;
        month: string;
        year: string;
      };
      list: string;
      detail: string;
      pedido: string;
      proveedor: string;
      hora: string;
      productos: string;
      cantidad: string;
      total: string;
      finalizar: string;
      noProductos: string;
      emptyState: string;
      addPedido: string;
      estadisticas: string;
      totalPedidos: string;
      abiertos: string;
      cerrados: string;
      createTitle: string;
      createButton: string;
      placeholders: {
        cliente: string;
        provincia: string;
        calle: string;
        altura: string;
        codigoPostal: string;
        proveedor: string;
      };
      statusLabels: {
        pendiente: string;
        en_camino: string;
        entregando: string;
        cancelado: string;
        abierto: string;
        cerrado: string;
      };
      createPedidoTitle: string;
      createPedidoButton: string;
    };

    //INDEX
    index: {
      title: string;
    };
  };
  export default es;
}

declare module "@/locales/en" {
  const en: typeof import("@/locales/es").default;
  export default en;
}
