import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDialogProps {
    onConfirm: () => void;
    onClose: () => void;
    open: boolean;

    title: string;
    confirmText: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({onConfirm, open, onClose, title, confirmText}) => {

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    { title }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { confirmText }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} aria-label="button_confirm_no">
                        Нет
                    </Button>
                    <Button onClick={onConfirm} autoFocus aria-label="button_confirm_yes">
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}