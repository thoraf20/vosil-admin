import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster} from 'react-hot-toast'
import { deleteSavingData } from '../../redux/actions/savings';
import { deleteExcess } from '../../redux/actions/excess';


const DeleteExcess = ({onClose, id}) => {
  const dispatch = useDispatch()

  const excess = useSelector((state) => state.excess)
  const { loading, success, error } = excess

  const notify = () => toast.success("Excess Savings successfully deleted", {duration: 6000})
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
    dispatch(deleteExcess(id))
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
          { loading ? 'Deleting' : 'Delete' }
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

export default DeleteExcess