/** @jsxImportSource @emotion/react */
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserListStore } from '../store/userListStore';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { css } from '@emotion/react';
import { RequiredLabel } from '../formStyles/requiredLabel'

interface UserEntity {
  name: string;
  userName: string;
  email: string;
  phone: string;
  status: 'active' | 'not active'| '';
}
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  userName: Yup.string()
    .required('Username is required')
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/, 'Username must be at least 6 characters, with letters and numbers'),
  email: Yup.string().required('Email is required').email('Invalid email address'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(/^\d{10,}$/, 'Phone must be at least 10 digits'),
    status: Yup.string()
    .oneOf(['active', 'not active', ''], 'Invalid status') // قبول مقادیر 'active', 'not_active' و مقدار خالی
    .required('Status is required'), 
})
const inputStyle = css({
  backgroundColor: '#f9f9f9',
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  cursor: 'text',
  ':hover': { backgroundColor: '#f2f2f2' },
  fontSize: '1rem',
  fontWeight: 'bold',
  outline: 'none',
  fontFamily: 'inherit',
  color: 'inherit',
  boxSizing: 'border-box',
  marginBottom: '1rem',
  width: '100%',
  marginLeft: '0',
  border: '1px solid #ccc',
})

const UserForm = () => {
  const { id } = useParams<{ id: string }>(); // دریافت ID از URL
  const navigate = useNavigate();
  const users = useUserListStore((state) => state.users);
  const addUser = useUserListStore((state) => state.addUser);
  const updateUser = useUserListStore((state) => state.updateUser);
  const deleteUser = useUserListStore((state) => state.deleteUser);
  const userToEdit = id ? users.find((user) => user.id === id) : null;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserEntity>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: UserEntity) => {
    if (id) {
      updateUser({ ...data, id });
    } else {
      addUser({ ...data, id: uuidv4() });
    }
    reset();
    navigate('/users');
  };

  const handleDelete = () => {
    if (id) {
      deleteUser(id);
      navigate('/users');
    }
  };

  useEffect(() => {
    if (userToEdit) {
      reset(userToEdit);
    }
  }, [userToEdit, reset]);
  return (
  <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',     
        height: '100vh',         
        flexDirection: 'column',  
      }}
>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1
        css={{
          textAlign: 'center',
          margin: '0 auto',
          marginBottom:'2rem',    
          width: 'fit-content', 
        }}>{id ? 'Edit User' : 'Create User'}</h1>
      <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            backgroundColor: '#f9f9f9',
          }}
        >
              <div
              css={{
                flex: '1 1 20%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
               >
      <RequiredLabel text="Name"/>
      <input {...register('name')}  css={inputStyle} />
      <p css={{ color: 'red', fontSize: '0.9rem' }}>{errors.name?.message}</p>
    </div>
          <div css={{
                flex: '1 1 20%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
            <RequiredLabel text="UserName"/>
            <input {...register('userName')} css={inputStyle}/>
            <p css={{ color: 'red', fontSize: '0.9rem' }}>{errors.userName?.message}</p>
          </div>
          <div css={{
                flex: '1 1 20%',
                display: 'flex',
                flexDirection: 'column', 
                gap: '0.5rem',
              }}>
            <RequiredLabel text="Email"/>
            <input {...register('email')} css={inputStyle}/>
            <p css={{ color: 'red', fontSize: '0.9rem' }}>{errors.email?.message}</p>
          </div>
          <div css={{
                flex: '1 1 20%',
                display: 'flex',
                flexDirection: 'column', 
                gap: '0.5rem',
              }}>
            <RequiredLabel text="Phone"/>
            <input {...register('phone')} css={inputStyle}/>
            <p css={{ color: 'red', fontSize: '0.9rem' }}>{errors.phone?.message}</p>
          </div>
          <div css={{
                flex: '1 1 20%',
                display: 'flex',
                flexDirection: 'column', 
                gap: '0.5rem',
              }}>
            <RequiredLabel text="Status"/>
            <select {...register('status')} css={[
                inputStyle,
                {
                  maxWidth:'calc(100% - 60rem)'
                },
              ]}>
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="not active">Not Active</option>
            </select>
            <p css={{ color: 'red', fontSize: '0.9rem' }}>{errors.status?.message}</p>
          </div>
        </div>
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            backgroundColor: '#f9f9f9',
            marginTop:'4rem',
            justifyContent: 'flex-end',
          }}
        >
        <button
          type="submit"
          css={{
            backgroundColor: '#000000',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 3rem',
            cursor: 'pointer',
            borderRadius: '0.5rem',
            ':hover': { backgroundColor: '#45a049' },
          }}
        >
          Submit
        </button>
        {id && (
          <button
            type="button"
            onClick={handleDelete}
            css={{
              backgroundColor: '#ff4d4f',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 3rem',
              cursor: 'pointer',
              borderRadius: '0.5rem',
              ':hover': { backgroundColor: '#ff7875' },
            }}
          >
            Delete
          </button>
          )}
        </div>
    </form>
    </div>
  );
};

export default UserForm;
