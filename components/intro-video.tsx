export default function IntroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster="/videos/intro-poster.jpg"
      className="w-full h-[500px] object-cover rounded-lg"
    >
      <source src="/intro.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}