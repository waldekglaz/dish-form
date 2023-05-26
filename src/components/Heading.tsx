import Logo from "../assets/master-chef.png";
interface HeadingProps {
  title: string;
}

const Heading = (props: HeadingProps) => {
  return (
    <div className="flex items-center justify-center">
      <img src={Logo} aria-hidden="true" className="w-16" />
      <h1 className="text-2xl uppercase font-['monaco']">{props.title}</h1>
      <img src={Logo} aria-hidden="true" className="w-16" />
    </div>
  );
};

export default Heading;
