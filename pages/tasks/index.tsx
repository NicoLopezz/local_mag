import type { NextPage } from "next";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useTasksLogic } from "@/hooks/tasks_handlers/useTasksLogic";
import { Tasks_Board } from "@/components/organisms/tasks/Tasks_Board";
import { Priority_View } from "@/components/organisms/tasks/Priority_View";
import { Add_Task_Modal } from "@/components/organisms/add_modals/Add_Task_Modal";
import { Task_Detail_Modal } from "@/components/molecules/modal_details/Task_Detail_Modal";
import { Task_Details } from "@/components/organisms/modals_details/tasks/Task_Detail";
import { Dynamic_User_Filter } from "@/components/molecules/tasks/search_user/Dynamic_User_Filter";
import { Filter_Container } from "@/components/molecules/tasks/tab_section/Filter_Container";
import { useLang } from "@/context/Language_Context";

const Navbar_Height = "1rem";
const Sidebar_Width = "1rem";

type Priority = "Baja" | "Media" | "Alta";

interface User {
  id: number;
  name: string;
  image: string;
}

const Tasks: NextPage = () => {
  const [activeTab, setActiveTab] = useState<"all" | "prioridades">("all");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [showPriorityFilter, setShowPriorityFilter] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowPriorityFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePriority = (priority: Priority) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  const removePriority = (priority: Priority) => {
    setSelectedPriorities((prev) => prev.filter((p) => p !== priority));
  };

  const clearAllPriorities = () => {
    setSelectedPriorities([]);
  };

  const getFilteredColumns = () => {
    let filtered = [...columns];

    if (selectedUsers.length > 0) {
      filtered = filtered.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) =>
          selectedUsers.some((user) =>
            task.assigned?.toLowerCase().includes(user.name.toLowerCase())
          )
        ),
      }));
    }

    if (selectedPriorities.length > 0) {
      filtered = filtered.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) =>
          selectedPriorities.includes(task.priority as Priority)
        ),
      }));
    }

    return filtered;
  };

  const filteredColumns = getFilteredColumns();
  const { t } = useLang();


  return (
    <Page_Container>
      <Main_Content>
        <Content_Area>
          <Board_Wrapper>
            <Title_Wrapper>
              <Dynamic_User_Filter onUsersSelected={setSelectedUsers} />
            </Title_Wrapper>

            <Tabs_Container>
              <Center_Wrapper>
                <Filter_Container
                  selectedPriorities={selectedPriorities}
                  onTogglePriority={togglePriority}
                  onRemovePriority={removePriority}
                  onClearAllPriorities={clearAllPriorities}
                  showPriorityFilter={showPriorityFilter}
                  setShowPriorityFilter={setShowPriorityFilter}
                />
              </Center_Wrapper>

              <Tab_Wrapper>
                <Tab_Button
                  isActive={activeTab === "all"}
                  onClick={() => setActiveTab("all")}
                >
                  {t.tasks.allTasks}
                  {activeTab === "all" && <Underline />}
                </Tab_Button>
                <Tab_Button
                  isActive={activeTab === "prioridades"}
                  onClick={() => setActiveTab("prioridades")}
                >
                  {t.tasks.priorities}
                  {activeTab === "prioridades" && <Underline />}
                </Tab_Button>
              </Tab_Wrapper>
            </Tabs_Container>

            {activeTab === "all" && (
              <Tasks_Board
                columns={filteredColumns}
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
          onSubmit={(task) =>
            submitNewTask({
              ...task,
              priority: task.priority as Priority,
              dueDate: task.dueDate || new Date().toISOString(),
            })
          }
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
            onStatusChange={(newStatus) =>
              updateStatus(selectedTask.id, newStatus)
            }
            onSaveChanges={(updatedData) => {
              saveTaskChanges({
                ...selectedTask,
                title: updatedData.title,
                description: updatedData.description,
                priority: updatedData.priority as Priority,
                status: updatedData.status,
                assigned: updatedData.assigned,
                tag: updatedData.tag,
                dueDate: updatedData.dueDate,
                endDate: new Date(updatedData.dueDate),
              });
            }}
            onDelete={() => {
              // Add your delete logic here
              console.log(`Task with ID ${selectedTask.id} deleted`);
            }}
          />
        </Task_Detail_Modal>
      )}
    </Page_Container>
  );

};

const Filter_Content = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 9999999;
`;

const Selected_Priorities = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Priority_Pill = styled.div`
  display: flex;
  align-items: center;
  background-color: #e7e7e7;
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.icon};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  gap: 0.25rem;
`;

const Remove_Priority = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.icon};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  line-height: 1;
  margin-left: 0.25rem;

  &:hover {
    color: #ff4d4f;
  }
`;

const Clear_All = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.icon};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  color: #6c6c6c;
  text-decoration: underline;

  &:hover {
    color: #ff4d4f;
  }
`;

const Priority_Filter_Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
  z-index: 10;
  min-width: 150px;
  margin-top: 0.5rem;
`;

const Priority_Filter_Option = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Checkbox = styled.div<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid #6c6c6c;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ checked }) => (checked ? "#6c6c6c" : "transparent")};

  &::after {
    content: "✓";
    display: ${({ checked }) => (checked ? "block" : "none")};
    color: ${({ theme }) => theme.colors.icon};
    font-size: ${({ theme }) => theme.fontSizes.text}px;
  }
`;

const Page_Container = styled.div`
  display: flex;
  width: 100%;
  height: 100dvh;
  flex-direction: column;
  height: calc(100vh - ${Navbar_Height});
  overflow: hidden;
`;

const Main_Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  /* padding: 0px; */
  /* flex-grow: 1; */
`;

const Content_Area = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: start;
  justify-content: center;
  max-width: calc(100vw - ${Sidebar_Width});
  padding-top: 2rem;
  overflow: hidden;
  margin-left: 5rem;
`;


const Board_Wrapper = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  min-width: 800px;
  width: 90%;
`;

const Title_Wrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.icon};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
`;

const Tabs_Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.contenedores};
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  border-radius: 10px 10px 0px 0px;
`;

const Center_Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Filter_Button = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? "#6c6c6c" : "#b7b7b738")};
  color: ${({ isActive, theme }) =>
  isActive ? theme.colors.title : "white"};

  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: none;
  text-align: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.icon};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #6c6c6c;
    color: red;
  }
`;

const Tab_Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const Tab_Button = styled.button<{ isActive: boolean }>`
  position: relative;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.icon};
  font-size: ${({ theme }) => theme.fontSizes.text}px;
  cursor: pointer;
  transition: transform 0.2s ease, text-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    /* text-shadow: 0px 2px 6px rgb(235, 235, 235); */
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
