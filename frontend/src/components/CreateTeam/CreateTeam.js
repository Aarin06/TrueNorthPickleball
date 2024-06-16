import Logo from "../../media/logo.png";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";

function CreateTeam({ team, rank }) {
  return (
    <div className="content-center">
      <img className="max-w-44" src={Logo} alt="logo" />
      <TextField
        required
        key={team.label}
        className="w-full"
        color="secondary"
        label={team.label}
        onChange={(e) => team.change(e.target.value)}
        helperText={team.helperText}
        error={team.error}
        value={team.value ? team.value:""}
      />
      <FormControl required fullWidth error={rank.error} color="secondary">
        <InputLabel>{rank.label}</InputLabel>
        <Select
          label={rank.label}
          value={rank.value}
          onChange={(e) => rank.change(e.target.value)}
        >
          {rank.options.map((option) => {
            return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>;
          })}
        </Select>
        <FormHelperText>{rank.helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default CreateTeam;
