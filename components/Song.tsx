import Image from "next/image";
import { useSpotify } from "../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";

type SongProps = {
  index: number;
  item: SpotifyApi.PlaylistTrackObject;
};

export const Song = ({ index, item }: SongProps) => {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackid] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const duration = new Date(item.track.duration_ms).toLocaleString(undefined, {
    minute: "numeric",
    second: "numeric",
  });

  const playSong = () => {
    setCurrentTrackid(item.track.id);
    setIsPlaying(true);
    spotifyApi.play({ uris: [item.track.uri] });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{index + 1}</p>
        <div className="h-10 w-10">
          <Image
            src={item.track.album.images[0].url}
            width={40}
            height={40}
            alt="track image"
          />
        </div>
        <div>
          <p className="w-36 lg:w-64 text-white truncate">{item.track.name}</p>
          <p className="w-40">{item.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{item.track.album.name}</p>
        <p>{duration}</p>
      </div>
    </div>
  );
};
