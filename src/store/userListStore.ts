import { create } from 'zustand';

interface UserEntity {
    id: string;
    name: string;
    userName: string;
    email: string;
    phone: string;
    status: 'active' | 'not active' | '';
  }
  
  interface UserStore {
    users: UserEntity[];
    addUser: (user: UserEntity) => void;
    updateUser: (updatedUser: UserEntity) => void;
    deleteUser:(id:string)=>void;
  }
  
  export const useUserListStore = create<UserStore>((set) => {
    const savedUsers = localStorage.getItem('users');
    const initialUsers: UserEntity[] = savedUsers
    ? JSON.parse(savedUsers)
    : [
        { id: '1', name: 'John Doe', userName: 'john123', email: 'john@example.com', phone: '1234567890', status: 'active' },
        { id: '2', name: 'Jane Smith', userName: 'jane321', email: 'jane@example.com', phone: '0987654321', status: 'not active' },
      ];

  return {
    users: initialUsers,

    addUser: (user) =>
      set((state) => {
        const updatedUsers = [...state.users, user];
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // ذخیره در LocalStorage
        return { users: updatedUsers };
      }),

    updateUser: (updatedUser) =>
      set((state) => {
        const updatedUsers = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // ذخیره در LocalStorage
        return { users: updatedUsers };
      }),

    deleteUser: (id) =>
      set((state) => {
        const updatedUsers = state.users.filter((user) => user.id !== id);
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // ذخیره در LocalStorage
        return { users: updatedUsers };
      }),
  };
});