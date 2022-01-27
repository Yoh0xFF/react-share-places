import React from 'react';
import './UsersList.css';
import {User} from '@app/type/user';
import UserItem from '@app/ui/users/components/UserItem';

interface UsersListProps {
  items: Array<User>;
}

export default function UsersList(props: UsersListProps): JSX.Element {
  if (!props.items.length) {
    return (
      <div className='center'>
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <ul className='users-list'>
      {props.items.map(user => <UserItem key={user.id} user={user}/>)}
    </ul>
  );
}
