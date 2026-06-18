import HexBackground from "./components/HexBackground";


const HEX_CONFIG = {
  side: 58, // len of hexagon side in px.
  gap: 7, // width of channels between tiles in px.
  depth: 14, // how much tiles differ in height.
  surface: "#202224",
  channel: "#070808",
  glow: "#d72f16",
};


export default function App() {
  return <HexBackground {...HEX_CONFIG} />;
}
