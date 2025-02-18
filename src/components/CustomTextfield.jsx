import { useState } from "react";
import { useForm } from "react-hook-form";
import Components from '../theme-ui/master-file'

export default function CustomTextField(props) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: { errors },
    } = useForm();

    return (
        <div >
            <Components.FormLabel
                sx={{
                    color: 'oklch(0.21 0.034 264.665)',
                    fontSize: '14px',
                    fontWeight: '500',
                }}>{props?.label}</Components.FormLabel>
            <Components.TextField
                {...register(props?.name, props?.rules)}
                {...props}
                type={props?.type === "password" && showPassword ? "text" : props?.type} // Toggle for password
                variant="outlined"
                fullWidth
                label=''
                size="small"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                error={!!errors[props?.name]}
                helperText={errors[props?.name]?.message}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        marginTop: '6px',
                        "& fieldset": {
                            borderColor: isFocused ? "blue" : "rgba(0, 0, 0, 0.23)", // Default & Focus border
                        },
                        "&:hover fieldset": {
                            borderColor: isFocused ? "blue" : "rgba(0, 0, 0, 0.5)", // Hover effect
                        },
                        "&.Mui-focused fieldset": {
                            borderWidth: "2px",
                            borderColor: "blue", // Focus effect
                        },
                    },
                }}
                slotProps={{
                    input: {
                        endAdornment:
                            props?.type === "password" && (
                                <Components.InputAdornment position="end">
                                    <Components.IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <Components.Icons.EyeOff size={20} /> : <Components.Icons.Eye size={20} />}
                                    </Components.IconButton>
                                </Components.InputAdornment>
                            ),
                    },
                }}
            />
        </div>
    );
}
