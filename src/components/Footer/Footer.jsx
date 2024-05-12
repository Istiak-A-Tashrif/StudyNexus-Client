import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <section className="mt-10">
      <div className="container gap-6 flex items-center justify-around">
        <div className="md:flex items-center justify-between gap-10 lg:justify-normal ">
          <div className="lg:w-1/2 md:w-1/3 rounded-md ">
            <h1 className="text-2xl font-extrabold font-rowdies text-[#7469B6]">
              Study<span className="text-[#AD88C6]">Nexus</span>
            </h1>
            <p className="my-4 lg:w-2/3">
            Stay ahead in your academic journey with StudyNexus! Get exclusive study resources, insightful articles, and updates on the latest educational opportunities. Join our community today!
            </p>
            <div className="flex mb-6 space-x-4 lg:pt-0 lg:col-end-13">
              <a
                rel="noopener noreferrer"
                title="Email"
                className="flex items-center justify-center rounded-full hover:text-[#AD88C6] text-xl"
              >
                <FaFacebook />
              </a>
              <a
                rel="noopener noreferrer"
                title="Twitter"
                className="flex items-center justify-center rounded-full hover:text-[#AD88C6] text-xl"
              >
                <FaTwitterSquare />
              </a>
              <a
                rel="noopener noreferrer"
                title="GitHub"
                className="flex items-center justify-center rounded-full hover:text-[#AD88C6] text-xl"
              >
                <FaInstagram />
              </a>
              <a
                rel="noopener noreferrer"
                title="GitHub"
                className="flex items-center justify-center rounded-full hover:text-[#AD88C6] text-xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label htmlFor="email">Subscribe Newsletter</label> <br />
              <input
                id="FooterEmail"
                type="text"
                placeholder="Email"
                className="input input-bordered input-ghost max-w-xs mt-4"
              />
              <button className="btn md:ml-2 md:mt-0 mt-4 bg-[#AD88C6] border-none text-gray-50 block md:inline">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className="my-6 md:my-0 " />

      <footer className="footer md:pt-6 text-base-content grid grid-cols-2 md:grid-cols-none">
        <nav className="md:mx-0 mx-auto">
          <h6 className="font-bold text-base">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav className="md:mx-0 mx-auto">
          <h6 className="font-bold text-base">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav className="col-span-2 md:mx-0 mx-auto">
          <h6 className="font-bold text-base">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </section>
  );
};

export default Footer;
