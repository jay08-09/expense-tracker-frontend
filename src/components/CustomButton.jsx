import Components from "../theme-ui/master-file";
const CustomButton = Components.styled(Components.Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  borderRadius: "0.375rem" /* rounded-md */,
  backgroundColor: theme.palette.indigo?.[600] || "#4f46e5" /* bg-indigo-600 */,
  padding: "0.375rem 0.75rem" /* px-3 py-1.5 */,
  fontSize: "0.875rem" /* text-sm */,
  fontWeight: 600 /* font-semibold */,
  color: "#fff" /* text-white */,
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" /* shadow-xs */,
  transition: "background-color 0.2s ease-in-out",
  fontVariant: "jis90",
  "&:hover": {
    backgroundColor: theme.palette.indigo?.[500] || "#6366f1" /* hover:bg-indigo-500 */,
  },
  "&:focus-visible": {
    outline: "2px solid",
    outlineOffset: "2px",
    outlineColor: theme.palette.indigo?.[600] || "#4f46e5" /* focus-visible:outline-indigo-600 */,
  },
}));

export default CustomButton;
