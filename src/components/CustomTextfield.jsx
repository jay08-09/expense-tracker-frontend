import { useState } from "react";
import Components from '../theme-ui/master-file'

export default function CustomTextField(props) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const IconAdornment = Components.Icons[props?.endadornmenticon]
    return (
        <div >
            <Components.FormLabel
                sx={{
                    color: 'oklch(0.21 0.034 264.665)',
                    fontSize: '14px',
                    fontWeight: '500',
                }}>{props?.label}
            </Components.FormLabel>
            <Components.TextField
                {...props}
                type={props?.type === "password" && showPassword ? "text" : props?.type} // Toggle for password
                variant="outlined"
                fullWidth
                label=''
                size="small"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        marginTop: '6px',
                        "& fieldset": {
                            borderColor: props?.error ? "red" : isFocused ? "var(--color-indigo-dark)" : "rgba(0, 0, 0, 0.23)", // Error -> Red, Focus -> Blue, Default -> Gray
                        },
                        "&:hover fieldset": {
                            borderColor: props?.error ? "red" : isFocused ? "var(--color-indigo-dark)" : "rgba(0, 0, 0, 0.5)", // Hover effect
                        },
                        "&.Mui-focused fieldset": {
                            borderWidth: "2px",
                            borderColor: props?.error ? "red" : "var(--color-indigo-dark)", // Keep red if error, otherwise blue on focus
                        },
                    },
                }}
                slotProps={{
                    input: {
                        endAdornment:
                            props?.type === "password" ? (
                                <Components.InputAdornment position="end">
                                    <Components.IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <Components.Icons.EyeOff size={20} /> : <Components.Icons.Eye size={20} />}
                                    </Components.IconButton>
                                </Components.InputAdornment>
                            ) : (
                                IconAdornment ? (
                                    <Components.InputAdornment position="end">
                                        <IconAdornment size={20} />
                                    </Components.InputAdornment>
                                ) : (
                                    ''
                                )
                            ),
                    },
                }}
            />
        </div>
    );
}
