import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  CardActions,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

import { useEffect, useState } from "react";

import useMovies from "../hooks/useMovies";

export default function DetailMovie() {
  const { oneMovie, getOneMovie, trailer, getTrailer } = useMovies();

  const { addFavourite, isFavourite, removeFavourite } =
    useContext(FavouritesContext);

  useEffect(() => {
    getOneMovie();
  }, []);

  useEffect(() => {
    getTrailer();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      component="section"
      height="79vh"
      width="100vw"
      sx={{
        display: "flex",
        /* alignItems: "center", */
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${oneMovie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        sx={{
          margin: "auto",
          width: "70%",
          height: "85%",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          width="30%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <CardMedia
            component="img"
            sx={{
              width: "85%",
              height: "auto",
              alignSelf: "center",
            }}
            image={`https://image.tmdb.org/t/p/original/${oneMovie.poster_path}`}
            alt={oneMovie.title}
          />

          <CardActions
            sx={{
              width: "75%",
            }}
          >
            {isFavourite(oneMovie.id) ? (
              <Button
                variant="outlined"
                onClick={() => removeFavourite(oneMovie.id)}
                startIcon={<PlaylistRemoveIcon />}
                sx={{
                  width: "100%",
                  border: "2px solid white",
                  color: "white",
                }}
              >
                Remove from My List
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => addFavourite(oneMovie)}
                startIcon={<PlaylistAddIcon />}
                sx={{
                  width: "100%",
                  border: "2px solid white",
                  color: "white",
                }}
              >
                Add to My List
              </Button>
            )}
          </CardActions>
        </Box>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            color: "white",
            width: "60%",
            border: "3px solid white",
          }}
        >
          <Box
            sx={{
              border: "3px solid white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              /*               height: "80%",
               */
            }}
          >
            <Box
              sx={{
                border: "3px solid red",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                height: "80%",
              }}
            >
              <Box sx={{ border: "3px solid red", width: "70%" }}>
                <Typography variant="h4" /* component="div" */>
                  {oneMovie.title}
                </Typography>

                <Typography variant="subtitle1" gutterBottom component="span">
                  {oneMovie.release_date &&
                    oneMovie.release_date.toString().slice(0, 4)}
                </Typography>
              </Box>

              <Button
                onClick={handleOpen}
                startIcon={<PlayCircleOutlineIcon />}
                size="small"
                sx={{
                  border: "2px solid white",
                  color: "white",
                }}
              >
                Watch Trailer
              </Button>
            </Box>
            <Typography variant="body1">{oneMovie.overview}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Genres
            </Typography>

            <List>
              {oneMovie.genres &&
                oneMovie.genres.map((genre) => (
                  <ListItem disableGutters key={genre.id}>
                    <ArrowRightIcon fontSize="large" />
                    <ListItemText primary={genre.name} />
                  </ListItem>
                ))}
            </List>
          </Box>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          width: "100%",
          height: "100%",
        }}
      >
        <iframe
          width="80%"
          height="80%"
          src={`https://www.youtube.com/embed/${trailer?.key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Modal>
    </Box>
  );
}
