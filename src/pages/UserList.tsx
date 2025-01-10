/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { useUserListStore } from '../store/userListStore';


const UserList = () => {
  const navigate = useNavigate();
  const users = useUserListStore((state)=>state.users);

  return (
    <div>
      <h1
      css={{
        textAlign:'center',
        margin:'2rem'
      }}>
        <span style={{ fontWeight: 'bold' }}>List</span>{' '}
        <span style={{ fontWeight: 'normal' }}>Item</span>
      </h1>
      <div
        css={{
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
            marginBottom: '1rem',
          }}>
            <div
            css={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
            <span
            css={{
              fontWeight:'bold'
            }}>Items</span>
            <a onClick={() => navigate('/users/create')}
              css={{
                backgroundColor:'#000000',
                color:'#FFFFFF',
                border: '1px solid #ddd',
                padding: '0.5rem',
                cursor:'pointer',
                ":hover":{backgroundColor:'#141414'},
                borderRadius: '0.5rem',
              }}>Add New Item +</a>
            </div>
            <table
                css={{
                width: '100%',
                marginTop: '1rem',
                borderCollapse: 'collapse',
                'th, td': {
                    border: '1px solid #D9D9D9',
                    padding: '0.5rem',
                },
                th: { backgroundColor: '#FFFFFF' },
                }}
            >
                
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
              <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                    <td>
                      <span
                        css={{
                          padding: '0.3rem 0.5rem',
                          borderRadius: '1rem',
                          backgroundColor: user.status === 'active' ? '#EBFFF1' : '#FCEEEE',
                          color: user.status === 'active' ? '#0FBD66' : '#DC362E',
                          fontWeight: 'inherit',
                        }}
                      >
                        {user.status}
                      </span>
                    </td>
                <td
                css={{
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  gap:'0.5rem',
                }}>
                  <button
                    css={{
                      backgroundColor: '#ff4d4f',
                      color: '#fff',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      borderRadius: '0.5rem',
                      ':hover': { backgroundColor: '#ff7875' },
                    }}
                    onClick={() => useUserListStore.getState().deleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    css={{
                      backgroundColor: '#0d5f85',
                      color: '#fff',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      borderRadius: '0.5rem',
                      ':hover': { backgroundColor: '#1280b3' },
                    }}
                    onClick={() => navigate(`/users/edit/${user.id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
                </tbody>
            </table>
      </div>
    </div>
  );
};

export default UserList;
