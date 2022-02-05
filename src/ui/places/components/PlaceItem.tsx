import React, { useState } from 'react';

import './PlaceItem.css';

import { Place } from '@app/type/place';
import Button from '@app/ui/shared/components/form-elements/Button';
import Card from '@app/ui/shared/components/ui-elements/Card';
import Map from '@app/ui/shared/components/ui-elements/Map';
import Modal from '@app/ui/shared/components/ui-elements/Modal';

interface PlaceItemProps {
  place: Place;
}

export default function PlaceItem(props: PlaceItemProps): JSX.Element {
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { place } = props;

  const toggleMapHandler = () => setShowMap(!showMap);

  const toggleShowConfirmHandler = () => setShowConfirm(!showConfirm);

  const confirmDeleteHandler = () => {
    setShowConfirm(false);
    console.log('DELETING...');
  };

  return (
    <>
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
          <div className='place-item__image'>
            <img src={place.imageUrl} alt={place.title} />
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
            <Button to={`/places/${place.id}`}>EDIT</Button>
            <Button danger onClick={toggleShowConfirmHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
}
