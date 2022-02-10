import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Place } from '@app/type/place';
import PlaceList from '@app/ui/places/components/PlaceList';
import ErrorModal from '@app/ui/shared/components/ui-elements/ErrorModal';
import LoadingSpinner from '@app/ui/shared/components/ui-elements/LoadingSpinner';
import { AuthContext } from '@app/ui/shared/context/auth-context';
import { useHttpClient } from '@app/ui/shared/hooks/http-hook';

export default function UserPlaces(): JSX.Element {
  const auth = useContext(AuthContext);
  const { userId } = useParams();
  const [places, setPlaces] = useState<Array<Place>>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/api/places/user/${userId}`
        );

        setPlaces(responseData.places);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaces();
  }, [userId, sendRequest]);

  const onDeleteHandler = (placeId: string) => {
    setPlaces(places?.filter((x) => x.id !== placeId));
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && (
        <PlaceList
          showShareButton={userId === auth.userId}
          places={places}
          onDelete={onDeleteHandler}
        />
      )}
    </>
  );
}
