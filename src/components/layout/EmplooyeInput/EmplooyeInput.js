import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, InputBase, Menu, Divider } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import {TimeEntryApi} from "../../../api";
import { Select } from 'antd';

const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  DropDownButton: {
    // margin: "50px 50px",
    fontSize: "13px",
    width: "112px",
    height: "23px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #aaaaaa",
    borderRadius: "5px",
    backgroundColor: "white",
    cursor: "pointer",
    // padding: "0px 20px"
    color:'white',

  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: "20px",
    marginLeft: 0,
    width: "100%",
    border: "1px solid grey"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  searchBarContainer: {
    minWidth: "inherit",
    display: "flex",
    justifyContent: "space-evenly",
    cursor: "default",
    "&.MuiListItem-button": {
      "&:hover": {
        backgroundColor: "white"
      }
    }
  },
  menuDivider: {
    margin: "0 20px"
  },
  dashboardSelectMenu: {
    "& .MuiPopover-paper": {
      minWidth: "380px",
      maxWidth: "fit-content"
    }
  },
  externalLinkIcon: {
    borderLeft: "1px solid var(--color-gray-eighty-five)",
    padding: "10px 0px 10px 10px",
    color: "var(--color-primary)",
    cursor: "pointer"
  },
  checkedItem: {
    color: "indigo"
  }
}));



function EmplooyeInput(props) {
  useEffect(()=>{
    TimeEntryApi.getEmployees().then((res)=>{
      const list = [];
     res.data.employee.value.map((employee) => {
        const l = {
          value: employee.EmpID,
          label: employee.Name
        };
        list.push(l);
      });
      // console.log(JSON.stringify(list));
      setOptions(list);
    }).catch((err)=>{
      console.log(err);
    })
  },[]);
  const [options,setOptions] = useState([{value:'',label:''}]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selection, setSelection] = useState("");

  useEffect(() => {
    setSelection(options[0].label);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = (e,value) => {
    if (e.target.innerText !== selection && e.target.innerText !== "") {
      setSelection(e.target.innerText);
    }
    setSearchText("");
    setAnchorEl(null);
    props.onChange(value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // return (
  //   <div>
  //     <Button
  //       type="button"
  //       className={classes.DropDownButton}
  //       onClick={handleMenuOpen}
  //     >
  //       {selection}
  //       <KeyboardArrowDownIcon />
  //     </Button>
  //     {renderDashboardMenu()}
  //   </div>
  // );
  // function renderDashboardMenu() {
  //   const displayOptions = options
  //     .map((item) => {
  //       // console.log(item);
  //       if (item?.label.toLowerCase().includes(searchText?.toLowerCase())) {
  //         return item;
  //       }
  //       return undefined;
  //     })
  //     .filter((item) => item !== undefined);
  //
  //   function renderOption(value) {
  //     if (selection === value) {
  //       return (
  //         <div className={classes.checkedItem}>
  //           <CheckIcon />
  //           {value}
  //         </div>
  //       );
  //     }
  //     return value;
  //   }
  //
  //   return (
  //     <Menu
  //       anchorEl={anchorEl}
  //       keepMounted={true}
  //       open={!!anchorEl}
  //       onClose={handleClose}
  //       onSelect={
  //         (e) => {
  //           console.log(JSON.stringify(e));
  //         }
  //       }
  //       className={classes.dashboardSelectMenu}
  //       anchorReference="anchorEl"
  //       anchorPosition={{ top: 110, left: 240 }}
  //       anchorOrigin={{
  //         vertical: "left",
  //         horizontal: "top"
  //       }}
  //       transformOrigin={{
  //         vertical: "top",
  //         horizontal: "center"
  //       }}
  //     >
  //       <MenuItem
  //         className={classes.searchBarContainer}
  //         disableTouchRipple={true}
  //       >
  //         <div className={classes.search}>
  //           <div className={classes.searchIcon}>
  //             <SearchIcon />
  //           </div>
  //           <InputBase
  //             placeholder="SEARCH..."
  //             classes={{
  //               root: classes.inputRoot,
  //               input: classes.inputInput
  //             }}
  //             onChange={handleSearchChange}
  //             value={searchText}
  //           />
  //         </div>
  //       </MenuItem>
  //       <Divider />
  //       {displayOptions.map((item, index) => {
  //         // console.log(item.value);
  //         return (
  //           <div key={index}>
  //             <MenuItem value={item.value} onClick={(e) => handleClose(e,item.value)}>
  //               {renderOption(item.label)}
  //             </MenuItem>
  //             <Divider className={classes.menuDivider} />
  //           </div>
  //         );
  //       })}
  //     </Menu>
  //   );
  // }
  return (
      <>
        <Select
            showSearch
            style={{ height: 25 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            size={'small'}
            onChange={(value)=>props.onChange(value)}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
        >
          {options.map((item, index) => {
            return (<Option value={item.value}>
              {item.label}
            </Option>);
          })
          }
        </Select>
      </>
  )
}

export default EmplooyeInput;
