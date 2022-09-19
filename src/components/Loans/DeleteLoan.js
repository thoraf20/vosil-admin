import  React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster} from 'react-hot-toast'
import { deleteLoan } from '../../redux/actions/loan';


const DeleteLoan = ({onClose, id}) => {
  const dispatch = useDispatch()

  const loan = useSelector((state) => state.loans)
  const { loading, success, error, message } = loan

  const notify = () => toast.success(` ${message}`, {duration: 6000})
  const notifyFailure = () => toast.error(
    `${error}`, {duration: 6000}
  )

  useEffect(() => {
    if (error) {
      notifyFailure()
    }
    if (success) {
      notify()
    }
  }, [success, error])

  const handleDelete = async () => {
    dispatch(deleteLoan(id))
    setTimeout(() => {
      onClose()
    }, 4000);
  }

  return (
    <React.Fragment>
    <Toaster  />
    <div className='item-center mt-4'>
      <div className='flex justify-between'>
        <button
        type="button"
        onClick={handleDelete}
        style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
        className="text-sm text-white px-10 py-4 hover:drop-shadow-xl hover:bg-light-gray"
        >
          Confirm
      </button>
      <button
        type="button"
        onClick={onClose}
        style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
        className="text-sm text-white px-10 hover:drop-shadow-xl hover:bg-light-gray"
        >
          Cancel
      </button> 
      </div>
    </div>
    </React.Fragment>
  )
}

export default DeleteLoan