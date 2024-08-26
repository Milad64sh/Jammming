import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

const SpotifyContext = createContext();

const SpotifyProvider = ({ children }) => {
  const clientId = 'a8190e3b46674bb48c60e87f3239b9bf';
  const redirectUri = 'http://localhost:3000/callback';

  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [choice, setChoice] = useState('All');
  const [searchInput, setSearchInput] = useState('');

  const getAuth = () => {
    const scope = [
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-private',
      'user-read-email',
    ].join('%20');
    const tokenURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
    window.location = tokenURL;
  };
  const checkAuth = () => {
    const authenticated = window.location.href.match(/access_token=([^&]*)/);
    if (authenticated) {
      setAccessToken(authenticated[1]);
      return true;
    } else {
      setIsLogged(false);
      return false;
    }
  };

  const getUserName = useCallback(async () => {
    if (!accessToken) {
      console.error('Access token is missing!');
      return;
    }
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserId(data.id);
      setUserName(data.display_name);
      setIsLogged(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const token = checkAuth();
    if (token) {
      setIsLogged(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      getUserName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      checkAuth();
    } else {
      getUserName();
      setIsLoading(false);
    }
  }, [accessToken, getUserName]);

  // SEARCH

  const handleSearchChange = useCallback((e) => {
    const term = e.target.value;
    setSearchInput(term);
  }, []);

  const getFilterChoice = (choice) => {
    setChoice(choice);
    handleSearchChange();
  };

  const filteredSearchData = useCallback(() => {
    if (choice === 'Title') {
      return searchResults.filter((track) =>
        track.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else if (choice === 'Artist') {
      return searchInput.filter((track) =>
        track.artists[0].name.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      return searchResults;
    }
  }, [searchInput, searchResults, choice]);

  const trackSearch = useCallback(() => {
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchInput}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          setSearchResults([]);
        } else {
          setSearchResults(
            jsonResponse.tracks.items.map((track) => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              image: track.album.images[0].url,
              uri: track.uri,
            }))
          );
        }
      });
  }, [searchInput, accessToken]);

  // ADD TRACK

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    if (!playlistName || !trackUris.length) return;

    fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ name: playlistName }),
        });
      })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const playlistId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ uris: trackUris }),
          }
        );
      })
      .then(() => {
        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
      });
  }, [playlistName, playlistTracks, accessToken, userId]);

  // UPDATE PLAYLIST NAME

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  // REMOVE TRACK FUNCTION

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  // PLAYLIST CREATION LOGIC

  const createPlaylist = (name, trackUris) => {
    if (!name || !trackUris.length) {
      return;
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setUserId(jsonResponse.id);
        return fetch(
          `https://api.spotify.com/v1/users/${jsonResponse.id}/playlists`,
          {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ name: name }),
          }
        )
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  };

  // LOGOUT
  const logout = () => {
    setAccessToken('');
    setIsLogged(false);
    window.history.pushState('Logged Out', null, '/');
    window.location.href = '/login';
  };

  return (
    <SpotifyContext.Provider
      value={{
        accessToken,
        isLogged,
        isLoading,
        userName,
        choice,
        searchInput,
        searchResults,
        playlistName,
        playlistTracks,
        trackSearch,
        addTrack,
        removeTrack,
        savePlaylist,
        updatePlaylistName,
        createPlaylist,
        getAuth,
        getUserName,
        filteredSearchData,
        getFilterChoice,
        logout,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

const useSpotify = () => useContext(SpotifyContext);

export { SpotifyProvider, useSpotify };
