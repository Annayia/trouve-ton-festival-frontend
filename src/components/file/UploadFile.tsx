'use client';

import { useState } from 'react';
import {
  ApiService,
  FileParameter,
  UserGetDto,
} from '../../services/api.service';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { UploadTypesEnum } from '@/utils/enums/upload-type';
import ToolBoxService from '@/services/toolbox.service';
import { ImageFileExtensionEnum } from '@/utils/enums/file-extension';
import { useUserContext } from '@/utils/contexts/UserContext';

const formatFileAcceptedType = (acceptedTypes: string[]): string => {
  let fileTypes: string[] = [];

  acceptedTypes.forEach((fileType: any) => {
    let mediaFileTypeEqImg = Object.keys(ImageFileExtensionEnum)[
      Object.values(ImageFileExtensionEnum).indexOf(fileType)
    ];
    if (!ToolBoxService.stringIsNullOrWhiteSpace(mediaFileTypeEqImg))
      fileTypes.push(mediaFileTypeEqImg);
  });

  return fileTypes.join(', ');
};

interface UploadFileComponentProps {
  title: string;
  contentText?: string;
  uploadType: UploadTypesEnum;
  acceptedFileExtension: string[];
  handleOnClose: () => void;
}

export default function UploadFileComponent(props: UploadFileComponentProps) {
  const apiService: ApiService = new ApiService();
  const [selectedFile, setSelectedFile] = useState<File>();
  const { userDataLoggedIn, setUserDataLoggedIn } = useUserContext();

  const onSubmit = async () => {
    if (!selectedFile) return;
    if (!props.acceptedFileExtension.includes(selectedFile.type)) {
      console.log('file extension not accepted');
      return;
    }
    try {
      const fileParams: FileParameter = {
        data: selectedFile,
        fileName: selectedFile.name,
      };

      switch (props.uploadType) {
        case UploadTypesEnum.userAvatar:
          const updatedUser: UserGetDto =
            await apiService.userUploadAvatar(fileParams);
          setUserDataLoggedIn(updatedUser);
          break;

        default:
          break;
      }

      props.handleOnClose();
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <Dialog open={true} onClose={props.handleOnClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        {props.contentText ? (
          <DialogContentText>{props.contentText}</DialogContentText>
        ) : (
          <></>
        )}
        <TextField
          type="file"
          inputProps={{
            accept: props.acceptedFileExtension.join(','),
          }}
          onChange={(e: any) => {
            if (e.target.files.length > 0) setSelectedFile(e.target.files[0]);
          }}
          fullWidth
          required
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleOnClose}>Annuler</Button>
        <Button onClick={onSubmit}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
}
