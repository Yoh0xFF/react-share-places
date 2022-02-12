export interface Place {
  id: string;
  creator: string;

  image: string;
  title: string;
  description: string;

  address: string;
  location: {
    lat: number;
    lng: number;
  };
}
