import React, { useEffect } from "react";
import GameCard from "./GameCard";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import FilteredGames from "../FilteredGames";

const GameLibrary = ({
  games,
  setGames,
  handleAddGame,
  removeGames,
  onGameDelete,
  handleUpdateGames,
  genres,
  setGenres,
  handleAddGenre,
}) => {
  const renderGames = games.map((game) => (
    <GameCard
      key={game.id}
      game={game}
      removeGames={removeGames}
      onGameDelete={onGameDelete}
      handleUpdateGames={handleUpdateGames}
      genres={genres}
      setGenres={setGenres}
    />
  ));

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [filter, setFilter] = useState(games);
  // const [filteredGames, setFilteredGames] = useState("");

  // useEffect(() => {
  //   let emptyGamesArray = [];
  //   if (filter === "none" || filter === "") {
  //     emptyGamesArray = games;
  //   } else {
  //     emptyGamesArray = genres.filter((genre) => genre.game === filter);
  //   }
  //   setFilteredGames(emptyGamesArray);
  // }, [filter, games]);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:9292/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        release_date: releaseDate,
        imageURL: imageURL,
      }),
    })
      .then((r) => r.json())
      .then((newGame) => {
        handleAddGame(newGame);
      });
  }

  const [name, setName] = useState([]);

  const handleGenreSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:9292/genres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((r) => r.json())
      .then((newGenreAdded) => {
        handleAddGenre(newGenreAdded);
      });
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  const releaseDateHandler = (e) => {
    setReleaseDate(e.target.value);
    console.log(e.target.value);
  };

  const imageURLHandler = (e) => {
    setImageURL(e.target.value);
    console.log(e.target.value);
  };

  const handleFilterValue = (e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
  };

  // //on id select, filter games based on genre
  // function filteredGames(id) {
  //   const filteredGamesList = genres.map((genre) => {
  //     if (id === genre.id) {
  //       return { ...genre.game };
  //     } else {
  //       return games;
  //     }
  //   });
  //   setFilter(filteredGamesList);
  // }
  // //attempt 2 to render filter
  // const renderFilteredGames = (id) => {
  //   const newGames = genres.filter((genre) => {
  //     return genre.id === id;
  //   });
  //   setGames(newGames);
  // };
  return (
    <div className="library">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          onChange={titleHandler}
        />
        <TextField
          id="outlined-basic"
          label="Release Date"
          variant="outlined"
          value={releaseDate}
          onChange={releaseDateHandler}
        />

        <TextField
          id="outlined-basic"
          label="Image URL"
          variant="outlined"
          value={imageURL}
          onChange={imageURLHandler}
        />
        <Button variant="outlined" color="secondary" onClick={handleSubmit}>
          Add to Library
        </Button>
      </form>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      ></Menu>
      <form>
        <select name="genre_id" onChange={handleFilterValue} value={filter}>
          <option>Sort by Genre</option>
          {genres.map((g) => (
            <option value={g.id} key={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <button>Sort</button>
      </form>

      <TextField value={name} onChange={nameHandler}></TextField>
      <button onClick={handleGenreSubmit}>Add Genre</button>

      <h1>Game Library</h1>
      <ul>{renderGames}</ul>
      <FilteredGames />
    </div>
  );
};

export default GameLibrary;

// onClick of genre id, filter genre & display games in that genre
// rake console. Genre.first.games/Genre.last.games
