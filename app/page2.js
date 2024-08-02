// 'use client';
// import { useState, useEffect } from "react";
// import {  setDoc, getDoc, collection, doc, getDocs, deleteDoc } from "firebase/firestore";
// import { firestore } from "../firebase";
// import Box from '@mui/material/Box';
// import { Button, Modal, Stack, TextField } from "@mui/material";
// import Typography from '@mui/material/Typography';

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [itemName, setItemName] = useState('');

//   const updatedInventory = async () => {
//     const docs = await getDocs(collection(firestore, "inventory"));
//     const inventoryList = [];
//     docs.forEach((doc) => {
//       inventoryList.push({
//         name: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   const addItems = async (item) => {
//     const docRef = doc(collection(firestore, 'inventory'), item);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       await setDoc(docRef, { quantity: quantity + 1 });
//     } else {
//       await setDoc(docRef, { quantity: 1 });
//     }
//     await updatedInventory();
//   };

//   const removeItems = async (item) => {
//     const docRef = doc(firestore, 'inventory', item);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity === 1) {
//         await deleteDoc(docRef);
//       } else {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       }
//     }
//     await updatedInventory();
//   };

//   useEffect(() => {
//     updatedInventory();
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <Box width="100vw" height="100vh" display="flex"
//       flexDirection="column"
//       justifyContent="center" alignItems="center" gap={2}>

//       <Modal open={open} onClose={handleClose}>
//         <Box position="absolute" top="50%" left="50%"
//           width={400} bgcolor="white" gap={3}
//           border="2px solid #000" boxShadow={24} p={4} display="flex"
//           flexDirection="column" sx={{ transform: "translate(-50%,-50%)" }}>
//           <Typography variant="h6">Add Items</Typography>
//           <Stack width="100%" direction="row" spacing={2}>
//             <TextField
//               variant="outlined" fullWidth value={itemName}
//               onChange={(e) => {
//                 setItemName(e.target.value);
//               }}
//             />
//             <Button variant="outlined"
//               onClick={() => {
//                 addItems(itemName);
//                 setItemName('');
//                 handleClose();
//               }}>Add</Button>
//           </Stack>
//         </Box>
//       </Modal>

//       <Button variant="contained" onClick={handleOpen}>Add New Items</Button>
      
//       <Box border="1px solid #333"> 
//         <Box width="800px" height="100px" bgcolor="#ADD8E6"
//           justifyContent="center" alignItems="center" display="flex">
//           <Typography variant="h3" color="#333">Inventory Items</Typography>
//         </Box>
//       <Stack width="100%" height="300px" spacing={2} overflow="auto">
//         {inventory.map(({ name, quantity }) => (
//           <Box key={name} width="70" minHeight="150px" bgcolor="#f0f0f0" 
//             display="flex" justifyContent="center" alignItems="center">
//             <Typography variant="h4" style={{ marginRight: '20px' }}>{name} </Typography>
//             <Typography variant="h4" style={{ marginRight: '20px' }}> {quantity}</Typography>
//                 <Stack direction="row" spacing={2}>
//                  <Button variant="contained" onClick={() => addItems(name)}>Add</Button>
//                 <Button variant="contained" onClick={() => removeItems(name)}>Remove</Button>
//                 </Stack>
//           </Box>
//         ))}
//       </Stack>
//       </Box>
//     </Box>
//   );
// }