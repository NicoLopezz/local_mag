import { FC, useState, useEffect, useRef, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { Search_Icon } from "@/components/atoms/icons/Search_Icon";
import { Close_Icon } from "@/components/atoms/icons/Close_Icon";
import { initialTasks } from "@/mock_data/tasks";

export interface User {
  id: number;
  name: string;
  image: string;
}

interface DynamicUserFilterProps {
  onUsersSelected: (users: User[]) => void;
}

const slideDown = keyframes`
  from { opacity: 0; max-height: 0 }
  to { opacity: 1; max-height: 300px }
`;

export const Dynamic_User_Filter: FC<DynamicUserFilterProps> = ({ 
  onUsersSelected
}) => {
  const getUniqueAssignedUsers = useMemo(() => {
    const assignedNames = initialTasks
      .flatMap(column => column.tasks)
      .map(task => task.assigned)
      .filter((name): name is string => !!name);

    return [...new Set(assignedNames)].map((name, index) => ({
      id: index + 1,
      name,
      image: "/images/empleados/persona.png"
    }));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const MAX_DISPLAY = 3;
  const defaultAvatars = getUniqueAssignedUsers.slice(0, MAX_DISPLAY);
  const hasMoreUsers = getUniqueAssignedUsers.length > MAX_DISPLAY;

  useEffect(() => {
    onUsersSelected(selectedUsers);
  }, [selectedUsers, onUsersSelected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        if (isSearching) {
          setSearchTerm("");
          setIsSearching(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearching]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setFilteredUsers(
    getUniqueAssignedUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, getUniqueAssignedUsers]);

  const toggleUser = (user: User) => {
    const newSelectedUsers = selectedUsers.some(u => u.id === user.id)
      ? selectedUsers.filter(u => u.id !== user.id)
      : [...selectedUsers, user].slice(0, MAX_DISPLAY);
    
    setSelectedUsers(newSelectedUsers);
  };

  const removeUser = (userId: number) => {
    const newSelectedUsers = selectedUsers.filter(u => u.id !== userId);
    setSelectedUsers(newSelectedUsers);
  };

  const clearSelection = () => {
    setSelectedUsers([]);
    setSearchTerm("");
    setIsSearching(false);
  };

  return (
    <FixedWidthContainer ref={wrapperRef}>
      <Title>Tasks</Title>
      
      <FilterStatus>
        {selectedUsers.length ? (
          <>
            <StatusText>off {selectedUsers.length}</StatusText>
            <AvatarStack>
              {selectedUsers.map((user, i) => (
                <Avatar
                  key={user.id}
                  $stacked
                  $offset={i * 15}
                  onClick={() => removeUser(user.id)}
                >
                  <UserImage
                    src={user.image}
                    width={30}
                    height={30}
                    alt={user.name}
                  />
                  {selectedUsers.length > MAX_DISPLAY && i === MAX_DISPLAY - 1 && (
                    <ExtraCount>+{selectedUsers.length - MAX_DISPLAY}</ExtraCount>
                  )}
                </Avatar>
              ))}
            </AvatarStack>
            <ClearButton onClick={clearSelection}>
              <Close_Icon/>
            </ClearButton>
          </>
        ) : (
          <>
            <StatusText>off all</StatusText>
            <AvatarStack>
              {defaultAvatars.map((user, i) => (
                <Avatar key={user.id} $stacked $offset={i * 15}>
                  <UserImage
                    src={user.image}
                    width={30}
                    height={30}
                    alt={user.name}
                  />
                </Avatar>
              ))}
              {hasMoreUsers && (
                <MoreIndicator>...</MoreIndicator>
              )}
            </AvatarStack>
          </>
        )}
      </FilterStatus>

      <SearchWrapper>
        <SearchBox $expanded={isSearching && filteredUsers.length > 0}>
          <SearchIcon>
            <Search_Icon/>
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Filter users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm && setIsSearching(true)}
          />
        </SearchBox>

        {isSearching && (
          <Dropdown>
            {filteredUsers.map(user => (
              <UserOption
                key={user.id}
                onClick={() => toggleUser(user)}
                $selected={selectedUsers.some(u => u.id === user.id)}
              >
                <UserImage
                  src={user.image}
                  width={28}
                  height={28}
                  alt={user.name}
                />
                <UserName>{user.name}</UserName>
                {selectedUsers.some(u => u.id === user.id) && (
                  <SelectedMark>✓</SelectedMark>
                )}
              </UserOption>
            ))}
            
            {filteredUsers.length === 0 && (
              <EmptyMessage>No matching users</EmptyMessage>
            )}
          </Dropdown>
        )}
      </SearchWrapper>
    </FixedWidthContainer>
  );
};

const FixedWidthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 650px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--dark-blue);
  margin: 0;
  min-width: 80px;
`;

const FilterStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  border-radius: 20px;
  padding: 6px 12px;
  height: 40px;
`;

const StatusText = styled.span`
  font-size: 0.9rem;
  color: #555;
  margin-right: 6px;
`;

const AvatarStack = styled.div`
  position: relative;
  height: 32px;
  width: ${3 * 15 + 30}px;
`;

const Avatar = styled.div<{ $stacked?: boolean; $offset?: number }>`
  position: ${({ $stacked }) => $stacked ? 'absolute' : 'relative'};
  left: ${({ $offset }) => `${$offset}px`};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  background: #e9ecef;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: ${({ $offset }) => 3 - ($offset || 0)/15};

  &:hover {
    transform: translateY(-2px);
    z-index: 10;
  }
`;

const ExtraCount = styled.span`
  position: absolute;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: 0.7rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MoreIndicator = styled.span`
  position: absolute;
  left: ${3 * 15}px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  color: #6c757d;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 200px;
`;

const SearchBox = styled.div<{ $expanded: boolean }>`
  position: relative;
  border: 1px solid #ddd;
  border-radius: ${({ $expanded }) => $expanded ? '10px 10px 5px 5px' : '10px 10px 0px 0px '};
  background: white;
  transition: all 0.3s ease;
`;

const SearchInput = styled.input`
border: 1px solid #ddd;
  width: 100%;
  padding: 8px 16px 8px 36px;
  border: none;
  outline: none;
  font-size: 0.9rem;
  background: transparent;
  border-radius: 10px 10px 0px 0px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
`;

const Dropdown = styled.div`
  position: absolute;
  width: 198px;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 10px 10px;
  animation: ${slideDown} 0.3s ease-out;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  z-index: 10;
`;

const UserOption = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  background: ${({ $selected }) => $selected ? '#f0f8ff' : 'white'};
  transition: background 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

const UserImage = styled(Image)`
  object-fit: cover;
`;

const UserName = styled.span`
  margin-left: 10px;
  font-size: 0.9rem;
  color: #495057;
  flex-grow: 1;
`;

const SelectedMark = styled.span`
  color: #4a90e2;
  font-weight: bold;
`;

const EmptyMessage = styled.div`
  padding: 12px;
  font-size: 0.85rem;
  color: #6c757d;
  text-align: center;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #adb5bd;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
  margin-left: 4px;
  padding: 4px;

  &:hover {
    color: #495057;
  }
`;