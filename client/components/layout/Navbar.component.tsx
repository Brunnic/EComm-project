import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { getUser, logout } from "../../redux/actions/auth";
import { RootState } from "../../redux/store";

const Search = styled("div")(({ theme }) => ({
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "80%",
    top: 14,
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(2),
        width: "40%",
        left: 160,
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const Navbar = () => {
    const [search, setSearch] = React.useState("");
    const [searchData, setSearchData] = React.useState<any>([]);

    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const { push } = useRouter();

    React.useEffect(() => {
        if (!user || Object.keys(user).length < 1) {
            dispatch(getUser());
        }
    }, [user]);

    React.useEffect(() => {
        const getSearchData = async (query: string) => {
            if (query !== "") {
                const res = await axios.get(
                    "http://localhost:8000/api/search/" + query
                );
                setSearchData(res.data);
            } else {
                setSearchData([]);
            }
        };

        getSearchData(search);
    }, [search]);

    React.useEffect(() => {
        if (search === "" && searchData.length > 0) {
            setSearchData([]);
        }
    }, [searchData]);

    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: "white", color: "black" }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        ":hover": {
                            cursor: "pointer",
                        },
                    }}
                    onClick={() => {
                        push("/");
                    }}
                >
                    Shopping MA
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </Search>
                    <List
                        sx={{
                            position: "absolute",
                            top: 40,
                            width: "80%",
                            ml: 4,
                            zIndex: 2,
                            display:
                                searchData && searchData.length > 0
                                    ? "initial"
                                    : "none",
                            bgcolor: "background.paper",
                        }}
                    >
                        {searchData &&
                            searchData.length > 0 &&
                            searchData.map((item: any) => (
                                <ListItem key={item.id}>
                                    <Link
                                        href={
                                            Number.isFinite(item.price)
                                                ? `/product/${item.slug}`
                                                : `/${item.slug}`
                                        }
                                    >
                                        <ListItemButton component="a">
                                            <ListItemText primary={item.name} />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            ))}
                    </List>
                </Box>
                <Box
                    component="div"
                    sx={{
                        ml: "auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    <Box
                        component="div"
                        sx={{ display: "flex", flexDirection: "row" }}
                    >
                        <Link href="/cart">
                            <MuiLink
                                href="/cart"
                                underline="none"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <ShoppingCartIcon />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "block",
                                        },
                                    }}
                                >
                                    Cart
                                </Typography>
                            </MuiLink>
                        </Link>
                    </Box>
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            ml: 1,
                            gap: 1,
                        }}
                    >
                        {user && Object.keys(user).length > 0 ? (
                            <>
                                <Link href="#">
                                    <MuiLink
                                        underline="none"
                                        href="#"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <PersonIcon />
                                        <Typography
                                            variant="button"
                                            sx={{
                                                display: {
                                                    xs: "none",
                                                    sm: "block",
                                                },
                                            }}
                                        >
                                            {user.fName}
                                        </Typography>
                                    </MuiLink>
                                </Link>
                                <MuiLink
                                    underline="none"
                                    component="button"
                                    onClick={() => {
                                        dispatch(logout());
                                    }}
                                >
                                    <Typography>Logout</Typography>
                                </MuiLink>
                            </>
                        ) : (
                            <Link href="/auth/login">
                                <MuiLink
                                    underline="none"
                                    href="/auth/login"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <PersonIcon />
                                    <Typography
                                        variant="button"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "block",
                                            },
                                        }}
                                    >
                                        Login
                                    </Typography>
                                </MuiLink>
                            </Link>
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
