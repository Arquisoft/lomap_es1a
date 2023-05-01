import { useState, useEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { LoginButton } from "@inrupt/solid-ui-react";
import {initPodForLomap} from "../../src/util/PodUtil"
import Typography from "@mui/material/Typography";
import {
  Button,
  TextField,
  FormGroup,
  Container,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

interface Ilogin {
  urlPrevia?: string;
}

export default function Login({ urlPrevia = window.location.origin }: Ilogin) {
  const [idp, setIdp] = useState("https://solidcommunity.net");
  const [urlRedirect, setUrlRedirect] = useState(urlPrevia);
  

  useEffect(() => {
    console.log("Login.tsx -- useEffect()");
    console.log("Login.tsx -- useEffect() -- windows.location.origin", window.location.origin);
    setUrlRedirect(window.location.origin);
  }, [urlRedirect]);

  const handleChange = (event: SelectChangeEvent) => {
    setIdp(event.target.value as string);
  };
  return (
    <div className="login">
      <Container
        maxWidth="sm"
        className="loginContainer"
        style={{ height: "100vh", justifyContent: "center", paddingTop: "20vh"}}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="black"
          gutterBottom
        >
          Log In
        </Typography>
        <FormGroup>
          <InputLabel id="idpInputLabel" style={{ textAlign: "center", marginBottom: "0.6em" }}>
            Select your Identity Provider:{" "}
          </InputLabel>
          <Select
            labelId="idpInputLabel"
            id="identityProvider"
            value={idp}
            label={idp}
            onChange={handleChange}
            fullWidth
            style= {{marginBottom:"0.6em"}}
          >
            <MenuItem id="inrupt" value={"https://inrupt.net"}>
              https://inrupt.net
            </MenuItem>  
            <MenuItem id="solidcommunity" value={"https://solidcommunity.net"}>
              https://solidcommunity.net
            </MenuItem>
            <MenuItem id="inrupt" value={"https://solidweb.org"}>
              https://solidweb.org 
            </MenuItem>
            <MenuItem id="podspaces" value={"https://login.inrupt.com"}>
              https://login.inrupt.com (PodSpaces)
            </MenuItem>
          </Select>
        </FormGroup>
        <LoginButton
          oidcIssuer={idp}
          redirectUrl={urlRedirect}
          onError={console.log}
        >
          <div style={{display:"flex", justifyContent:"center"}}>
            <Button id ="login" variant="contained" color="primary" style={{ width:"8em"}} >
              Login
            </Button>
          </div>
        </LoginButton>
      </Container>
    </div>
  );
}
