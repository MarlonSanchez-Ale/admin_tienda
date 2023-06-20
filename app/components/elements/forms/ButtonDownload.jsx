
import { toastService } from '@/app/services/toast.service';
import { useState } from 'react';
import { Tooltip, IconButton } from "@material-tailwind/react";
import { RiArrowDownCircleLine } from "react-icons/ri";

const download = require('downloadjs');
export default ButtonDownload;


function ButtonDownload({ jsObjArray, filename, workbookOptions }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        let request = {
            jsObjArray: jsObjArray,
            workbookOptions: workbookOptions
        };

        setIsLoading(true);

        let res = await fetch(`/api/Export/getXlsx`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const blob = await res.blob();
        download(blob, `${filename}.xlsx`, "application/vnd.ms-excel");

        setIsLoading(false);
    }


    return (
        <Tooltip title="Descargar">
            <IconButton color='green' onClick={handleClick}>
                <RiArrowDownCircleLine />
            </IconButton>
        </Tooltip>
    )
}