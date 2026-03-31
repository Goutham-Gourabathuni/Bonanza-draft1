import { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Container,
  Card,
  CardContent,
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  Box,
  useTheme,
  useMediaQuery,
  styled,
  alpha
} from "@mui/material";
import { useDropzone } from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import cblogo from "./cblogo.PNG";
import backgroundImage from "./bg.png";
import axios from "axios";

// Styled components using MUI v5 styled API
const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.common.white),
  backgroundColor: theme.palette.common.white,
  borderRadius: '15px',
  padding: '15px 22px',
  fontSize: '20px',
  fontWeight: 900,
  width: '100%',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.8),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  margin: 'auto',
  maxWidth: '400px',
  minHeight: '500px',
  backgroundColor: 'transparent',
  boxShadow: '0px 9px 70px 0px rgba(0, 0, 0, 0.3)',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardEmpty = styled(StyledCard)({
  minHeight: 'auto',
});

const StyledCardMedia = styled(CardMedia)({
  height: '400px',
  objectFit: 'cover',
});

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: 'transparent',
  boxShadow: 'none',
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '22px',
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  color: alpha(theme.palette.common.black, 0.6),
  fontWeight: 'bold',
  padding: '1px 24px 1px 16px',
}));

const StyledTableCellSmall = styled(TableCell)(({ theme }) => ({
  fontSize: '14px',
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  color: alpha(theme.palette.common.black, 0.6),
  fontWeight: 'bold',
  padding: '1px 24px 1px 16px',
}));

const StyledTable = styled(Table)({
  backgroundColor: 'transparent',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: 'transparent',
});

const StyledTableBody = styled(TableBody)({
  backgroundColor: 'transparent',
});

const StyledTableRow = styled(TableRow)({
  backgroundColor: 'transparent',
});

const StyledAppBar = styled(AppBar)({
  background: '#ffea49',
  boxShadow: 'none',
  color: 'black',
});

const StyledCircularProgress = styled(CircularProgress)({
  color: '#5dea72',
});

const DropzoneContainer = styled(Box)(({ theme }) => ({
  border: `2px dashed ${alpha(theme.palette.common.white, 0.5)}`,
  borderRadius: '10px',
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    borderColor: theme.palette.common.white,
  },
  '&.allowing': {
    borderColor: theme.palette.success.main,
    backgroundColor: alpha(theme.palette.success.main, 0.1),
  },
}));

export const ImageUpload = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const sendFile = useCallback(async () => {
    if (image) {
      setIsLoading(true);
      try {
        let formData = new FormData();
        formData.append("file", selectedFile);
        let apiUrl = process.env.NODE_ENV === 'development' 
            ? "http://localhost:8000/api/predict" 
            : "/api/predict";
            
        let res = await axios.post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.status === 200) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Upload failed:", err);
        console.error("Error details:", err.response?.data);
      } finally {
        setIsLoading(false);
      }
    }
  }, [image, selectedFile]);

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setData(undefined);
      setImage(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop: (acceptedFiles) => {
      setIsDragActive(false);
      onDrop(acceptedFiles);
    },
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    
    // Cleanup function to revoke the object URL
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    sendFile();
  }, [preview, sendFile]);

  const confidence = data ? (parseFloat(data.confidence) * 100).toFixed(2) : 0;
  

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            component="div" 
            sx={{ flexGrow: 1 }}
            noWrap
          >
            {isSmallMobile ? 'Bonanza - Banana Leaf Detector' : 'Bonanza - Banana Leaf Nutrient Deficiency Detector'}
          </Typography>
          <Avatar src={cblogo} alt="Logo" />
        </Toolbar>
      </StyledAppBar>
      
      <Container 
        maxWidth={false} 
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          minHeight: 'calc(100vh - 64px)',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? 2 : 4,
        }}
        disableGutters={false}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ width: '100%', maxWidth: '500px' }}
        >
          <Grid item xs={12}>
            {!image ? (
              <StyledCardEmpty>
                <CardContent sx={{ padding: 0 }}>
                  <DropzoneContainer 
                    {...getRootProps()}
                    className={isDragAccept ? 'allowing' : ''}
                  >
                    <input {...getInputProps()} />
                    <CloudUploadIcon 
                      sx={{ 
                        fontSize: isMobile ? 48 : 64, 
                        color: 'white', 
                        mb: 2 
                      }} 
                    />
                    <Typography 
                      variant={isMobile ? "body1" : "h6"} 
                      sx={{ 
                        color: 'white', 
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      {isDragActive 
                        ? 'Drop the image here' 
                        : 'Drag and drop a banana leaf image here, or click to select'
                      }
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)', 
                        textAlign: 'center',
                        mt: 1,
                        display: 'block'
                      }}
                    >
                      Supports: JPG, PNG, GIF, BMP, WebP
                    </Typography>
                  </DropzoneContainer>
                </CardContent>
              </StyledCardEmpty>
            ) : (
              <StyledCard>
                <CardActionArea>
                  <StyledCardMedia
                    image={preview}
                    component="img"
                    title="Banana Leaf Image"
                    alt="Uploaded banana leaf"
                  />
                </CardActionArea>
                
                {data && (
                  <CardContent sx={{ 
                    backgroundColor: 'white', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2
                  }}>
                    <StyledTableContainer component={Paper}>
                      <StyledTable size="small" aria-label="results table">
                        <StyledTableHead>
                          <StyledTableRow>
                            <StyledTableCellSmall>Label:</StyledTableCellSmall>
                            <StyledTableCellSmall align="right">Confidence:</StyledTableCellSmall>
                          </StyledTableRow>
                        </StyledTableHead>
                        <StyledTableBody>
                          <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                              {data.class || 'No class'}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {confidence}%
                            </StyledTableCell>
                          </StyledTableRow>
                        </StyledTableBody>
                      </StyledTable>
                    </StyledTableContainer>
                  </CardContent>
                )}
                
                {isLoading && (
                  <CardContent sx={{ 
                    backgroundColor: 'white', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3
                  }}>
                    <StyledCircularProgress size={40} />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mt: 2, 
                        color: '#000000a6',
                        fontWeight: 'bold'
                      }}
                    >
                      Processing...
                    </Typography>
                  </CardContent>
                )}
              </StyledCard>
            )}
          </Grid>
          
          {data && (
            <Grid item xs={12} sx={{ maxWidth: '416px', width: '100%' }}>
              <StyledButton 
                variant="contained" 
                size="large" 
                onClick={clearData} 
                startIcon={<ClearIcon />}
                sx={{ mt: 2 }}
              >
                Clear Results
              </StyledButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
