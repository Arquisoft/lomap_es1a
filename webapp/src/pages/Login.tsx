import { useState, useEffect } from 'react';
import { LoginButton } from '@inrupt/solid-ui-react';
import { Button, TextField, FormGroup, Container } from '@mui/material';

interface Ilogin{
    urlPrevia?: string;
}

export default function Login( {urlPrevia = "http://localhost:3000"}:Ilogin) {
  const [idp, setIdp] = useState("https://inrupt.net");
  const [urlRedirect, setUrlRedirect] = useState(urlPrevia);
  
  //const [currentUrl, setCurrentUrl] = useState("http://localhost:3000");
  //let urlNavegador = window.location.href;
  //useEffect(() => {setCurrentUrl(window.location.href);}, [setCurrentUrl]);
    
    return (
    <div className="login">
    <Container fixed>
      <FormGroup>
        <TextField
          label="Identity Provider"
          placeholder="Identity Provider"
          type="url"
          value={idp}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdp(e.target.value)}
        />
      </FormGroup>
      <LoginButton oidcIssuer={idp} redirectUrl={urlRedirect}>
          <Button variant="contained" color="primary">
            Login
            </Button>
      </LoginButton>
    </Container>
    </div>
  );
}