'use client';
import { useState, useEffect } from "react";
import { setDoc, getDoc, collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updatedInventory = async () => {
    const docs = await getDocs(collection(firestore, "inventory"));
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItems = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updatedInventory();
  };

  const removeItems = async (item) => {
    const docRef = doc(firestore, 'inventory', item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updatedInventory();
  };

  useEffect(() => {
    updatedInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pantry Tracker
          </Typography>
          <Button color="inherit" onClick={handleOpen}>Add New Item</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Inventory Items
          </Typography>
          <Stack spacing={2}>
            {inventory.map(({ name, quantity }) => (
              <Paper key={name} elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">{name}</Typography>
                  <Typography variant="body1">Quantity: {quantity}</Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <IconButton color="primary" onClick={() => addItems(name)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => removeItems(name)}>
                    <RemoveIcon />
                  </IconButton>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <Box position="absolute" top="50%" left="50%"
          width={400} bgcolor="white" gap={3}
          border="2px solid #000" boxShadow={24} p={4} display="flex"
          flexDirection="column" sx={{ transform: "translate(-50%,-50%)" }}>
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined" fullWidth value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <Button variant="contained"
              onClick={() => {
                addItems(itemName);
                setItemName('');
                handleClose();
              }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

