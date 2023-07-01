'use client';

import {Toaster} from "react-hot-toast";

export default function ToasterContext() {
	return (
		<Toaster toastOptions={{position: 'bottom-right'}}/>
	)
}