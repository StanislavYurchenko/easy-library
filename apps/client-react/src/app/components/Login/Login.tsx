import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { login, userToken } from '../../services/auth';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Login(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(() => false);
  const [email, setEmail] = useState<string>(() => '');
  const [password, setPassword] = useState<string>(() => '');

  const handleOpen = (): void => {
    setShowModal(() => true);
  };

  const handleClose = (): void => {
    setShowModal(() => false);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(() => e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(() => e.target.value);
  };

  const handleSubmit = (): void => {
    login({ email, password }).then(({ data }) => {
      if (data) userToken.set(data.accessToken);
    });
  };

  return (
    <>
      <Button sx={{ color: '#fff' }} onClick={handleOpen}>
        Login
      </Button>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                required
                value={email}
                onChange={handleEmail}
              />
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                required
                value={password}
                onChange={handlePassword}
              />
              <Button sx={{ color: '#fff' }} onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
