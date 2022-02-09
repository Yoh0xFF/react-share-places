import axios from 'axios';

import { AppError } from '../models/error';

const API_KEY = process.env.GOOGLE_MAP_SDK_JS_API_KEY;

export async function getCoordinatesForAddress(
  address: string
): Promise<{ lat: number; lng: number }> {
  let encodedAddress = encodeURIComponent(address);
  const urlQueryParams = `key=${API_KEY}&address=${encodedAddress}`;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?${urlQueryParams}`;

  const data = (await axios.get(url)).data;
  if (!data) {
    throw new AppError(500, 'Internal server error');
  }
  if (data && data.status == 'REQUEST_DENIED') {
    throw new AppError(422, data.error_message);
  }
  if (data && data.status == 'ZERO_RESULTS') {
    throw new AppError(
      422,
      'Could not find location for the specified address.'
    );
  }

  return data.results[0].geometry.location;
}
