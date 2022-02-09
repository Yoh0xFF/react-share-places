import { Place } from '@app/type/place';

export interface User {
  id: string;
  image: string;
  name: string;
  places: Array<Place>;
}
