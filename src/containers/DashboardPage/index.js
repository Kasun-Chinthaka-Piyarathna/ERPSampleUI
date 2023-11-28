import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFilePicker } from 'use-file-picker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

import { createClient, submitQuotation } from "src/api/user.service";


const defaultTheme = createTheme();

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { username: currentUsername } = user;
  const { openFilePicker, filesContent, loading } = useFilePicker({
    accept: '.pdf',
  });
  const [clientName, setClientName] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personEmail, setPersonEmail] = useState(null);
  const [personMobileNo, setPersonMobileNo] = useState(null);
  const [commercialRegNo, setCommercialRegNo] = useState(null);
  const [commercialReg, setCommercialReg] = useState(null);
  const [housing, setHousing] = useState(null);
  const [transportation, setTransportation] = useState(null);
  const [costType, setCostType] = useState(null);
  const [profession, setProfession] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [taskApproval, setTaskApproval] = useState(null);
  const [quotationApproval, setQuotationApproval] = useState(null);
  const [basicLoading, setBasicLoading] = useState(false);
  const [quotationProcessLoading, setQuotationProcessLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClientNameChange = (event) => {
    setClientName(event.target.value);
  };

  const handlePersonNameChange = (event) => {
    setPersonName(event.target.value);
  };

  const handlePersonEmailChange = (event) => {
    setPersonEmail(event.target.value);
  };

  const handlePersonMobileNoChange = (event) => {
    setPersonMobileNo(event.target.value);
  };

  const handleCommercialRegNoChange = (event) => {
    setCommercialRegNo(event.target.value);
  };

  const handleCommercialRegChange = (event) => {
    setCommercialReg(event.target.value);
  };

  const handleHousingChange = (event) => {
    setHousing(event.target.value);
  };

  const handleTransportationChange = (event) => {
    setTransportation(event.target.value);
  };

  const handleCostTypeChange = (event) => {
    setCostType(event.target.value);
  };

  const handleProfessionChange = (event) => {
    const {
      target: { value },
    } = event;
    setProfession(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleNationalityChange = (event) => {
    const {
      target: { value },
    } = event;
    setNationality(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTaskApprovalChange = (event) => {
    setTaskApproval(event.target.value);
  };

  const handleQuotationApprovalChange = (event) => {
    setQuotationApproval(event.target.value);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBasicLoading(true);
    let res = await createClient(
      clientName,
      personName,
      personEmail,
      personMobileNo,
      commercialRegNo,
      commercialReg,
      housing,
      transportation,
      costType,
      profession,
      nationality,
      taskApproval,
    );
    if (res != null) {
      const { message, status } = res.data;
      if (status === "Success") {
        setMessage(message);
        setBasicLoading(false);
        setSnackbarOpen(true);
        setClientName(null);
        setPersonName(null);
        setPersonEmail(null);
        setPersonMobileNo(null);
        setCommercialReg(null);
        setCommercialRegNo(null);
        setHousing(null);
        setTransportation(null);
        setCostType(null);
        setProfession([]);
        setNationality([]);
        setTaskApproval(null);
        setQuotationApproval(null);
      } else {
        setMessage(message);
        setBasicLoading(false);
        setSnackbarOpen(true);
      }
    } else {
      setMessage("Something went wrong. Please try it again!");
      setBasicLoading(false);
      setSnackbarOpen(true);
    }
  }

  const handleQuotationSubmit = async (event) => {
    event.preventDefault();
    setQuotationProcessLoading(true);
    let quotationLink = 'https://www.youtube.com/live/sZzBcQU8HOk?si=1chJu4XPfcm8SGlX';
    let res = await submitQuotation(
      quotationLink,
      quotationApproval,
    );
    if (res != null) {
      const { message, status } = res.data;
      if (status === "Success") {
        setMessage(message);
        setQuotationProcessLoading(false);
        setSnackbarOpen(true);
        setQuotationApproval(null);
      } else {
        setMessage(message);
        setQuotationProcessLoading(false);
        setSnackbarOpen(true);
      }
    } else {
      setMessage("Something went wrong. Please try it again!");
      setQuotationProcessLoading(false);
      setSnackbarOpen(true);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'block' }}>
          {snackbarOpen === true && (
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleClose}
              message={message}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              severity="success"
            />
          )}
          <div style={{ display: 'flex', minHeight: '64px', background: "#1976d2", paddingLeft: "24px", paddingRight: "24px", alignItems: "center" }}>
            <Typography
              component="h1"
              variant="h6"
              color="#ffffff"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Your Enterprise Resource Plannnng Helper
            </Typography>
            <div style={{ display: "flex" }}>
              <Typography
                component="h1"
                variant="h6"
                color="#ffffff"
                style={{ display: 'flex', alignItems: "center" }}
              >
                Welcome back {currentUsername}
              </Typography>
              <Tooltip title="Log Out" style={{ marginLeft: "10px" }}>
                <IconButton onClick={logout}>
                  <LogoutIcon sx={{ color: "#ffffff" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Grid container spacing={2} style={{
              width: '100%',
              paddingLeft: '10%',
              paddingRight: '10%',
              marginTop: '20px'
            }}>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  Please fill the fields below to submit client information
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <TextField
                    id="outlined-basic"
                    label="Client Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={clientName || ''}
                    onChange={handleClientNameChange} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <TextField
                    id="outlined-basic"
                    label="Person Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={personName || ''}
                    onChange={handlePersonNameChange}
                  />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <TextField
                    id="outlined-basic"
                    label="Person Email"
                    variant="outlined"
                    fullWidth
                    required
                    value={personEmail || ''}
                    onChange={handlePersonEmailChange}
                  />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <TextField
                    id="outlined-basic"
                    label="Person Mobile No"
                    variant="outlined"
                    fullWidth
                    required
                    value={personMobileNo || ''}
                    onChange={handlePersonMobileNoChange}
                  />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <TextField
                    id="outlined-basic"
                    label="Commercial Registration No"
                    variant="outlined"
                    fullWidth
                    required
                    value={commercialRegNo || ''}
                    onChange={handleCommercialRegNoChange}
                  />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <TextField
                    id="outlined-basic"
                    label="Commercial Registration"
                    variant="outlined"
                    fullWidth
                    required
                    value={commercialReg || ''}
                    onChange={handleCommercialRegChange}
                  />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <FormControl fullWidth>
                    <InputLabel id="housing-label">Housing</InputLabel>
                    <Select
                      labelId="housing-label"
                      id="housing"
                      value={housing || ''}
                      label="Housing"
                      required
                      onChange={handleHousingChange}
                    >
                      <MenuItem value='On Client'>On Client</MenuItem>
                      <MenuItem value='On JISR'>On JISR</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <FormControl fullWidth>
                    <InputLabel id="transportation-label">Transportation</InputLabel>
                    <Select
                      labelId="transportation-label"
                      id="transportation"
                      value={transportation || ''}
                      label="Transportation"
                      required
                      onChange={handleTransportationChange}
                    >
                      <MenuItem value='On Client'>On Client</MenuItem>
                      <MenuItem value='On JISR'>On JISR</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <FormControl fullWidth>
                    <InputLabel id="cost-type-label">Cost Type</InputLabel>
                    <Select
                      labelId="cost-type-label"
                      id="costtype"
                      value={costType}
                      label="Cost Type"
                      required
                      onChange={handleCostTypeChange}
                    >
                      <MenuItem value='Fixed Cost'>Fixed Cost</MenuItem>
                      <MenuItem value='Cost Plus'>Cost Plus</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <FormControl fullWidth>
                    <InputLabel id="profession-label">Profession</InputLabel>
                    <Select
                      labelId="profession-label"
                      id="profession"
                      value={profession}
                      label="Profession"
                      multiple
                      required
                      onChange={handleProfessionChange}
                    >
                      <MenuItem value='Software Engineer'>Software Engineer</MenuItem>
                      <MenuItem value='Banker'>Banker</MenuItem>
                      <MenuItem value='Teacher'>Teacher</MenuItem>
                      <MenuItem value='Doctor'>Doctor</MenuItem>
                      <MenuItem value='Engineer'>Engineer</MenuItem>
                      <MenuItem value='Nurse'>Nurse</MenuItem>
                      <MenuItem value='Accountant'>Accountant</MenuItem>
                      <MenuItem value='Manager'>Manager</MenuItem>
                      <MenuItem value='Architect'>Architect</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <FormControl fullWidth>
                    <InputLabel id="nationality-label">Nationality</InputLabel>
                    <Select
                      labelId="nationality-label"
                      id="nationality"
                      value={nationality}
                      label="Nationality"
                      multiple
                      required
                      onChange={handleNationalityChange}
                    >
                      <MenuItem value='Sri Lanka'>Sri Lanka</MenuItem>
                      <MenuItem value='India'>India</MenuItem>
                      <MenuItem value='Maldives'>Maldives</MenuItem>
                      <MenuItem value='Saudi Arabia'>Saudi Arabia</MenuItem>
                      <MenuItem value='Eran'>Eran</MenuItem>
                      <MenuItem value='Egypt'>Egypt</MenuItem>
                      <MenuItem value='Pakistan'>Pakistan</MenuItem>
                      <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Denmark'>Denmark</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <FormControl fullWidth>
                    <InputLabel id="task-approval-label">Task Approval</InputLabel>
                    <Select
                      labelId="task-approval-label"
                      id="taskApproval"
                      value={taskApproval}
                      label="Task Approval"
                      required
                      onChange={handleTaskApprovalChange}
                    >
                      <MenuItem value='Approve'>Approve</MenuItem>
                      <MenuItem value='Reject'>Reject</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{
              width: '100%',
              paddingLeft: '10%',
              paddingRight: '10%',
              marginTop: '20px'
            }}>
              <Grid item xs={12} style={{
                display: 'flex',
                justifyContent: 'end',
              }}>
                <Button
                  variant="contained"
                  disabled={
                    clientName === null ||
                    personName === null ||
                    personEmail === null ||
                    personMobileNo === null ||
                    commercialRegNo === null ||
                    commercialReg === null ||
                    housing === null ||
                    transportation === null ||
                    costType === null ||
                    profession.length === 0 ||
                    nationality.length === 0 ||
                    taskApproval === null}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
            {basicLoading === true && (
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <CircularProgress />
              </div>
            )}
            <Grid container spacing={2} style={{
              width: '100%',
              paddingLeft: '10%',
              paddingRight: '10%',
              marginTop: '20px'
            }}>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  Please attach a quotation to process
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Paper style={{ minHeight: '36px', padding: '10px', justifyContent: 'center', display: 'flex' }}>
                  <button onClick={() => openFilePicker()}>Select files</button>
                  <br />
                  {filesContent.map((file, index) => (
                    <div>
                      <h2 style={{ fontSize: '12px', paddingLeft: '10px' }}>{file.name}</h2>
                      <br />
                    </div>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <FormControl fullWidth>
                    <InputLabel id="quotationApproval-label">Quotation Approval</InputLabel>
                    <Select
                      labelId="quotationApproval-label"
                      id="quotationApproval"
                      value={quotationApproval}
                      label="Quotation Approval"
                      required
                      onChange={handleQuotationApprovalChange}
                    >
                      <MenuItem value='Approve'>Approve</MenuItem>
                      <MenuItem value='Reject'>Reject</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{
              width: '100%',
              paddingLeft: '10%',
              paddingRight: '10%',
              marginTop: '20px'
            }}>
              <Grid item xs={12} style={{
                display: 'flex',
                justifyContent: 'end',
              }}>
                <Button
                  variant="contained"
                  disabled={quotationApproval === null}
                  onClick={handleQuotationSubmit}
                >
                  Submit Quotation
                </Button>
              </Grid>
            </Grid>
            {quotationProcessLoading === true && (
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <CircularProgress />
              </div>
            )}
          </Box>
        </Box >
      </ThemeProvider >
    </LocalizationProvider >
  );
}