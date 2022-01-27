import React from 'react';
import './UserItem.css';
import {User} from '@app/type/user';

interface UserItemProps {
  user: User;
}

export default function UserItem(props: UserItemProps): JSX.Element {
  const { user } = props;

  return (
    <li className='user-item'>
      <div className='user-item__content'>
        <div className='user-item__image'>
          <img src={user.image} alt={user.name}/>
        </div>

        <div className='user-item__name'>
          <h2>{user.name}</h2>
          <h3>
            {user.places} {user.places === 1 ? 'place' : 'places'}
          </h3>
        </div>
      </div>
    </li>
  );
}
