import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import Button from './Button';
import './ImageUpload.css';

import { InputHandlerType } from '@app/ui/shared/hooks/form-hook';

export interface ImageUploadProps {
  id: string;
  center?: boolean;
  errorText?: string;
  onInput: InputHandlerType;
}

export default function ImageUpload(props: ImageUploadProps): JSX.Element {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  const pickedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    let fileIsValid = false;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      fileIsValid = true;
    }

    setFile(pickedFile);
    setIsValid(fileIsValid);
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <>
      <div className='form-control'>
        <input
          id={props.id}
          ref={filePickerRef}
          type='file'
          style={{ display: 'none' }}
          accept='.jpg,.jpeg,.png'
          onChange={pickedHandler}
        />

        <div className={`image-upload ${props.center && 'center'}`}>
          <div className='image-upload__preview'>
            {previewUrl && <img src={previewUrl} alt='preview' />}
            {!previewUrl && <p>Please pick an image.</p>}
          </div>

          <Button type='button' onClick={pickImageHandler}>
            PICK IMAGE
          </Button>
        </div>

        {!isValid && <p>{props.errorText}</p>}
      </div>
    </>
  );
}
