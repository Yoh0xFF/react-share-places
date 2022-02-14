import { Place } from '@app/types/place';

export interface User {
  id: string;
  image: string;
  name: string;
  places: Array<Place>;
}
