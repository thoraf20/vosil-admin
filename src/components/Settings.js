// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import moment from 'moment'

// import { Header } from '../components';

// const Setting = () => {

//   const [state, setState] = useState('')

//   const handleChange = (event) => {
//     const { name, value } = event.target
//     setState({...state, [name]: value});
//   };

//   const date = moment().format('yyyy-MM-DD')

//   console.log(date)

//   return (
//     <div>
//       <Header category="Settings" title="Date" />
//       <TextField
//         id="date"
//         label="Date"
//         type="date"
//         defaultValue={date}
//         sx={{ width: 220 }}
//         onChange={handleChange}
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <div className='flex justify-end'>
//       <button
//             type="button"
//             onClick={"handleSubmit"}
//             style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
//             className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
//           >
//             Update
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Setting;

