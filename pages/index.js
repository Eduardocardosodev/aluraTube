import config from '../config.json';
import styled from 'styled-components';
import { CSSReset } from '../src/components/CSSReset';
import Menu from '../src/components/Menu/Menu';
import { StyledTimeline } from '../src/components/TimeLine';
import { useState } from 'react';

function HomePage() {
  const [valoDoFiltro, setValoDoFiltro] = useState('');

  return (
    <>
      <CSSReset />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Menu valoDoFiltro={valoDoFiltro} setValoDoFiltro={setValoDoFiltro} />
        <Header />
        <TimeLine
          searchValue={valoDoFiltro}
          playlists={config.playlists}
          favorites={config.favorites}
        />
      </div>
    </>
  );
}

export default HomePage;
const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  background-color: blue;
  background-image: url(${({ bg }) => bg});
  height: 230px;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function TimeLine({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);
  const favorites = Object.keys(props.favorites);

  return (
    <StyledTimeline>
      {playlistNames &&
        playlistNames.map((playlistName) => {
          const videos = props.playlists[playlistName];
          return (
            <section key={playlistName}>
              <h2>{playlistName}</h2>
              <div>
                {videos &&
                  videos
                    .filter((video) => {
                      const titleNormalized = video.title.toLowerCase();
                      const searchValueNormalized = searchValue.toLowerCase();
                      return titleNormalized.includes(searchValueNormalized);
                    })
                    .map((video) => (
                      <a href={video.url} key={video.url}>
                        <img src={video.thumb} />
                        <span>{video.title}</span>
                      </a>
                    ))}
              </div>
            </section>
          );
        })}
      {favorites &&
        favorites.map((favoritesProfile) => {
          const profiles = props.favorites[favoritesProfile];
          return (
            <section key={favoritesProfile} className="favorites">
              <h2>{favoritesProfile}</h2>
              <div>
                {profiles &&
                  profiles.map((profile) => (
                    <a href={profile.url}>
                      <img src={profile.thumb} alt={profile.name} />
                      <span>{profile.title}</span>
                    </a>
                  ))}
              </div>
            </section>
          );
        })}
    </StyledTimeline>
  );
}
