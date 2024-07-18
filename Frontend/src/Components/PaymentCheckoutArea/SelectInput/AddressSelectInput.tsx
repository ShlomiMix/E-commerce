// SelectInput.tsx
import { RegisterOptions, useFormContext } from "react-hook-form";
import { Autocomplete, Theme, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled, lighten, darken } from "@mui/system";

interface GroupHeaderProps {
  theme: Theme;
}

const GroupHeader = styled("div")<GroupHeaderProps>(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme?.palette?.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});


export interface SelectInputProps<T> {
  name: string;
  label: string;
  fieldName: keyof T ;
  options: T[];
  registerOptions?: RegisterOptions;
  defaultValue:T
  disabled?: boolean;
  onChange: (selectedOption: T) => void; // Corrected type for onChange
}

export function AddressSelectInput<T>({
  label,
  name,
  options = [],
  registerOptions,
  defaultValue,
  fieldName,
  disabled,
  onChange,
}: SelectInputProps<T>): JSX.Element {
  const { register, setValue } = useFormContext();
  const theme = useTheme();

  const sortedOptions = options.sort((a, b) =>
    String(a[fieldName]).charAt(0).localeCompare(String(b[fieldName]).charAt(0))
  );
  return (
    <Autocomplete
    className="xxs:w-74 mb-2 mt-2 ml-6"
    disabled={disabled}
    autoComplete={false}
    options={sortedOptions}
    groupBy={(option) => String(option[fieldName]).charAt(0)}
    getOptionLabel={(option) => String(option[fieldName])}
    isOptionEqualToValue={(option, value) => option[fieldName] === value[fieldName]}
    // sx={{ width: 400, marginTop: 2 }}
    value={defaultValue ? defaultValue : null}
    onChange={(event, newValue) => {
      setValue(name , newValue?.[fieldName] || "");
      if (newValue) {
        onChange(newValue as T);
      }
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        // {...register(name, registerOptions)}
      />
    )}
    renderGroup={(params) => (
      <li key={params.key}>
        <GroupHeader theme={theme}>{params.group}</GroupHeader>
        <GroupItems>{params.children}</GroupItems>
      </li>
    )}
  />
  );
}
