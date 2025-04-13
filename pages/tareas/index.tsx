import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { useTasksLogic } from "@/hooks/tasks_handlers/useTasksLogic";
import { Tasks_Board } from "@/components/organisms/tasks/Tasks_Board";
import { Priority_View } from "@/components/organisms/tasks/Priority_View";
import { Add_Task_Modal } from "@/components/organisms/add_modals/Add_Task_Modal";
import { Task_Detail_Modal } from "@/components/molecules/modal_details/Task_Detail_Modal";
import { Task_Details } from "@/components/organisms/modals_details/tasks/Task_Detail";
import type { Task, Column } from "@/mock_data/tasks";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";



const Tasks: NextPage = () => {
  const [activeTab, setActiveTab] = useState<"all" | "prioridades">("all");

  const {
    columns,
    setColumns,
    selectedTask,
    isModalOpen,
    showDetailModal,
    openAddTaskModal,
    submitNewTask,
    openDetailModal,
    closeDetailModal,
    saveTaskChanges,
    updateStatus,
  } = useTasksLogic();

  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
          <Board_Wrapper>
            <Page_Title>Tasks</Page_Title>
            <Tabs_Container>
              <Tab_Button isActive={activeTab === "all"} onClick={() => setActiveTab("all")}>
                All Tasks
                {activeTab === "all" && <Underline />}
              </Tab_Button>
              <Tab_Button isActive={activeTab === "prioridades"} onClick={() => setActiveTab("prioridades")}>
                Prioridades
                {activeTab === "prioridades" && <Underline />}
              </Tab_Button>
            </Tabs_Container>

            {activeTab === "all" && (
              <Tasks_Board
                columns={columns}
                onColumnsChange={setColumns}
                onOpenAddTaskModal={openAddTaskModal}
                onOpenTaskDetail={openDetailModal}
              />
            )}

            {activeTab === "prioridades" && <Priority_View />}
          </Board_Wrapper>
        </Content_Area>
      </Main_Content>

      {isModalOpen && (
        <Add_Task_Modal
          onClose={closeDetailModal}
          onSubmit={submitNewTask}
        />
      )}

      {showDetailModal && selectedTask && (
        <Task_Detail_Modal isOpen onClose={closeDetailModal}>
          <Task_Details
            title={selectedTask.title}
            description={selectedTask.description || "Sin descripción"}
            priority={selectedTask.priority || "Sin prioridad"}
            status={selectedTask.status || "Paso 1"}
            assigned={selectedTask.assigned || "Sin asignar"}
            tag={selectedTask.tag || ""}
            dueDate={selectedTask.dueDate || new Date().toISOString()}
            onSaveChanges={saveTaskChanges}
            onStatusChange={updateStatus}
          />
        </Task_Detail_Modal>
      )}
    </Page_Container>
  );
};

const Page_Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  height: calc(100vh - ${Navbar_Height});
  overflow: hidden;
`;

const Main_Content = styled.div`
  display: flex;
  overflow: hidden;
  padding: 0px;
  flex-grow: 1;
`;

const Content_Area = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: start;
  justify-content: center;
  max-width: calc(100vw - ${Sidebar_Width});
  padding-top: 2rem;
  overflow-x: auto;
  overflow-y: hidden;
  margin-left: 5rem;
`;

const Page_Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--dark-blue);
`;

const Board_Wrapper = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  min-width: 800px;
  width: 90%;
`;

const Tabs_Container = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
`;

const Tab_Button = styled.button<{ isActive: boolean }>`
  position: relative;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: #000000;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, text-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    text-shadow: 0px 2px 6px rgb(235, 235, 235);
  }
`;

const Underline = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.2rem;
  height: 2px;
  background-color: #6c6c6c;
  border-radius: 2px;
`;

export default Tasks;
