import { FC, useState } from "react";
import styled from "styled-components";
import { Priority_List } from "@/components/organisms/tasks/Priority_List";
import { Priority_Details } from "@/components/molecules/tasks/Priority_Details";
import { AnimatePresence, motion } from "framer-motion";


interface Task {
  id: string;
  title: string;
  description: string;
}

export const Priority_View: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
        id: "1",
        title: "Inventar un nuevo framework",
        description: "Que sea igual a los demás, pero con un logo más lindo.",
      },
      {
        id: "2",
        title: "Hacer que compile",
        description: "No importa cómo, pero que ande.",
      },
      {
        id: "3",
        title: "Agregar animaciones innecesarias",
        description: "Porque smooth > performance.",
      },
      {
        id: "4",
        title: "Ignorar todos los warnings",
        description: "Si no los veo, no existen.",
      },
      {
        id: "5",
        title: "Publicar en Product Hunt",
        description: "Con un GIF con fueguito para más impacto.",
      },
      {
        id: "6",
        title: "Actualizar el readme",
        description: "Solo el título, nadie lee más allá.",
      },
      {
        id: "7",
        title: "Recibir una estrella en GitHub",
        description: "Sentirse famoso por 3 minutos.",
      }
      
  ]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleSelectTask = (id: string) => setSelectedTaskId(id);
  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  return (
    <Container>
      <Left>
        <Priority_List
          tasks={tasks}
          setTasks={setTasks}
          onSelect={handleSelectTask}
          selectedId={selectedTaskId}
        />
      </Left>
      <Right>
        <AnimatePresence mode="wait">
          {!selectedTask && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <EmptyMessage>
                <h3>Seleccione una tarea</h3>
                <p>
                  Haga clic en una tarea a la izquierda para ver sus detalles.
                </p>
              </EmptyMessage>
            </motion.div>
          )}

          {selectedTask && (
            <motion.div
              key={selectedTask.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <Priority_Details task={selectedTask} />
            </motion.div>
          )}
        </AnimatePresence>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
`;

const Left = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 2;
`;

const EmptyMessage = styled.div`
  background: #ffffff;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  color: #64748b;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #334155;
  }

  p {
    font-size: 1rem;
  }
`;

