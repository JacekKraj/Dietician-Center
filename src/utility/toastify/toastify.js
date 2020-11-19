import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import classes from './toastify.module.scss'

export const showSuccessToast = message => {
    toast.info(`${message}`, {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        className: classes.successToast
    })
}

export const showFailToast = message => {
    toast.error(`${message}`, {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
    })
}