import { FC, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Calendar, Trash2, Save } from "lucide-react";

interface Props {
  title: string;
  description: string;
  priority: string;
  status: string;
  assigned: string;
  tag: string;
  onStatusChange: (newStatus: string) => void;
  onSaveChanges: (updatedTask: {
    title: string;
    description: string;
    priority: string;
    status: string;
    assigned: string;
    tag: string;
    endDate: Date;
  }) => void;
}

export const Task_Details: FC<Props> = ({
  title,
  description,
  priority,
  status,
  assigned,
  tag,
  onSaveChanges,
}) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(
    description || "Sin descripción"
  );
  const [editedPriority, setEditedPriority] = useState(priority || "-");
  const [editedAssigned, setEditedAssigned] = useState(assigned || "-");
  const [editedTags, setEditedTags] = useState(tag);
  const [editedStatus, setEditedStatus] = useState<
    keyof typeof statusSteps | ""
  >("");
  const [endDate, setEndDate] = useState(new Date());
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const ResponsiveSection = styled(Section)`
    @media (max-height: 700px) {
      margin-top: 2rem;
    }
  `;

  const hasChanges =
    editedTitle !== title ||
    editedDescription !== description ||
    editedPriority !== priority ||
    editedAssigned !== assigned ||
    editedTags !== tag ||
    editedStatus !== status;

  useEffect(() => {
    const randomDays = Math.floor(Math.random() * 10) + 1;
    const randomFutureDate = new Date();
    randomFutureDate.setDate(randomFutureDate.getDate() + randomDays);
    setEndDate(randomFutureDate);
    setEditedStatus(status as keyof typeof statusSteps);
  }, [status]);

  useEffect(() => {
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysRemaining(days);
  }, [endDate]);

  const statusSteps = {
    "Paso 1": 1,
    "Paso 2": 2,
    "Paso 3": 3,
    "Paso 4": 4,
  };

  const step = editedStatus ? statusSteps[editedStatus] : 0;
  const fillPercent = step > 0 ? ((step - 1) / 3) * 100 : 0;

  const handleSave = () => {
    const updatedTask = {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      status: editedStatus,
      assigned: editedAssigned,
      tag: editedTags,
      endDate,
    };
    onSaveChanges?.(updatedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log("Eliminar tarea");
  };

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring" }}
    >
      <TopRow>
        {isEditing ? (
          <TitleInput
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <Title>{editedTitle}</Title>
        )}
        <EditIcon onClick={() => setIsEditing(!isEditing)}>
          <Pencil size={18} />
        </EditIcon>
      </TopRow>

      <StepProgress>
        <StepTrack />
        {step > 0 && (
          <StepFill
            initial={{ width: 0 }}
            animate={{ width: `${fillPercent}%` }}
            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          />
        )}
        {[1, 2, 3, 4].map((s, idx) => (
          <StepContainer key={s} style={{ left: `${idx * 33.3333}%` }}>
            <StepLabel active={step >= s}>Paso {s}</StepLabel>
            <StepCircle
              animate={{
                backgroundColor: step >= s ? "#4c4b4b" : "#fff",
                boxShadow: step >= s ? "0 0 22px rgba(0, 0, 0, 0.4)" : "none",
                scale: step === s ? 1.2 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
          </StepContainer>
        ))}
      </StepProgress>

      <Section>
        <ResponsiveSection>
          <Label>Descripción</Label>
          <TextArea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            disabled={!isEditing}
          />
        </ResponsiveSection>
      </Section>

      <Row>
        <Section>
          <Label>Prioridad</Label>
          <Select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            disabled={!isEditing}
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </Select>
        </Section>

        <Section>
          <Label>Estado</Label>
          <Select
            value={editedStatus}
            onChange={(e) =>
              setEditedStatus(e.target.value as keyof typeof statusSteps)
            }
            disabled={!isEditing}
          >
            <option value="">Seleccionar</option>
            <option value="Paso 1">Paso 1</option>
            <option value="Paso 2">Paso 2</option>
            <option value="Paso 3">Paso 3</option>
            <option value="Paso 4">Paso 4</option>
          </Select>
        </Section>

        <Section>
          {isEditing ? (
            <>
              <Label>New date</Label>
              <DateInput
                type="date"
                value={endDate.toISOString().split("T")[0]}
                onChange={(e) => {
                  setEndDate(new Date(e.target.value));
                  setIsEditing(true);
                }}
              />
            </>
          ) : (
            <Countdown>
              <Label>Fin de tarea</Label>
              <span>{endDate.toLocaleDateString()}</span>
              <Restan>Restan {daysRemaining} días</Restan>
            </Countdown>
          )}
        </Section>
      </Row>

      <Row as={motion.div} layout style={{ flexDirection: "column" }}>
        <Section as={motion.div} layout>
          <Row
            style={{
              alignItems: "center",
              minHeight: "2.2rem",
              marginBottom: "-0.5rem",
            }}
          >
            <Label as={motion.span}>Asignado a</Label>
            {editedAssigned && (
              <ChipContainer>
                <Chip>
                  {editedAssigned}
                  {isEditing && (
                    <Remove onClick={() => setEditedAssigned("")}>×</Remove>
                  )}
                </Chip>
              </ChipContainer>
            )}
          </Row>

          <AnimatePresence mode="wait">
            {isEditing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
              >
                <Input
                  type="text"
                  placeholder="Presione Enter para agregar nombre"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (e.currentTarget.value.trim()) {
                        setEditedAssigned(e.currentTarget.value.trim());
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Section>

        <Section as={motion.div} layout>
          <Row
            style={{
              alignItems: "center",
              minHeight: "2.2rem",
              marginBottom: "-0.5rem",
            }}
          >
            <Label as={motion.span}>Etiquetas</Label>
            {editedTags.length > 0 && (
              <ChipContainer>
                {editedTags.split(",").map((tag, i) => (
                  <Chip key={i}>
                    {tag.trim()}
                    {isEditing && (
                      <Remove
                        onClick={() =>
                          setEditedTags(
                            editedTags
                              .split(",")
                              .filter((t) => t.trim() !== tag.trim())
                              .join(",")
                          )
                        }
                      >
                        ×
                      </Remove>
                    )}
                  </Chip>
                ))}
              </ChipContainer>
            )}
          </Row>

          <AnimatePresence mode="wait">
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.9 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
              >
                <Input
                  type="text"
                  placeholder="Presioná Enter para agregar etiquetas"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (
                        value &&
                        !editedTags
                          .split(",")
                          .map((t) => t.trim())
                          .includes(value)
                      ) {
                        setEditedTags(
                          editedTags ? `${editedTags},${value}` : value
                        );
                      }
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Section>
      </Row>

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

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding-right: 8px;
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
  font-size: 1.2rem;
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

const StepProgress = styled.div`
  margin-left: 2rem;
  width: 80%;
  position: relative;
  height: 4rem;
  display: flex;
  align-items: center;
`;

const StepTrack = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  height: 3px;
  background: #ddd;
  border-radius: 4px;
  z-index: 0;
`;

const StepFill = styled(motion.div)`
  position: absolute;
  top: 2rem;
  left: 0;
  height: 3px;
  background: #4c4b4b;
  border-radius: 4px;
  transform-origin: left;
  z-index: 1;
`;

const StepContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
  z-index: 2;
`;

const StepCircle = styled(motion.div)`
  margin-top: 0.2rem;
  width: 15px;
  height: 15px;
  border: 2px solid #4c4b4b;
  border-radius: 50%;
  background-color: white;
`;

const StepLabel = styled.span<{ active?: boolean }>`
  font-size: 12px;
  margin-bottom: 6px;
  color: ${({ active }) => (active ? "#000" : "#333")};
  font-weight: ${({ active }) => (active ? 600 : 200)};
  text-align: center;
  min-width: 48px;
`;

const Section = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled(motion.span)`
  font-weight: 400;
  color: #444;
`;

const TextArea = styled.textarea`
  resize: none;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  font-family: inherit;
  font-style: italic;
  color: #807c7c;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-family: inherit;
`;

const Row = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  width: 90%;
`;

const Countdown = styled.div`
  font-size: 16px;
  color: var(--dark-blue);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  transition: all 0.3s ease;
`;

const Restan = styled.span`
  font-size: 13px;
  font-style: italic;
  color: #444;
  transition: all 0.3s ease;
`;

const DateInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-family: inherit;
  width: fit-content;
  transition: all 0.3s ease;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
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
  background-color: #000000;
  height: auto;
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

const slideInTag = keyframes`
  0% {
    transform: translateY(8px) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const ChipContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  /* gap: 0.5rem; */
  /* animation: ${slideInTag} 0.3s ease; */
`;

const Chip = styled.div`
  background: #000000a1;
  color: #fff;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 400;
  border-radius: 4px;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${slideInTag} 0.3s ease;
`;

const Remove = styled.span`
  cursor: pointer;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-family: inherit;
  width: 90%;
  transition: all 0.3s ease;
  /* margin-top: -0.rem; */
`;

const TextStatic = styled(motion.div)`
  padding: 10px 0;
  font-size: 14px;
  color: #333;
`;

const TagText = styled(motion.div)`
  padding: 10px 0;
  font-size: 14px;
  color: #333;
  white-space: pre-wrap;
`;
