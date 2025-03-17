import { useState } from "react";
import Components from "../theme-ui/master-file";

export default function CustomSelectBox(props) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div>
            <Components.FormLabel
                sx={{
                    color: "oklch(0.21 0.034 264.665)",
                    fontSize: "14px",
                    fontWeight: "500",
                }}
            >
                {props?.label}
            </Components.FormLabel>

            <Components.Select
                {...props}
                label=''
                variant="outlined"
                fullWidth
                size="small"
                displayEmpty
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                // error={!!props?.error} // Apply error state
                defaultValue={''}
                sx={{
                    borderRadius: "8px",
                    marginTop: "6px",
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: props?.error
                                ? "red"
                                : isFocused
                                    ? "var(--color-indigo-dark)"
                                    : "rgba(0, 0, 0, 0.23)", // Error -> Red, Focus -> Blue, Default -> Gray
                        },
                        "&:hover fieldset": {
                            borderColor: props?.error
                                ? "red"
                                : isFocused
                                    ? "var(--color-indigo-dark)"
                                    : "rgba(0, 0, 0, 0.5)", // Hover effect
                        },
                        "&.Mui-focused fieldset": {
                            borderWidth: "2px",
                            borderColor: props?.error ? "red" : "var(--color-indigo-dark)", // Keep red if error, otherwise blue on focus
                        },
                    },
                }}
            >
                <Components.MenuItem disabled value="">
                    {props?.placeholder || "Select an option"}
                </Components.MenuItem>
                {props?.options?.map((option) => (
                    <Components.MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </Components.MenuItem>
                ))}
            </Components.Select>
            {/* ✅ Correct way to display error messages */}
            {props?.error && (
                <Components.FormHelperText
                    sx={{
                        color: "red",
                        fontSize: '0.75rem',
                        marginTop: '4px',
                        marginLeft: '14px',
                        marginRight: '14px',
                        fontWeight: 400,
                    }}>
                    {props.errormessage}
                </Components.FormHelperText>
            )
            }

        </div >
    );
}
