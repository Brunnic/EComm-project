import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
    return (
        <Box sx={{ mt: 16 }}>
            <Typography variant="body2" align="center">
                Made with love by @Akram.Annachachibi
            </Typography>
            <Box
                sx={{
                    mt: 4,
                    bgcolor: "background.paper",
                    p: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <Box>
                    <Typography variant="body1" align="center">
                        Links
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Box sx={{ flexDirection: "column", display: "flex" }}>
                            <Link href="#">Home</Link>
                            <Link href="#">Computers</Link>
                            <Link href="#">Headphones</Link>
                            <Link href="#">Cell Phones</Link>
                            <Link href="#">Accessories</Link>
                        </Box>
                        <Box sx={{ flexDirection: "column", display: "flex" }}>
                            <Link href="#">Video Game Consoles</Link>
                            <Link href="#">Wearables</Link>
                            <Link href="#">Camera & Photo</Link>
                            <Link href="#">GPS & Navigation</Link>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body1" align="center">
                        Social Media
                    </Typography>
                    <Box>
                        <FacebookRoundedIcon fontSize="large" />
                        <TwitterIcon fontSize="large" />
                        <YouTubeIcon fontSize="large" />
                        <EmailIcon fontSize="large" />
                        <LinkedInIcon fontSize="large" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
