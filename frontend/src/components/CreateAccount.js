import { Grid, TextField, Button } from "@mui/material";
import InputMask from "react-input-mask";

function CreateAccount({fields, emergencyFields, handleSubmission, error}) {

return(

  <>
    <h1 className=" pl-14 pt-14 pb-4 text-2xl">Personal Information</h1>
    <p className=" pl-14 pb-4 text-red-700">{error}</p>
    <Grid container spacing={2} className="pl-14 pr-14 pb-14">
      {fields.map((field) => (
        <Grid item xs={field.size} key={field.label}>
          {field.label === "Phone Number" ? (
            <InputMask
              mask="999-999-9999"
              value={field.value}
              onChange={(e) => field.change(e.target.value)}
              key={field.label}
            >
              {() => (
                <TextField
                  required
                  className="w-full"
                  color="secondary"
                  label={field.label}
                  helperText={field.helperText}
                  error={field.error}
                  value={field.value ? field.value:""}

                />
              )}
            </InputMask>
          ) : (
            <TextField
              required
              key={field.label}
              className="w-full"
              color="secondary"
              label={field.label}
              type={
                field.label === "Password" ||
                field.label === "Confirm Password"
                  ? "password"
                  : "text"
              }
              onChange={(e) => field.change(e.target.value)}
              helperText={field.helperText}
              error={field.error}
            />
          )}
        </Grid>
      ))}
    </Grid>
    <h1 className=" pl-14 pb-4 text-2xl">Emergency Contact Information</h1>
    <Grid container spacing={2} className="pl-14 pr-14 pb-14">
      {emergencyFields.map((field) => (
        <Grid item xs={field.size} key={field.label}>
          {field.label === "Phone Number" ? (
            <InputMask
              mask="999-999-9999"
              value={field.value}
              onChange={(e) => field.change(e.target.value)}
              key={field.label}
            >
              {() => (
                <TextField
                  required
                  className="w-full"
                  color="secondary"
                  label={field.label}
                  helperText={field.helperText}
                  error={field.error}
                  value={field.value ? field.value:""}

                />
              )}
            </InputMask>
          ) : (
            <TextField
              required
              key={field.label}
              className="w-full"
              color="secondary"
              label={field.label}
              onChange={(e) => field.change(e.target.value)}
              helperText={field.helperText}
              error={field.error}
            />
          )}
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          onClick={handleSubmission}
          className="w-full"
          variant="contained"
          // LinkComponent={Link}
          // to="https://buy.stripe.com/test_eVa7sJgxL7Gi0lWcMM"
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  </>
  )

}

export default CreateAccount;