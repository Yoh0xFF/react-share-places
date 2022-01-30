import { User } from '@app/type/user';

export interface Place {
  id: number;
  creator: number;

  imageUrl: string;
  title: string;
  description: string;

  address: string;
  location: {
    lat: number;
    lng: number;
  };
}
