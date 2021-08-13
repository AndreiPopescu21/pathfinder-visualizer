import { useState } from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function DropdownSelect({buttonText, options, setOption, className, callback}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if(callback)
      callback();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChoose = (option) => {
    if(setOption)
      setOption(option);
    handleClose();
  }

  return (
    <div style={{display: "inline"}}>
      <Button onClick={handleClick}
              className={className}
              endIcon={<ArrowDropDownIcon/>}>
        {buttonText}
      </Button>
      <Menu getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
        {
          options.map((option, index) => (
            <MenuItem key={index} onClick={() => handleChoose(option)} value={option}> {option} </MenuItem>
          ))
        }
      </Menu>
    </div>
  );
}