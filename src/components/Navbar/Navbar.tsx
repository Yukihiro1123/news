import React, { useState, useEffect, useCallback } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  CircularProgress,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import New from "../News/News";
import Weather from "../Weather/Weather";
//アイコン
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LanguageIcon from "@mui/icons-material/Language";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DiamondIcon from "@mui/icons-material/Diamond";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import SearchIcon from "@mui/icons-material/Search";
import FlagIcon from "@mui/icons-material/Flag";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import ScienceIcon from "@mui/icons-material/Science";
import CodeIcon from "@mui/icons-material/Code";
import TheatersIcon from "@mui/icons-material/Theaters";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const apiKey: string | undefined = process.env.REACT_APP_API_KEY_NEWS || "";
  const baseURL: string | undefined =
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}` || "";
  const [news, setNews] = useState<any[]>([]);
  const [topic, setTopic] = useState<string>("Top Stories");
  const [query, setQuery] = useState<string>(baseURL);
  const [search, setSearch] = useState<string>("");
  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      //search post
      console.log(search);
      setQuery(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`
      );
    }
  };
  const getNewsData = useCallback(async () => {
    await axios
      .get(query)
      .then((res) => {
        setNews(res.data.articles);
      })
      .catch((error) => console.log(error));
  }, [query]);
  useEffect(() => {
    getNewsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const topics_top = [
    {
      text: "Top Stories",
      icon: <LanguageIcon />,
      query: baseURL,
    },
    {
      text: "For You",
      icon: <DiamondIcon />,
      query: baseURL,
    },
    {
      text: "Following",
      icon: <StarBorderIcon />,
      query: baseURL,
    },
  ];
  const topics_bottom = [
    {
      text: "US",
      icon: <FlagIcon />,
      query: baseURL,
    },
    {
      text: "World",
      icon: <PublicIcon />,
      query: baseURL,
    },
    {
      text: "Your local news",
      icon: <LocationOnIcon />,
      query: `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${apiKey}`,
    },
    {
      text: "Business",
      icon: <BusinessIcon />,
      query: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`,
    },
    {
      text: "Science",
      icon: <ScienceIcon />,
      query: `https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=${apiKey}`,
    },
    {
      text: "Technology",
      icon: <CodeIcon />,
      query: `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`,
    },
    {
      text: "Entertainment",
      icon: <TheatersIcon />,
      query: `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${apiKey}`,
    },
    {
      text: "Sports",
      icon: <DirectionsBikeIcon />,
      query: `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`,
    },
  ];

  return (
    <Box sx={{ display: "flex", maxWidth: "100vw !important" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            News
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {topics_top.map((topic, index) => {
          return (
            <div key={index}>
              <List>
                <ListItem
                  button
                  onClick={() => {
                    setTopic(topic.text);
                    setQuery(topic.query);
                  }}
                >
                  <ListItemIcon>{topic.icon}</ListItemIcon>
                  <ListItemText primary={topic.text} />
                </ListItem>
              </List>
            </div>
          );
        })}
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              setTopic("COVID-19");
              setQuery(
                `https://newsapi.org/v2/top-headlines?q=covid-19&apiKey=${apiKey}`
              );
            }}
          >
            <ListItemIcon>
              <CoronavirusIcon />
            </ListItemIcon>
            <ListItemText primary={"COVID-19"} />
          </ListItem>
        </List>
        <Divider />
        {topics_bottom.map((topic, index) => {
          return (
            <div key={index}>
              <List>
                <ListItem
                  button
                  onClick={() => {
                    setTopic(topic.text);
                    setQuery(topic.query);
                  }}
                >
                  <ListItemIcon>{topic.icon}</ListItemIcon>
                  <ListItemText primary={topic.text} />
                </ListItem>
              </List>
            </div>
          );
        })}
      </Drawer>
      <Main open={open} style={{ maxWidth: "100vw" }}>
        <DrawerHeader />
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <TextField
              label="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
              fullWidth
              style={{ marginBottom: "16px" }}
            />

            {/* ニュース */}
            {!news ? (
              <CircularProgress />
            ) : (
              <Box>
                <Typography variant="h6">{topic}</Typography>
                {news.map((news, index) => (
                  <div key={index}>
                    <New
                      title={news.title}
                      url={news.url}
                      author={news.author}
                      publishedAt={news.publishedAt}
                      description={news.description}
                      urlToimage={news.urlToImage}
                    />
                  </div>
                ))}
              </Box>
            )}
          </Grid>
          <Grid
            item
            xs={0}
            md={5}
            display={{ xs: "none", md: "block", lg: "block" }}
          >
            <Weather />
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
}
