import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import QRCode from "qrcode.react";
import "./Gotham-Medium.otf";

const QrCodeGenerator = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [vCard, setVCard] = useState("");
  const [format, setFormat] = useState("png"); // State for file format

  // Create a ref for the QR code
  const qrCodeRef = useRef(null);

  const generateVCard = () => {
    // Updated vCard format with structured name and company name in the ORG field
    const vcf = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${organization}
TEL:${phone}
EMAIL:${email}
item2.URL;TYPE=pref:${website}
item2.X-ABLABEL:website
X-SOCIALPROFILE;TYPE=linkedin:${linkedin}
X-SOCIALPROFILE;TYPE=instagram:${instagram}
END:VCARD`;

    setVCard(vcf);
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");

    if (format === "png" || format === "jpg") {
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL(`image/${format}`);
        link.download = `${firstName}-${lastName}-QrCode.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else if (format === "svg") {
      const svg = qrCodeRef.current.querySelector("svg");
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);
        const link = document.createElement("a");
        link.href = svgUrl;
        link.download = `${firstName}-${lastName}-QrCode.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <Paper elevation={3} style={{ padding: 20 }}>
        {/* Heading: Dynamically show name if available */}
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          style={{ fontWeight: "500" }}
        >
          {firstName || lastName
            ? `Business Card for ${firstName} ${lastName}`
            : "Business Card QR Code Generator"}
        </Typography>
        {/* First Name and Last Name in two columns */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Company Name"
          margin="normal"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
        <TextField
          fullWidth
          label="Phone"
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Website URL"
          margin="normal"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <TextField
          fullWidth
          label="LinkedIn URL"
          margin="normal"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <TextField
          fullWidth
          label="Instagram URL"
          margin="normal"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={generateVCard}
        >
          Generate QR Code
        </Button>
        {vCard && (
          <div
            style={{
              marginTop: 20,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            ref={qrCodeRef}
          >
            <QRCode
              value={vCard}
              renderAs={format === "svg" ? "svg" : "canvas"}
            />
            {/* Container for dropdown and button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={downloadQRCode}
                style={{ height: "40px", lineHeight: "1.25" }} // Match the height of the Select component
              >
                Download QR Code
              </Button>
              <FormControl
                variant="outlined"
                style={{ minWidth: 100, marginLeft: 10, height: "40px" }} // Set height to match the Button
              >
                <InputLabel id="format-label">Format</InputLabel>
                <Select
                  labelId="format-label"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  style={{ height: "40px" }} // Match the height of the Button
                  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
                >
                  <MenuItem value="png">PNG</MenuItem>
                  <MenuItem value="svg">SVG</MenuItem>
                  <MenuItem value="jpg">JPG</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default QrCodeGenerator;
