import bgimg from "../../assets/media.jpg";

const Banner = () => {
  return (
    <div
      className="hero bg-cover bg-no-repeat min-h-[calc(100vh-425px)]"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content p-4 md:p-8">
        <div className="max-w-md mx-auto text-[#FFE6E6]">
          <h1 className="mb-5 text-3xl md:text-5xl font-bold">
            Welcome to <span className="text-[#7469B6]">Study</span>
            <span className="text-[#AD88C6]">Nexus</span>
          </h1>
          <p className="mb-5 text-sm md:text-base">
            Join us in collaborative learning and enhance your skills by working
            on assignments with friends. Create, complete, and grade assignments
            in a supportive community.
          </p>
          <div className="flex justify-center gap-6">
          <button className="btn btn-info">Take Assignment</button>
          <button className="btn btn-outline btn-info ">Take Assignment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
