import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoMdClose } from 'react-icons/io'
import { Divider } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  outline: 'none',
  py: 2,
  px: 2,
};

const BasicModal = ({open, onClose, ...props}) => {

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{overflow: 'scroll'}}
      >
        <Box sx={style}>
        <div className='flex justify-between'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <IoMdClose onClick={onClose} style={{cursor: 'pointer'}}/>
        </div>
        <Divider />
        <div className='w-full'>
          {props.content}
        </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal