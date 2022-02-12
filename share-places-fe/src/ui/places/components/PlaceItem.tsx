import React, { useContext, useState } from 'react';

import './PlaceItem.css';

import { Place } from '@app/type/place';
import Button from '@app/ui/shared/components/form-elements/Button';
import Card from '@app/ui/shared/components/ui-elements/Card';
import ErrorModal from '@app/ui/shared/components/ui-elements/ErrorModal';
import LoadingSpinner from '@app/ui/shared/components/ui-elements/LoadingSpinner';
import Map from '@app/ui/shared/components/ui-elements/Map';
import Modal from '@app/ui/shared/components/ui-elements/Modal';
import { AuthContext } from '@app/ui/shared/context/auth-context';
import { useHttpClient } from '@app/ui/shared/hooks/http-hook';

export interface PlaceItemProps {
  place: Place;
  onDelete: (placeId: string) => void;
}

export default function PlaceItem(props: PlaceItemProps): JSX.Element {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { place, onDelete } = props;

  const toggleMapHandler = () => setShowMap(!showMap);

  const toggleShowConfirmHandler = () => setShowConfirm(!showConfirm);

  const confirmDeleteHandler = async () => {
    setShowConfirm(false);

    try {
      await sendRequest(
        `http://localhost:8080/api/places/${place.id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      onDelete(place.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showMap}
        onCancel={toggleMapHandler}
        header={place.address}
        contentClassName='place-item__modal-content'
        footerClassName='place-item__modal-actions'
        footer={<Button onClick={toggleMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={place.location} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirm}
        onCancel={toggleShowConfirmHandler}
        header='Are you sure?'
        footerClassName='place-item__modal-actions'
        footer={
          <>
            <Button inverse onClick={toggleShowConfirmHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              CONFIRM
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>

      <li className='place-item'>
        <Card className='place-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img
              src={`http://localhost:8080/${place.image}`}
              alt={place.title}
            />
          </div>
          <div className='place-item__info'>
            <h2>{place.title}</h2>
            <h3>{place.address}</h3>
            <p>{place.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={toggleMapHandler}>
              VIEW ON MAP
            </Button>

            {auth.userId === place.creator && (
              <Button to={`/places/${place.id}`}>EDIT</Button>
            )}

            {auth.userId === place.creator && (
              <Button danger onClick={toggleShowConfirmHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}
