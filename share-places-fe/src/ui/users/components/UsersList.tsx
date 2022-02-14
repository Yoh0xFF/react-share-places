import React from 'react';

import './UsersList.css';

import { User } from '@app/types/user';
import Card from '@app/ui/shared/components/ui-elements/Card';
import UserItem from '@app/ui/users/components/UserItem';

export interface UsersListProps {
  items: Array<User>;
}

export default function UsersList(props: UsersListProps): JSX.Element {
  if (!props.items.length) {
    return (
      <div className='center'>
        <Card>
          <div className='users-list-empty'>
            <h2>No users found.</h2>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <ul className='users-list'>
      {props.items.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
