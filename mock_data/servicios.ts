export const mockData = {
  categories: [
    { title: "Consultoría", description: "Consultoría en varias áreas", imageUrl: "/images/consultoria.jpg", href: "#"},
    { title: "Tecnología", description: "Soluciones tecnológicas", imageUrl: "/images/tecnologia.jpg", href: "#"},
    { title: "Marketing", description: "Estrategias de marketing", imageUrl: "/images/marketing.jpg", href: "#"},
    { title: "Recursos Humanos", description: "Gestión de talento", imageUrl: "/images/recursos-humanos.jpg", href: "#"},
    { title: "Finanzas", description: "Asesoría financiera", imageUrl: "/images/finanzas.jpg", href: "#"},
    { title: "Diseño", description: "Diseño gráfico y de producto", imageUrl: "/images/diseno.jpg", href: "#"},
    { title: "Legal", description: "Asesoría legal y cumplimiento", imageUrl: "/images/legal.jpg", href: "#"}
  ],
  services: [
    // Consultoría
    { id: 1, title: "Consultoría Estratégica", description: "Planes estratégicos personalizados", imageUrl: "/images/consultoria-estrategica.jpg", href: "#", category: "Consultoría" },
    { id: 2, title: "Consultoría Financiera", description: "Gestión financiera con estrategias", imageUrl: "/images/consultoria-financiera.jpg", href: "#", category: "Consultoría" },
    { id: 3, title: "Consultoría en Marketing Digital", description: "Estrategias de marketing online", imageUrl: "/images/marketing-digital.jpg", href: "#", category: "Consultoría" },
    { id: 4, title: "Consultoría en Transformación Digital", description: "Asistencia en la digitalización empresarial", imageUrl: "/images/transformacion-digital.jpg", href: "#", category: "Consultoría" },
    { id: 5, title: "Consultoría en Gestión de Proyectos", description: "Gestión de proyectos con alto impacto", imageUrl: "/images/gestion-proyectos.jpg", href: "#", category: "Consultoría" },

    // Tecnología
    { id: 6, title: "Desarrollo de Software a Medida", description: "Soluciones personalizadas para tu negocio", imageUrl: "/images/desarrollo-software.jpg", href: "#", category: "Tecnología" },
    { id: 7, title: "Desarrollo de Aplicaciones Móviles", description: "Apps móviles adaptadas a tus necesidades", imageUrl: "/images/app-movil.jpg", href: "#", category: "Tecnología" },
    { id: 8, title: "Ciberseguridad", description: "Protección de tus datos y sistemas", imageUrl: "/images/ciberseguridad.jpg", href: "#", category: "Tecnología" },
    { id: 9, title: "Automatización de Procesos", description: "Optimización de tareas con automatización", imageUrl: "/images/automatizacion.jpg", href: "#", category: "Tecnología" },
    { id: 10, title: "Consultoría en Nube (Cloud)", description: "Soluciones en la nube para tu empresa", imageUrl: "/images/nube.jpg", href: "#", category: "Tecnología" },

    // Marketing
    { id: 11, title: "Estrategia SEO", description: "Mejora tu posicionamiento web", imageUrl: "/images/seo.jpg", href: "#", category: "Marketing" },
    { id: 12, title: "Gestión de Redes Sociales", description: "Gestionamos tus redes sociales", imageUrl: "/images/redes-sociales.jpg", href: "#", category: "Marketing" },
    { id: 13, title: "Publicidad Digital", description: "Publicidad online efectiva", imageUrl: "/images/publicidad-digital.jpg", href: "#", category: "Marketing" },
    { id: 14, title: "Marketing de Influencers", description: "Conectamos tu marca con influencers", imageUrl: "/images/influencers.jpg", href: "#", category: "Marketing" },
    { id: 15, title: "Consultoría en Branding", description: "Creación de marcas fuertes", imageUrl: "/images/branding.jpg", href: "#", category: "Marketing" },

    // Recursos Humanos
    { id: 16, title: "Reclutamiento de Talento", description: "Seleccionamos los mejores candidatos", imageUrl: "/images/reclutamiento.jpg", href: "#", category: "Recursos Humanos" },
    { id: 17, title: "Capacitación y Desarrollo", description: "Entrenamos y desarrollamos equipos", imageUrl: "/images/capacitacion.jpg", href: "#", category: "Recursos Humanos" },
    { id: 18, title: "Consultoría en Clima Laboral", description: "Mejora el ambiente de trabajo", imageUrl: "/images/clima-laboral.jpg", href: "#", category: "Recursos Humanos" },
    { id: 19, title: "Gestión de Nómina", description: "Gestión eficiente de tu nómina", imageUrl: "/images/nomina.jpg", href: "#", category: "Recursos Humanos" },
    { id: 20, title: "Coaching Ejecutivo", description: "Coaching para altos directivos", imageUrl: "/images/coaching.jpg", href: "#", category: "Recursos Humanos" },

    // Finanzas
    { id: 21, title: "Consultoría Financiera", description: "Optimización de recursos financieros", imageUrl: "/images/consultoria-financiera.jpg", href: "#", category: "Finanzas" },
    { id: 22, title: "Planificación Patrimonial", description: "Gestionamos tu patrimonio de forma eficiente", imageUrl: "/images/patrimonio.jpg", href: "#", category: "Finanzas" },
    { id: 23, title: "Auditoría Financiera", description: "Revisamos y mejoramos tus procesos financieros", imageUrl: "/images/auditoria.jpg", href: "#", category: "Finanzas" },
    { id: 24, title: "Asesoría en Inversiones", description: "Te ayudamos a tomar decisiones de inversión", imageUrl: "/images/inversiones.jpg", href: "#", category: "Finanzas" },
    { id: 25, title: "Gestión de Riesgos Financieros", description: "Identificamos y mitigamos riesgos financieros", imageUrl: "/images/gestio-riesgos.jpg", href: "#", category: "Finanzas" },

    // Diseño
    { id: 26, title: "Diseño Gráfico Corporativo", description: "Diseño de identidad visual para marcas", imageUrl: "/images/diseno-grafico.jpg", href: "#", category: "Diseño" },
    { id: 27, title: "Diseño de Productos", description: "Creación de productos innovadores", imageUrl: "/images/diseno-producto.jpg", href: "#", category: "Diseño" },
    { id: 28, title: "Diseño UX/UI", description: "Mejora la experiencia de usuario", imageUrl: "/images/ux-ui.jpg", href: "#", category: "Diseño" },
    { id: 29, title: "Diseño de Packaging", description: "Creación de envases atractivos", imageUrl: "/images/packaging.jpg", href: "#", category: "Diseño" },
    { id: 30, title: "Desarrollo de Branding", description: "Construcción de una marca sólida", imageUrl: "/images/branding.jpg", href: "#", category: "Diseño" },

    // Legal
    { id: 31, title: "Consultoría Legal Corporativa", description: "Asesoría legal para empresas", imageUrl: "/images/legal-corporativa.jpg", href: "#", category: "Legal" },
    { id: 32, title: "Protección de Propiedad Intelectual", description: "Registra y protege tus derechos", imageUrl: "/images/propiedad-intelectual.jpg", href: "#", category: "Legal" },
    { id: 33, title: "Contratos y Acuerdos", description: "Redacción y revisión de contratos", imageUrl: "/images/contratos.jpg", href: "#", category: "Legal" },
    { id: 34, title: "Asesoría en Cumplimiento Normativo", description: "Cumple con las regulaciones locales e internacionales", imageUrl: "/images/cumplimiento.jpg", href: "#", category: "Legal" },
    { id: 35, title: "Defensa Legal", description: "Defensa y representación jurídica", imageUrl: "/images/defensa-legal.jpg", href: "#", category: "Legal" }
  ]
};
