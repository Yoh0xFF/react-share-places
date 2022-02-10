export interface Place {
  id: string;
  creator: string;

  imageUrl: string;
  title: string;
  description: string;

  address: string;
  location: {
    lat: number;
    lng: number;
  };
}
