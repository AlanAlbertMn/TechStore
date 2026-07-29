'use client';

import { toast } from 'react-toastify';

export default function ToastComponent({ toastText }: { toastText: string }) {
	return toast.warn(toastText, {
		position: 'bottom-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	});
}
