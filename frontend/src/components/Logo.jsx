export default function Logo({ width, height }) {
  return (
      <img
        src="src/assets/logo.png"
        style={{
          width: width,
          height: height,
          imageRendering: "pixelated"
        }}
      />
  );
}
