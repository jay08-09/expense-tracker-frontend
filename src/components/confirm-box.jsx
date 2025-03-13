import React from "react";
import Components from "../theme-ui/master-file";

const ConfirmBox = (props) => {

    return (
        <>
            <Components.Dialog open={props.open} onClose={props.onclose}  >
                <Components.DialogContent>
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <Components.DialogContentText >{props.text}</Components.DialogContentText>
                </Components.DialogContent>

                <Components.DialogActions className="m-3">
                    <Components.Button size="small" onClick={props.onClose} variant="outlined">
                        No, cancel
                    </Components.Button>
                    <Components.Button
                        size="small"
                        onClick={() => { props.onConfirm(); props.onClose() }}
                        color="error" variant="contained"
                    >
                        Yes, I'm sure
                    </Components.Button>
                </Components.DialogActions>
            </Components.Dialog>
            
        </>
    )
}

export default ConfirmBox;