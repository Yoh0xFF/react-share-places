import React from 'react';

import { fakeUsers } from '@app/fake-data/users-data';
import { User } from '@app/type/user';
import UsersList from '@app/ui/users/components/UsersList';

function Users(): JSX.Element {
  const users: Array<User> = fakeUsers;

  return <UsersList items={users} />;
}

export default Users;
