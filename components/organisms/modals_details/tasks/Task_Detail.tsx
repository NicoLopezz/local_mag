import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Task_Header_EditDetail } from "@/components/molecules/tasks/editDetail/Task_Header_EditaTable";
import { Task_Stepper_EditDetail } from "@/components/molecules/tasks/editDetail/Task_Stepper_EditDetail";
import { Task_Description_EditDetail } from "@/components/molecules/tasks/editDetail/Task_Description_EditDetail";
import { Task_Metadata_EditDetail } from "@/components/molecules/tasks/editDetail/Task_Metadata_EditDetail";
import { Task_Assigned_EditDetail } from "@/components/molecules/tasks/editDetail/Task_Assigned_EditDetail";
import { Task_Tags_EditDetail } from "@/components/molecules/tasks/editDetail/Task_Tag_EditDetail";
import { Task_Actions_EditDetail } from "@/components/molecules/tasks/editDetail/Task_Actions_Editable";

interface Props {
  title: string;
  description: string;
  priority: string;
  status: string;
  assigned: string;
  tag: string;
  dueDate: string;
  onDelete: () => void;
  onStatusChange: (newStatus: string) => void;
  onSaveChanges: (updatedTask: {
    title: string;
    description: string;
    priority: string;
    status: string;
    assigned: string;
    tag: string;
    endDate: Date;
    dueDate: string;
  }) => void;
}

export const Task_Details: FC<Props> = ({
  title,
  description,
  priority,
  status,
  assigned,
  tag,
  dueDate,
  onDelete,
  onStatusChange,
  onSaveChanges,
}) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description || "Sin descripción");
  const [editedPriority, setEditedPriority] = useState(priority || "-");
  const [editedAssigned, setEditedAssigned] = useState(assigned || "-");
  const [editedTags, setEditedTags] = useState(tag);
  const [editedStatus, setEditedStatus] = useState<keyof typeof statusSteps | "">("");
  const [endDate, setEndDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (dueDate) {
      const parsed = new Date(dueDate);
      if (!isNaN(parsed.getTime())) {
        setEndDate(parsed);
      }
    }
    setEditedStatus(status as keyof typeof statusSteps);
  }, [status, dueDate]);

  const statusSteps = {
    "Paso 1": 1,
    "Paso 2": 2,
    "Paso 3": 3,
    "Paso 4": 4,
  };

  const hasChanges =
    editedTitle !== title ||
    editedDescription !== description ||
    editedPriority !== priority ||
    editedAssigned !== assigned ||
    editedTags !== tag ||
    editedStatus !== status;

  const step = editedStatus ? statusSteps[editedStatus] : 0;

  const handleSave = () => {
    onSaveChanges({
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      status: editedStatus,
      assigned: editedAssigned,
      tag: editedTags,
      endDate,
      dueDate: endDate.toISOString(),
    });
    setIsEditing(false);
  };

  return (
    <Container>
      <Task_Header_EditDetail
        isEditing={isEditing}
        title={editedTitle}
        onChange={setEditedTitle}
        onToggleEdit={() => setIsEditing(!isEditing)}
      />

      <Task_Stepper_EditDetail step={step} />

      <Task_Description_EditDetail
        description={editedDescription}
        isEditing={isEditing}
        onChange={setEditedDescription}
      />

      <Task_Metadata_EditDetail
        isEditing={isEditing}
        priority={editedPriority}
        status={editedStatus}
        endDate={endDate}
        onPriorityChange={setEditedPriority}
        onStatusChange={(val: string) => setEditedStatus(val as keyof typeof statusSteps)}
        onEndDateChange={setEndDate}
        statusSteps={statusSteps}
      />

      <Task_Assigned_EditDetail
        isEditing={isEditing}
        assigned={editedAssigned}
        onChange={setEditedAssigned}
      />

      <Task_Tags_EditDetail
        isEditing={isEditing}
        tags={editedTags}
        onChange={setEditedTags}
      />

      <Task_Actions_EditDetail
        showSave={hasChanges && isEditing}
        onSave={handleSave}
        onDelete={onDelete}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding-right: 8px;
`;
