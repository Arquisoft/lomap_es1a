import { useState, useEffect } from 'react';
import { LoginButton } from '@inrupt/solid-ui-react';
import { Button, TextField, FormGroup, Container, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
//import InputLabel from '@mui/material/InputLabel';

interface Ilogin{
    urlPrevia?: string;
}

export default function Login( {urlPrevia = "http://localhost:3000"}:Ilogin) {
  const [idp, setIdp] = useState("https://login.inrupt.com");
  const [urlRedirect, setUrlRedirect] = useState(urlPrevia);
  
  //const [currentUrl, setCurrentUrl] = useState("http://localhost:3000");
  //let urlNavegador = window.location.href;
  //useEffect(() => {setCurrentUrl(window.location.href);}, [setCurrentUrl]);
  
  const handleChange = (event: SelectChangeEvent) => {
    setIdp(event.target.value as string);
  };


    return (
    <div className="login">
    <Container fixed>
      <FormGroup>
                
        <InputLabel id="idpInputLabel">Select your Identity Provider: </InputLabel>
        <Select
          labelId="idpInputLabel"
          id="identityProvider"
          value={idp}
          label={idp}
          onChange={handleChange}
        >
          <MenuItem value={"https://login.inrupt.com"}>https://login.inrupt.com (PodSpaces)</MenuItem>
          <MenuItem value={"https://inrupt.net"}>https://inrupt.net (Solid prototype)</MenuItem>
        </Select>

      </FormGroup>
      <LoginButton 
        oidcIssuer={idp} 
        redirectUrl={urlRedirect}
        onError={console.log}
      >
          <Button variant="contained" color="primary">
            Login
            </Button>
      </LoginButton>
    </Container>
    </div>
  );
}