import { FC, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { mockData } from "@/mock_data/empleados";
import { QRCodeCanvas } from "qrcode.react";
import { Edit_Actions } from "@/components/molecules/general/Edit_Actions";

interface ContactoEmergencia {
  nombre: string;
  relacion: string;
  telefono: string;
}

interface Vacaciones {
  totalDias: number;
  usados: number;
  disponibles: number;
}

interface Empleado {
  id?: number;
  name: string;
  surname: string;
  age: number;
  children: number;
  address: string;
  dni: string;
  cuil: string;
  role: string;
  category: string;
  email: string;
  phone: string;
  imageUrl: string;
  legajo: string;
  fechaIngreso: string;
  tipoContrato: string;
  salarioBase: number;
  salarioNeto: number;
  birthdate: Date;
  obraSocial: string;
  art: string;
  puestoExacto: string;
  supervisor: string;
  contactoEmergencia: ContactoEmergencia;
  vacaciones: Vacaciones;
  equiposAsignados: string[];
}

interface Props {
  empleado?: Empleado;
}

export const Empleado_Contacto: FC<Props> = ({ empleado: empleadoProp }) => {
  const { query } = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  let empleadoToDisplay = empleadoProp;

  if (!empleadoToDisplay) {
    const emailFromQuery = typeof query.email === "string" ? query.email : null;
    if (emailFromQuery) {
      const encontrado = mockData.empleados.find((e) => e.email === emailFromQuery);
      if (encontrado) {
        const birthdate = new Date("1992-09-10");
        const today = new Date();
        const age =
          today.getFullYear() -
          birthdate.getFullYear() -
          (today.getMonth() < birthdate.getMonth() ||
          (today.getMonth() === birthdate.getMonth() &&
            today.getDate() < birthdate.getDate())
            ? 1
            : 0);
  
        empleadoToDisplay = {
          ...encontrado,
          surname: "Generado",
          birthdate,
          age,
          children: Math.floor(Math.random() * 3),
          address: "Calle Falsa 123",
          dni: Math.floor(Math.random() * 100000000).toString(),
          cuil: "20-" + Math.floor(Math.random() * 100000000) + "-0",
          category: "A",
          legajo: "EMP-" + Math.floor(Math.random() * 10000),
          fechaIngreso: new Date(
            Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3)
          )
            .toISOString()
            .split("T")[0],
          tipoContrato: ["Indefinido", "Temporario", "Pasantía"][
            Math.floor(Math.random() * 3)
          ],
          salarioBase: Math.floor(Math.random() * 50000 + 30000),
          salarioNeto: Math.floor(Math.random() * 45000 + 25000),
          obraSocial: ["OSDE", "Swiss Medical", "Galeno"][
            Math.floor(Math.random() * 3)
          ],
          art: ["ART 1", "ART 2", "ART 3"][Math.floor(Math.random() * 3)],
          puestoExacto: ["Operario Senior", "Analista Junior", "Supervisor"][
            Math.floor(Math.random() * 3)
          ],
          supervisor: "Juan Pérez",
          contactoEmergencia: {
            nombre: ["María Gómez", "Carlos Rodríguez", "Laura Fernández"][
              Math.floor(Math.random() * 3)
            ],
            relacion: ["Esposa", "Padre", "Hermano"][
              Math.floor(Math.random() * 3)
            ],
            telefono: "11" + Math.floor(Math.random() * 10000000 + 30000000),
          },
          vacaciones: {
            totalDias: 14,
            usados: Math.floor(Math.random() * 10),
            disponibles: 14 - Math.floor(Math.random() * 10),
          },
          equiposAsignados: [
            "Notebook",
            "Teléfono corporativo",
            "Herramientas especiales",
          ],
        };
      }
    }
  }
  

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleGuardarCambios = () => {
    setIsEditing(false);
  };

  const handleCancelarEdicion = () => {
    setIsEditing(false);
    setEditedEmpleado(empleadoToDisplay);
  };

  const [editedEmpleado, setEditedEmpleado] = useState<Empleado | undefined>(
    empleadoToDisplay || undefined
  );

  if (!empleadoToDisplay) {
    return <Mensaje>No se encontró información del empleado</Mensaje>;
  }

  const handleChange = (field: keyof Empleado, value: string | number) => {
    if (!editedEmpleado) return;
    setEditedEmpleado({ ...editedEmpleado, [field]: value });
  };

  const handleNestedChange = (
    parentField: keyof Empleado,
    field: string,
    value: string | number
  ) => {
    if (!editedEmpleado) return;
    setEditedEmpleado({
      ...editedEmpleado,
      [parentField]: {
        ...(editedEmpleado[parentField] as object),
        [field]: value,
      },
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <ModalContainer>
      <ModalHeader>
        <TitleContainer>
          <Title>
            {editedEmpleado?.name} {editedEmpleado?.surname}
          </Title>
          <RoleBadge>{editedEmpleado?.role}</RoleBadge>
          <CategoryBadge>Categoría: {editedEmpleado?.category}</CategoryBadge>
          <Legajo>Legajo: {editedEmpleado?.legajo || "xx-xxxxx-x"}</Legajo>
        </TitleContainer>
        <EditActionsWrapper
          isEditing={isEditing}
          onStartEdit={handleStartEditing}
          onConfirm={handleGuardarCambios}
          onCancel={handleCancelarEdicion}
        />
      </ModalHeader>

      <InfoSections>
        {/* Sección Información Personal */}
        <Section>
          <SectionTitle>Información Personal</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Edad</InfoLabel>
              <InfoValue>
              {editedEmpleado?.age || "N/A"}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Hijos</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="number"
                    value={editedEmpleado?.children || 0}
                    onChange={(e) =>
                      handleChange("children", parseInt(e.target.value))
                    }
                  />
                ) : (
                  editedEmpleado?.children || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>DNI</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="text"
                    value={editedEmpleado?.dni || ""}
                    onChange={(e) => handleChange("dni", e.target.value)}
                  />
                ) : (
                  editedEmpleado?.dni || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>CUIL</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="text"
                    value={editedEmpleado?.cuil || ""}
                    onChange={(e) => handleChange("cuil", e.target.value)}
                  />
                ) : (
                  editedEmpleado?.cuil || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
                <InfoLabel>Fecha de nacimiento</InfoLabel>
                <InfoValue>
                  {isEditing ? (
                    <StyledInput
                      type="date"
                      value={editedEmpleado?.birthdate ? new Date(editedEmpleado.birthdate).toISOString().split("T")[0] : ""}
                      onChange={(e) =>
                        handleChange("birthdate", e.target.value)
                      }
                    />
                  ) : (
                    editedEmpleado?.birthdate ? new Date(editedEmpleado.birthdate).toLocaleDateString() : "N/A"
                  )}
                </InfoValue>
              </InfoItem>

            <InfoItem fullWidth>
              <InfoLabel>Dirección</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="text"
                    value={editedEmpleado?.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                ) : (
                  editedEmpleado?.address || "N/A"
                )}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>

        {/* Sección Contacto */}
        <Section>
          <SectionTitle>Contacto</SectionTitle>
          <InfoGrid>
            <InfoItem fullWidth>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="email"
                    value={editedEmpleado?.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                ) : (
                  editedEmpleado?.email || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem fullWidth>
              <InfoLabel>Teléfono</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="tel"
                    value={editedEmpleado?.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                ) : (
                  editedEmpleado?.phone || "N/A"
                )}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>

        {/* Sección Información Laboral */}
        <Section>
          <SectionTitle>Información Laboral</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Puesto exacto</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="text"
                    value={editedEmpleado?.puestoExacto || ""}
                    onChange={(e) =>
                      handleChange("puestoExacto", e.target.value)
                    }
                  />
                ) : (
                  editedEmpleado?.puestoExacto || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Rol</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledSelect
                    value={editedEmpleado?.role || ""}
                    onChange={(e) => handleChange("role", e.target.value)}
                  >
                    <option value="Repartidor">Repartidor</option>
                    <option value="Chofer">Chofer</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Gerente">Gerente</option>
                  </StyledSelect>
                ) : (
                  editedEmpleado?.role || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Categoría</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledSelect
                    value={editedEmpleado?.category || ""}
                    onChange={(e) => handleChange("category", e.target.value)}
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </StyledSelect>
                ) : (
                  editedEmpleado?.category || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Fecha de ingreso</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="date"
                    value={editedEmpleado?.fechaIngreso || ""}
                    onChange={(e) =>
                      handleChange("fechaIngreso", e.target.value)
                    }
                  />
                ) : editedEmpleado?.fechaIngreso ? (
                  new Date(editedEmpleado.fechaIngreso).toLocaleDateString()
                ) : (
                  "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Tipo de contrato</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledSelect
                    value={editedEmpleado?.tipoContrato || ""}
                    onChange={(e) =>
                      handleChange("tipoContrato", e.target.value)
                    }
                  >
                    <option value="Indefinido">Indefinido</option>
                    <option value="Temporario">Temporario</option>
                    <option value="Pasantía">Pasantía</option>
                  </StyledSelect>
                ) : (
                  editedEmpleado?.tipoContrato || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Supervisor</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="text"
                    value={editedEmpleado?.supervisor || ""}
                    onChange={(e) => handleChange("supervisor", e.target.value)}
                  />
                ) : (
                  editedEmpleado?.supervisor || "N/A"
                )}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>

        {/* Sección Remuneración y Beneficios */}
        <Section>
          <SectionTitle>Remuneración y Beneficios</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Salario base</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="number"
                    value={editedEmpleado?.salarioBase || 0}
                    onChange={(e) =>
                      handleChange("salarioBase", parseFloat(e.target.value))
                    }
                  />
                ) : editedEmpleado?.salarioBase ? (
                  `$${editedEmpleado.salarioBase.toLocaleString()}`
                ) : (
                  "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Salario neto</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="number"
                    value={editedEmpleado?.salarioNeto || 0}
                    onChange={(e) =>
                      handleChange("salarioNeto", parseFloat(e.target.value))
                    }
                  />
                ) : editedEmpleado?.salarioNeto ? (
                  `$${editedEmpleado.salarioNeto.toLocaleString()}`
                ) : (
                  "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Obra social</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="text"
                    value={editedEmpleado?.obraSocial || ""}
                    onChange={(e) => handleChange("obraSocial", e.target.value)}
                  />
                ) : (
                  editedEmpleado?.obraSocial || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>ART</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="text"
                    value={editedEmpleado?.art || ""}
                    onChange={(e) => handleChange("art", e.target.value)}
                  />
                ) : (
                  editedEmpleado?.art || "N/A"
                )}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>

        {/* Sección Vacaciones */}
        <Section>
          <SectionTitle>Vacaciones</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Días totales</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="number"
                    value={editedEmpleado?.vacaciones?.totalDias || 0}
                    onChange={(e) =>
                      handleNestedChange(
                        "vacaciones",
                        "totalDias",
                        parseInt(e.target.value)
                      )
                    }
                  />
                ) : (
                  editedEmpleado?.vacaciones?.totalDias || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Días usados</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="number"
                    value={editedEmpleado?.vacaciones?.usados || 0}
                    onChange={(e) =>
                      handleNestedChange(
                        "vacaciones",
                        "usados",
                        parseInt(e.target.value)
                      )
                    }
                  />
                ) : (
                  editedEmpleado?.vacaciones?.usados || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Días disponibles</InfoLabel>
              <InfoValue>
                {editedEmpleado?.vacaciones?.disponibles ?? "N/A"}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>

        {/* Sección Contacto de Emergencia */}
        <Section>
          <SectionTitle>Contacto de Emergencia</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Nombre</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="text"
                    value={editedEmpleado?.contactoEmergencia?.nombre || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "contactoEmergencia",
                        "nombre",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  editedEmpleado?.contactoEmergencia?.nombre || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Relación</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="text"
                    value={editedEmpleado?.contactoEmergencia?.relacion || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "contactoEmergencia",
                        "relacion",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  editedEmpleado?.contactoEmergencia?.relacion || "N/A"
                )}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Teléfono</InfoLabel>
              <InfoValue>
                {isEditing ? (
                  <StyledInput
                    type="tel"
                    value={editedEmpleado?.contactoEmergencia?.telefono || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "contactoEmergencia",
                        "telefono",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  editedEmpleado?.contactoEmergencia?.telefono || "N/A"
                )}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>

        {/* Sección Equipos Asignados */}
        <Section>
          <SectionTitle>Equipos Asignados</SectionTitle>
          <InfoGrid>
            {editedEmpleado?.equiposAsignados?.map((equipo, index) => (
              <InfoItem key={index}>
                <InfoLabel>Equipo {index + 1}</InfoLabel>
                <InfoValue>
                  {isEditing ? (
                    <StyledInput
                      type="text"
                      value={equipo}
                      onChange={(e) => {
                        const newEquipos = [
                          ...(editedEmpleado.equiposAsignados || []),
                        ];
                        newEquipos[index] = e.target.value;
                        setEditedEmpleado({
                          ...editedEmpleado,
                          equiposAsignados: newEquipos,
                        });
                      }}
                    />
                  ) : (
                    equipo
                  )}
                </InfoValue>
              </InfoItem>
            ))}
            {isEditing && (
              <InfoItem fullWidth>
                <AddButton
                  onClick={() => {
                    if (editedEmpleado) {
                      setEditedEmpleado({
                        ...editedEmpleado,
                        equiposAsignados: [
                          ...(editedEmpleado.equiposAsignados || []),
                          "Nuevo equipo",
                        ],
                      });
                    }
                  }}
                >
                  + Agregar equipo
                </AddButton>
              </InfoItem>
            )}
          </InfoGrid>
        </Section>
      </InfoSections>
    </ModalContainer>
  );
};

// Estilos (igual que en la versión anterior)
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 95%;
  max-width: 900px;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 70vh;
  overflow-x: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  align-items: flex-start;
  position: sticky;
  top: 0;
  background: white;
  padding: 16px 0;
  z-index: 10;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f0f0f0;
`;

const TitleContainer = styled.div`
  flex: 1;
  background: white;
  position: absolute;
  width: 100%;
  height: 7rem;
  top: -25px;
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 28px;
  margin: 0;
  color: #333;
  font-weight: 600;
`;

const RoleBadge = styled.span`
  display: inline-block;
  background: #333;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 500;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background: #f0f0f0;
  color: #666;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  margin-top: 8px;
  margin-left: 8px;
  font-weight: 500;
`;

const Legajo = styled.span`
  display: block;
  color: #666;
  font-size: 14px;
  margin-top: 8px;
`;

const EditActionsWrapper = styled(Edit_Actions)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: all 0.2s;
  margin-bottom: 24px;

  svg {
    width: 30px;
    height: 30px;
  }

  &:hover {
    scale: 1.2;
  }

  &:active {
    transform: translateY(0);
  }
`;

const InfoSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 16px 0;
  color: #333;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 2px solid #e0e0e0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const InfoItem = styled.div<{ fullWidth?: boolean }>`
  ${({ fullWidth }) => fullWidth && `grid-column: 1 / -1;`}
`;

const InfoLabel = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 4px;
  font-weight: 500;
`;

const InfoValue = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  min-height: 24px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.2s;

  &:focus {
    border-color: #333;
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 107, 223, 0.2);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  background: white;
  transition: all 0.2s;

  &:focus {
    border-color: #333;
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 107, 223, 0.2);
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 8px;
  background: #f0f0f0;
  border: 1px dashed #ccc;
  border-radius: 6px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e0e0e0;
    border-color: #999;
  }
`;

const Mensaje = styled.div`
  font-size: 1rem;
  color: #999;
  padding: 2rem;
  text-align: center;
`;
