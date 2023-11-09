const Loading = () => {
  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-image-custom">
      <div className="w-12 aspect-square p-2 rounded-full animate-spin bg-gradient-custom">
        <img className="w-full h-full" src="favicon.ico" alt="logo" />
      </div>
    </main>
  );
};

export default Loading;
