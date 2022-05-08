import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  Link,
} from "@mui/material";

import moment from "moment";

const New: React.FC<{
  title: String;
  url: string;
  author: string | null;
  publishedAt: string;
  description: string;
  urlToimage: string | null;
}> = ({ title, url, author, publishedAt, description, urlToimage }) => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Card sx={{ minWidth: 345, marginBottom: 1 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Link href={url}>
                <Typography variant="body1" component="div">
                  {title}
                </Typography>
              </Link>

              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {author}　・{moment(publishedAt).fromNow()}
              </Typography>
              <Typography paragraph>{description}</Typography>
            </Grid>
            <Grid item xs={4}>
              <CardMedia
                component="img"
                height="120"
                image={
                  urlToimage! ||
                  "https://www.ikaho-kankou.com/wp/wp-content/uploads/2019/01/noimage.png"
                }
                alt="image"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default New;
