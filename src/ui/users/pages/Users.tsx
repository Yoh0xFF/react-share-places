import React from 'react';
import UsersList from "@app/ui/users/components/UsersList";
import { User } from "@app/type/user";

function Users(): JSX.Element {
  const users: Array<User> = [{
    id: 1,
    name: 'Dennis Ritchie',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dennis_Ritchie_2011.jpg/440px-Dennis_Ritchie_2011.jpg',
    places: 0,
  }];

  return (
    <UsersList items={users}/>
  );
}

export default Users;
