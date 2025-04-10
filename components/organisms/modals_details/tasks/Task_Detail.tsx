import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Pencil, Calendar, Trash2, Save } from "lucide-react";

interface Props {
  title: string;
  description: string;
  priority: string;
  status: string;
}



export const Task_Details: FC<Props> = ({ title, description, priority, status }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description || "Sin descripción");
  const [editedPriority, setEditedPriority] = useState(priority || "Media");
  const [editedStatus, setEditedStatus] = useState(status || "Pendiente");
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const hasChanges =
    editedTitle !== title ||
    editedDescription !== description ||
    editedPriority !== priority ||
    editedStatus !== status;

  useEffect(() => {
    const randomDays = Math.floor(Math.random() * 10) + 1;
    const randomProgress = Math.floor(Math.random() * 100);
    setDaysRemaining(randomDays);
    setProgress(randomProgress);
  }, []);

  const handleSave = () => {
    console.log("Guardar cambios:", {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      status: editedStatus,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log("Eliminar tarea");
  };

  return (
    <Container as={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
      <TopRow>
        {isEditing ? (
          <TitleInput value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
        ) : (
          <Title>{editedTitle}</Title>
        )}
        <EditIcon onClick={() => setIsEditing(!isEditing)}>
          <Pencil size={18} />
        </EditIcon>
      </TopRow>

      <ProgressBarWrapper>
        <ProgressBarInner style={{ width: `${progress}%` }} />
      </ProgressBarWrapper>

      <Section>
        <Label>Descripción</Label>
        <TextArea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          disabled={!isEditing}
        />
      </Section>

      <Row>
        <Section>
          <Label>Prioridad</Label>
          <Select value={editedPriority} onChange={(e) => setEditedPriority(e.target.value)} disabled={!isEditing}>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </Select>
        </Section>

        <Section>
          <Label>Estado</Label>
          <Select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} disabled={!isEditing}>
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completado">Completado</option>
          </Select>
        </Section>
      </Row>

      <Section>
        <Label>Tiempo restante</Label>
        <Countdown>
          <Calendar size={12} /> {daysRemaining} días
        </Countdown>
      </Section>

      <Actions>
        {hasChanges && isEditing && (
          <Button onClick={handleSave}>
            <Save size={16} style={{ marginRight: 6 }} /> Guardar
          </Button>
        )}
        <DeleteButton onClick={handleDelete}>
          <Trash2 size={16} style={{ marginRight: 6 }} /> Eliminar
        </DeleteButton>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  width: 100%;
  transition: all 0.25s ease;
`;

const TitleInput = styled.input`
  font-size: 1.3rem;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  font-family: inherit;
  color: #444444b8;
  transition: all 0.25s ease;
`;

const EditIcon = styled.div`
  padding: 4px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  &:hover {
    background: #f0f0f0;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  background: var(--strong-green);
  transition: width 0.4s ease;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-weight: 400;
  color: #444;
`;

const TextArea = styled.textarea`
  resize: none;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-family: inherit;
`;

const Row = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Countdown = styled.div`
  font-size: 16px;
  color: var(--dark-blue);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #000000e4;
  color: white;
  font-weight: 400;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1c3aa9;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  font-weight: 400;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #d32f2f;
  }
`;
