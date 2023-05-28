import Logo from "../assets/master-chef.png";
interface HeadingProps {
  title: string;
}

const Heading = (props: HeadingProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <img src={Logo} aria-hidden="true" className="w-14" />
      <h1 className="text-2xl uppercase font-['monaco']">{props.title}</h1>
      <img src={Logo} aria-hidden="true" className="w-14" />
    </div>
  );
};

export default Heading;
