import { Grid, IconButton, InputAdornment ,TextField} from "@material-ui/core";
import React from "react";
import Visibility  from '@material-ui/icons/Visibility'
import VisibilityOff  from '@material-ui/icons/VisibilityOff'

const Input = ({name,handelChange,label,autofocus,type,handelShowPassword, half }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handelChange}
        varient='outlined'
        required
        fullWidth
        label={label}
        autoFocus={autofocus}
        type={type}
        InputProps={name=== 'password'?{
            endAdornment:(
                <InputAdornment position="end">
                    <IconButton onClick={handelShowPassword}>
                        {type==='password'?<Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            )
        }:null}
      />
    </Grid>
  );
};

export default Input;
